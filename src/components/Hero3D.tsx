import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
    } catch (e) {
      console.warn('WebGL not supported:', e);
      return;
    }

    const devicePixelRatioLimit = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(devicePixelRatioLimit);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.6;

    // Shader materials with Fresnel rim-lighting and time/mouse vertex deformation
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uA: { value: new THREE.Color(0x6D28D9) }, // Violet
        uB: { value: new THREE.Color(0xA855F7) }, // Fuchsia
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vMix;
        varying vec3 vN;
        varying vec3 vV;
        
        float w(vec3 p) {
          float dist = length(p.xy - uMouse);
          float reaction = smoothstep(1.8, 0.0, dist) * 0.28;
          return sin(p.x * 2.4 + uTime * 0.7) * 0.10 + 
                 sin(p.y * 2.1 + uTime * 0.9) * 0.10 + 
                 sin(p.z * 2.6 + uTime * 0.6) * 0.09 + 
                 reaction;
        }
        
        void main() {
          vec3 n = normalize(normal);
          float d = w(position * 1.4 + uTime * 0.12);
          vec3 pos = position + n * d;
          vMix = clamp(pos.y * 0.5 + 0.5, 0.0, 1.0);
          vN = normalize(normalMatrix * n);
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          vV = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uA;
        uniform vec3 uB;
        varying float vMix;
        varying vec3 vN;
        varying vec3 vV;
        
        void main() {
          vec3 c = mix(uA, uB, vMix);
          float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.6);
          c = mix(c * 0.5, c, 0.6) + f * 0.45;
          gl_FragColor = vec4(c, 0.82);
        }
      `,
    });

    const blobGeometry = new THREE.IcosahedronGeometry(1.4, 24);
    const blob = new THREE.Mesh(blobGeometry, material);
    scene.add(blob);

    const wireGeometry = new THREE.IcosahedronGeometry(1.62, 3);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x7C3AED,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    scene.add(wire);

    // Mouse target coordinates for smooth easing
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      // Map to uniforms space
      material.uniforms.uMouse.value.x = mx * 2.2;
      material.uniforms.uMouse.value.y = -my * 2.2;
    };

    window.addEventListener('pointermove', handlePointerMove);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const render = () => {
      const t = clock.getElapsedTime();
      
      // Update uniform time
      material.uniforms.uTime.value = t;
      
      // Smooth interpolation for inertia
      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;
      
      // Blob and wire rotations
      blob.rotation.y = t * 0.10 + tx * 0.5;
      blob.rotation.x = ty * 0.4;
      wire.rotation.y = -t * 0.07;
      
      // Camera parallax
      camera.position.x = tx * 0.6;
      camera.position.y = -ty * 0.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      // Clean up Three.js objects to prevent memory leaks
      blobGeometry.dispose();
      material.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-1 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
