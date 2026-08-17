import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeNeuralBrainProps {
  biasIntensity?: number; // 0 (balanced) to 1 (high negative bias)
  interactive?: boolean;
  onNodeClick?: (nodeInfo: string) => void;
}

export const ThreeNeuralBrain: React.FC<ThreeNeuralBrainProps> = ({
  biasIntensity = 0.65,
  interactive = true,
  onNodeClick,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;
    
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 9.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group to hold all brain structures for collective rotation
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // 1. Central Core "Brain" sphere
    const brainGeom = new THREE.IcosahedronGeometry(2.3, 3);
    const brainMat = new THREE.MeshPhongMaterial({
      color: 0x1a1a1a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      shininess: 40,
      emissive: 0x222222,
    });
    const brainMesh = new THREE.Mesh(brainGeom, brainMat);
    brainGroup.add(brainMesh);

    // 2. Inner nucleus
    const innerGeom = new THREE.SphereGeometry(1.4, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xa37b5c,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const innerNucleus = new THREE.Mesh(innerGeom, innerMat);
    brainGroup.add(innerNucleus);

    // 3. Neural Synaptic Nodes & Connections
    const nodeCount = 65;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGroup = new THREE.Group();
    brainGroup.add(nodeGroup);

    const normalNodeMat = new THREE.MeshBasicMaterial({ color: 0x1a1a1a });
    const biasNodeMat = new THREE.MeshBasicMaterial({ color: 0x9e382a });

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + (Math.random() - 0.5) * 0.9;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      // Determine if this is a negative bias neuron based on biasIntensity
      const isBiased = i < nodeCount * biasIntensity * 0.45;
      const sphereGeom = new THREE.SphereGeometry(isBiased ? 0.08 : 0.05, 8, 8);
      const nodeMesh = new THREE.Mesh(sphereGeom, isBiased ? biasNodeMat : normalNodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { id: i, isBiased };
      nodeGroup.add(nodeMesh);
    }

    // 4. Synaptic line connections between nearby nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5a5854,
      transparent: true,
      opacity: 0.45,
    });
    const biasLineMaterial = new THREE.LineBasicMaterial({
      color: 0x9e382a,
      transparent: true,
      opacity: 0.75,
    });

    const linesGroup = new THREE.Group();
    brainGroup.add(linesGroup);

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.35) {
          const geom = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]]);
          const isBiasConn = (i < nodeCount * biasIntensity * 0.45) && (j < nodeCount * biasIntensity * 0.45);
          const line = new THREE.Line(geom, isBiasConn ? biasLineMaterial : lineMaterial);
          linesGroup.add(line);
        }
      }
    }

    // 5. Surrounding "Neural Network" cosmic particle dust
    const particleCount = 280;
    const particlesGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 14;
      positions[idx + 1] = (Math.random() - 0.5) * 12;
      positions[idx + 2] = (Math.random() - 0.5) * 10;

      // Particle colors (mix of charcoal ink, warm ochre, and rust bias)
      const isRed = Math.random() < biasIntensity * 0.35;
      if (isRed) {
        colors[idx] = 0.62;
        colors[idx + 1] = 0.22;
        colors[idx + 2] = 0.16;
      } else {
        colors[idx] = 0.45;
        colors[idx + 1] = 0.42;
        colors[idx + 2] = 0.38;
      }
    }
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particles);

    // 6. Lights
    const pointLight = new THREE.PointLight(0xf9f7f2, 1.5, 50);
    pointLight.position.set(5, 6, 6);
    scene.add(pointLight);

    const biasLight = new THREE.PointLight(0x9e382a, biasIntensity * 1.5, 40);
    biasLight.position.set(-5, -4, 4);
    scene.add(biasLight);

    const ambientLight = new THREE.AmbientLight(0xd1ccbe, 1.2);
    scene.add(ambientLight);

    // Interaction handlers
    let targetRotY = 0;
    let targetRotX = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      
      if (!isDragging) {
        targetRotY = normX * 0.4;
        targetRotX = normY * 0.3;
      } else {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        brainGroup.rotation.y += deltaX * 0.008;
        brainGroup.rotation.x += deltaY * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    if (interactive) {
      container.addEventListener('mousemove', handlePointerMove);
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
    }

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Continuous autonomous rotation
      if (!isDragging) {
        brainGroup.rotation.y += 0.006;
        brainGroup.rotation.x += (targetRotX - brainGroup.rotation.x) * 0.05;
        brainGroup.rotation.y += (targetRotY - brainGroup.rotation.y * 0.1) * 0.02;
      }

      particles.rotation.y -= 0.002;
      particles.rotation.x = Math.sin(elapsed * 0.2) * 0.05;

      // Pulse the brain wireframe
      const pulseScale = 1.0 + Math.sin(elapsed * 2.0) * 0.025;
      brainMesh.scale.set(pulseScale, pulseScale, pulseScale);
      innerNucleus.scale.set(1 + Math.cos(elapsed * 1.5) * 0.05, 1 + Math.cos(elapsed * 1.5) * 0.05, 1 + Math.cos(elapsed * 1.5) * 0.05);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      if (interactive) {
        container.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [biasIntensity, interactive]);

  return (
    <div
      ref={mountRef}
      id="threejs-container-ANIMATION_3"
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      title="Drag to rotate 3D Neural Topology"
    />
  );
};
