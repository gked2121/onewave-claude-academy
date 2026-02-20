"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

// Performance-optimized version of Enhanced3DBackground
export default function Enhanced3DBackgroundOptimized() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);
  const sceneRef = useRef<{ renderer?: THREE.WebGLRenderer; scene?: THREE.Scene; camera?: THREE.PerspectiveCamera } | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');

  // FPS limiter configuration
  const TARGET_FPS = 30;
  const FRAME_DURATION = 1000 / TARGET_FPS;

  // Detect device capabilities and set quality
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for reduced motion preference
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);

    // Check user preference
    try {
      const raw = localStorage.getItem('onewave:claude-academy:bgDisabled');
      setDisabled(raw === '1');
    } catch {}

    // Auto-detect performance capability
    const isMobile = window.innerWidth < 768;
    const hasLowEndGPU = !window.WebGL2RenderingContext;
    const hasBattery = 'getBattery' in navigator;

    if (isMobile || hasLowEndGPU) {
      setQuality('low');
    } else {
      setQuality('medium');
    }

    // Check battery status
    if (hasBattery) {
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.level < 0.2) setQuality('low');
      });
    }

    return () => media.removeEventListener?.("change", update);
  }, []);

  // Visibility observer to pause when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    return () => {
      if (mountRef.current) {
        observer.unobserve(mountRef.current);
      }
    };
  }, []);

  // Optimized cleanup function
  const cleanup = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (sceneRef.current) {
      const { renderer, scene } = sceneRef.current;

      if (scene) {
        scene.traverse((obj: THREE.Object3D) => {
          const withGeo = obj as any;
          if (withGeo.geometry) withGeo.geometry.dispose();
          if (withGeo.material) {
            if (Array.isArray(withGeo.material)) {
              withGeo.material.forEach((m: any) => m?.dispose?.());
            } else {
              withGeo.material.dispose();
            }
          }
        });
        scene.clear();
      }

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }

      sceneRef.current = null;
    }
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount || reducedMotion || disabled) return;

    // Quality settings based on device
    const isMobile = window.innerWidth < 768;
    const gridSize = quality === 'low' ? 15 : quality === 'medium' ? 25 : 35;
    const particleCount = quality === 'low' ? 150 : quality === 'medium' ? 300 : 500;
    const pixelRatio = quality === 'low' ? 1 : Math.min(window.devicePixelRatio, 1.5);

    // Scene setup with bright modern optimizations
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf8fafc, 400, 1000);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: quality !== 'low',
      alpha: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0xffffff, 0.05);
    currentMount.appendChild(renderer.domElement);

    // Store references for cleanup
    sceneRef.current = { renderer, scene, camera };

    // Simplified wave grid with LOD
    const createWaveGrid = () => {
      const geometry = new THREE.PlaneGeometry(1000, 1000, gridSize, gridSize);

      // Simpler shaders for better performance
      const vertexShader = `
        uniform float uTime;
        uniform float uWaveAmplitude;
        varying float vElevation;
        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          float elevation = sin(modelPosition.x * 0.008 + uTime * 0.6) *
                           sin(modelPosition.z * 0.008 + uTime * 0.5) * uWaveAmplitude;
          modelPosition.y += elevation;
          vElevation = elevation;
          gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
      `;

      const fragmentShader = `
        varying float vElevation;
        void main() {
          float normalizedElevation = (vElevation + 40.0) / 80.0;
          // Bright modern colors matching main background
          vec3 color = mix(vec3(0.23, 0.51, 0.96), vec3(0.55, 0.36, 0.96), normalizedElevation);
          gl_FragColor = vec4(color, 0.25);
        }
      `;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uWaveAmplitude: { value: isMobile ? 20 : 30 }
        },
        transparent: true,
        wireframe: true,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = -120;
      mesh.frustumCulled = true; // Enable frustum culling
      return { mesh, material };
    };

    // Optimized particle system
    const createParticleSystem = () => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 900;
        positions[i * 3 + 1] = Math.random() * 300 - 150;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 900;
        sizes[i] = Math.random() * 2 + 0.5;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      // Bright colorful particle shader
      const material = new THREE.PointsMaterial({
        size: 2,
        color: new THREE.Color(0x3b82f6), // Bright blue
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      particles.frustumCulled = true;
      return { particles };
    };

    const { mesh: waveMesh, material: waveMaterial } = createWaveGrid();
    const { particles } = createParticleSystem();

    scene.add(waveMesh);
    if (quality !== 'low') {
      scene.add(particles);
    }

    camera.position.set(0, 220, 350);
    camera.lookAt(0, 0, 0);

    // FPS-limited animation loop
    const animate = (currentTime: number) => {
      // Only render if visible
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // FPS limiting
      const deltaTime = currentTime - lastFrameTime.current;
      if (deltaTime < FRAME_DURATION) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTime.current = currentTime - (deltaTime % FRAME_DURATION);

      const time = currentTime * 0.0005;

      // Update uniforms
      if (waveMaterial.uniforms?.uTime) {
        waveMaterial.uniforms.uTime.value = time;
      }

      // Reduced camera movement for performance
      if (quality !== 'low') {
        camera.position.x = Math.sin(time * 0.2) * 10;
        camera.position.z = 350 + Math.cos(time * 0.15) * 20;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    // Throttled scroll handler
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const scrollProgress = Math.min(scrollY / maxScroll, 1);
        camera.position.y = 220 - scrollProgress * 80;

        if (waveMaterial.uniforms?.uWaveAmplitude) {
          waveMaterial.uniforms.uWaveAmplitude.value = (isMobile ? 20 : 30) * (1 + scrollProgress * 0.3);
        }
      }, 16); // ~60fps max
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cleanup();
    };
  }, [reducedMotion, disabled, quality, isVisible, cleanup]);

  if (reducedMotion || disabled) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.04) 50%, transparent 100%)",
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
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(248, 250, 252, 0.05) 100%)",
        willChange: "transform", // Hint browser for GPU acceleration
      }}
    />
  );
}