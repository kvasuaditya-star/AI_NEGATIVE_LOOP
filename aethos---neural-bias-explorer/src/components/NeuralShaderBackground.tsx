import React, { useEffect, useRef } from 'react';

export const NeuralShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return;

    const syncSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    window.addEventListener('resize', syncSize);
    syncSize();

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        // Warm paper tones
        vec3 paperBase = vec3(0.976, 0.968, 0.949); // #F9F7F2
        vec3 paperWarm = vec3(0.941, 0.925, 0.898); // #F0EDE4
        
        // Delicate generative ink topography
        float pattern = sin(uv.x * 16.0 + u_time * 0.15) * cos(uv.y * 16.0 - u_time * 0.12);
        pattern += sin(uv.y * 10.0 + u_time * 0.08) * cos(uv.x * 10.0 + u_time * 0.18);
        
        vec3 finalColor = mix(paperBase, paperWarm, pattern * 0.25 + 0.25);
        
        // Subtle ochre & rust architectural lines
        float d = length(uv - vec2(0.65, 0.4));
        float pulse = 0.02 / (d + 0.08) * (sin(u_time * 0.8) * 0.15 + 0.85);
        finalColor -= vec3(0.04, 0.03, 0.02) * pulse;

        // Faint ink grain
        float noise = fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor -= vec3(noise * 0.015);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function cs(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    let startTime = performance.now();

    const render = () => {
      const t = (performance.now() - startTime) * 0.001;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', syncSize);
      if (gl && prog) {
        gl.deleteProgram(prog);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 opacity-70 pointer-events-none overflow-hidden">
      <canvas id="shader-canvas-ANIMATION_2" ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
