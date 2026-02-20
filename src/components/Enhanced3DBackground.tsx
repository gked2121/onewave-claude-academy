"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Enhanced3DBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    // read user toggle
    try {
      const raw = localStorage.getItem('onewave:claude-academy:bgDisabled');
      setDisabled(raw === '1');
    } catch {}
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount || reducedMotion || disabled) return;

    // Scene setup with seamless blending
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a15, 600, 1500);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a15, 1);
    currentMount.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;
    const gridSize = isMobile ? 40 : 70;
    const waveAmplitudeBase = isMobile ? 18 : 25;

    // Wave grid
    const createWaveGrid = () => {
      const geometry = new THREE.PlaneGeometry(2000, 2000, gridSize, gridSize);
      const vertexShader = `
        uniform float uTime;
        uniform float uWaveAmplitude;
        varying vec3 vPosition;
        varying float vElevation;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          // Multi-layered organic waves for depth
          float wave1 = sin(modelPosition.x * 0.006 + uTime * 0.4) *
                       sin(modelPosition.z * 0.006 + uTime * 0.35);
          float wave2 = sin(modelPosition.x * 0.012 + uTime * 0.6) *
                       cos(modelPosition.z * 0.01 + uTime * 0.5);
          float wave3 = sin(modelPosition.x * 0.02 + modelPosition.z * 0.015 + uTime * 0.8);

          float elevation = (wave1 * 1.2 + wave2 * 0.6 + wave3 * 0.3) * uWaveAmplitude;

          modelPosition.y += elevation;
          vPosition = modelPosition.xyz;
          vElevation = elevation;

          gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
      `;
      const fragmentShader = `
        uniform float uTime;
        varying vec3 vPosition;
        varying float vElevation;
        varying vec2 vUv;

        void main() {
          // Normalize elevation for color mapping
          float normalizedElevation = (vElevation + 35.0) / 70.0;

          // Rich gradient: deep ocean blue -> cyan -> electric teal -> bright highlights
          vec3 deepColor = vec3(0.02, 0.08, 0.15);      // Deep dark blue
          vec3 midColor1 = vec3(0.12, 0.45, 0.65);      // Ocean blue
          vec3 midColor2 = vec3(0.18, 0.79, 0.96);      // Bright cyan (primary)
          vec3 peakColor = vec3(0.0, 0.78, 0.74);       // Electric teal (secondary)
          vec3 highlightColor = vec3(0.4, 0.95, 0.92);  // Bright highlight

          // Smooth multi-step gradient
          vec3 finalColor = mix(deepColor, midColor1, smoothstep(0.0, 0.3, normalizedElevation));
          finalColor = mix(finalColor, midColor2, smoothstep(0.3, 0.6, normalizedElevation));
          finalColor = mix(finalColor, peakColor, smoothstep(0.6, 0.85, normalizedElevation));
          finalColor = mix(finalColor, highlightColor, smoothstep(0.85, 1.0, normalizedElevation));

          // Center glow for depth
          float distFromCenter = length(vPosition.xz);
          float centerGlow = 1.0 - smoothstep(0.0, 400.0, distFromCenter);
          finalColor += vec3(0.18, 0.79, 0.96) * centerGlow * 0.4;

          // Animated shimmer effect
          float shimmer = sin(vPosition.x * 0.02 + uTime * 2.0) *
                         cos(vPosition.z * 0.02 + uTime * 1.5) * 0.15;
          finalColor += shimmer * centerGlow;

          // Triple-stage fade for completely seamless edges
          float innerFade = 1.0 - smoothstep(300.0, 800.0, distFromCenter);
          innerFade = pow(innerFade, 0.5);

          float midFade = 1.0 - smoothstep(600.0, 1100.0, distFromCenter);
          midFade = pow(midFade, 1.2);

          float outerFade = 1.0 - smoothstep(900.0, 1400.0, distFromCenter);
          outerFade = pow(outerFade, 2.5);

          float alpha = 0.28 * innerFade * midFade * outerFade;

          // Minimal edge highlighting
          float edgeGlow = smoothstep(0.97, 1.0, normalizedElevation) * 0.15;
          alpha += edgeGlow * innerFade * midFade * outerFade;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `;
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: { uTime: { value: 0 }, uWaveAmplitude: { value: waveAmplitudeBase } },
        transparent: true,
        wireframe: true,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = -180;
      return { mesh, material };
    };

    // Particles - floating data points
    const createParticleSystem = () => {
      const particleCount = isMobile ? 500 : 1200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        // Distribute particles extremely widely for complete coverage
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = Math.random() * 600 - 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

        // Velocity for organic floating motion
        velocities[i * 3] = (Math.random() - 0.5) * 0.1;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

        // Rich color palette matching wave colors
        const colorType = Math.random();
        if (colorType < 0.4) {
          // Cyan particles (primary)
          colors[i * 3] = 0.18;
          colors[i * 3 + 1] = 0.79;
          colors[i * 3 + 2] = 0.96;
        } else if (colorType < 0.7) {
          // Teal particles (secondary)
          colors[i * 3] = 0.0;
          colors[i * 3 + 1] = 0.78;
          colors[i * 3 + 2] = 0.74;
        } else {
          // Bright highlight particles
          colors[i * 3] = 0.4 + Math.random() * 0.3;
          colors[i * 3 + 1] = 0.85 + Math.random() * 0.1;
          colors[i * 3 + 2] = 0.92 + Math.random() * 0.08;
        }
        sizes[i] = Math.random() * 3 + 0.8;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      const vertexShader = `
        attribute float size;
        uniform float uTime;
        varying vec3 vColor;
        varying float vDistance;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

          // Organic floating motion with depth
          float floatX = sin(uTime * 0.25 + position.y * 0.008 + position.z * 0.003) * 8.0;
          float floatY = cos(uTime * 0.2 + position.x * 0.006 + position.z * 0.004) * 6.0;
          float floatZ = sin(uTime * 0.15 + position.x * 0.005 + position.y * 0.007) * 4.0;

          mvPosition.x += floatX;
          mvPosition.y += floatY;
          mvPosition.z += floatZ;

          vDistance = -mvPosition.z;

          // Size based on distance for depth perception
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `;
      const fragmentShader = `
        varying vec3 vColor;
        varying float vDistance;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;

          // Soft glow effect
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha = pow(alpha, 1.5);

          // Multi-stage depth fade for seamless distance falloff
          float depthFade = smoothstep(1000.0, 300.0, vDistance);
          float outerDepthFade = smoothstep(1200.0, 600.0, vDistance);
          alpha *= depthFade * outerDepthFade * 0.7;

          // Inner bright core
          float core = 1.0 - smoothstep(0.0, 0.2, dist);
          vec3 finalColor = vColor + (vColor * core * 0.5);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `;
      const material = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader,
        fragmentShader,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(geometry, material as THREE.ShaderMaterial);
      return { particles, material };
    };

    const { mesh: waveMesh, material: waveMaterial } = createWaveGrid();
    const { particles, material: particleMaterial } = createParticleSystem();
    scene.add(waveMesh);
    scene.add(particles);

    camera.position.set(0, 220, 500);
    camera.lookAt(0, -40, 0);

    const animate = () => {
      const time = performance.now() * 0.00025;
      setUniform(waveMaterial, "uTime", time);
      setUniform(particleMaterial, "uTime", time);

      // Ultra gentle camera movement for smooth experience
      camera.position.x = Math.sin(time * 0.08) * 10;
      camera.position.y = 220 + Math.sin(time * 0.06) * 6;
      camera.position.z = 500 + Math.cos(time * 0.07) * 15;
      camera.lookAt(0, -40, 0);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(scrollY / maxScroll, 1);

      // Dynamic camera perspective on scroll
      camera.position.y = 180 - scrollProgress * 60;
      camera.position.z = 400 - scrollProgress * 120;

      // Increase wave intensity as user scrolls
      setUniform(waveMaterial, "uWaveAmplitude", waveAmplitudeBase * (1 + scrollProgress * 0.5));
    };
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (currentMount && renderer.domElement) currentMount.removeChild(renderer.domElement);
      scene.traverse((obj: THREE.Object3D) => {
        const withGeo = obj as unknown as { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] };
        withGeo.geometry?.dispose?.();
        const mat = withGeo.material;
        if (Array.isArray(mat)) mat.forEach((m) => m?.dispose?.());
        else mat?.dispose?.();
      });
      renderer.dispose();
    };
  }, [reducedMotion]);

  if (reducedMotion || disabled) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(47,201,244,0.15) 0%, rgba(0,199,189,0.08) 40%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    );
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{
        pointerEvents: "none",
        background: "radial-gradient(ellipse at center, rgba(10, 10, 21, 0.95) 0%, rgba(10, 10, 21, 1) 100%)",
      }}
    />
  );
}

function setUniform(material: THREE.ShaderMaterial, key: string, value: number) {
  const u = material.uniforms?.[key];
  if (u && typeof u.value !== "undefined") {
    u.value = value as unknown as number;
  }
}
