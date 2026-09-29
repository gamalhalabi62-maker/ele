import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import HackerFigure from './HackerFigure';

// ============================================
// Cyber Core — الكرة الزجاجية
// ============================================
function CyberCore({ visible = 1 }) {
  const mesh = useRef();
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.06;
      mesh.current.rotation.x = t * 0.03;
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.08;
    if (ring2.current) ring2.current.rotation.z = -t * 0.06;
  });

  return (
    <group position={[0, 0, -3]} scale={visible}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.9, 4]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.03}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.1}
          distortion={0.15}
          color="#0A0C12"
          attenuationDistance={2}
          attenuationColor="#6FE8FF"
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial color="#6FE8FF" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.005, 16, 128]} />
        <meshBasicMaterial color="#6FE8FF" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[1.8, 0.004, 16, 128]} />
        <meshBasicMaterial color="#A68BFF" transparent opacity={0.35} />
      </mesh>
      <pointLight color="#6FE8FF" intensity={1.5} distance={6} />
    </group>
  );
}

// ============================================
// Dust Particles
// ============================================
function DustParticles({ count = 200 }) {
  const points = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (points.current) points.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#6FE8FF"
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ============================================
// Camera
// ============================================
function CameraRig({ scrollProgress = 0 }) {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    // As hacker approaches, camera also pushes in
    const targetX = mouse.x * 1.2;
    const targetY = mouse.y * 0.6 + scrollProgress * 0.5;
    const targetZ = 7 - scrollProgress * 2;

    vec.set(targetX, targetY, targetZ);
    camera.position.lerp(vec, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ============================================
// SCENE
// ============================================
export default function HeroScene({ scrollProgress = 0 }) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <color attach="background" args={['#06070B']} />
      <fog attach="fog" args={['#06070B', 6, 22]} />

      <Suspense fallback={null}>
        <CameraRig scrollProgress={scrollProgress} />

        {/* Lights */}
        <ambientLight intensity={0.15} />
        <spotLight position={[5, 6, 5]} angle={0.4} penumbra={1} intensity={1} color="#6FE8FF" />
        <spotLight position={[-5, -3, 3]} angle={0.5} penumbra={1} intensity={0.7} color="#A68BFF" />

        {/* Glowing core far behind — fades as hacker approaches */}
        <CyberCore visible={Math.max(0, 1 - scrollProgress * 1.5)} />

        {/* The Hacker */}
        <HackerFigure scrollProgress={scrollProgress} position={[0, -1.6, 0]} />

        {/* Dust */}
        <DustParticles count={200} />

        {/* Sparkles */}
        <Sparkles
          count={40}
          scale={16}
          size={1.5}
          speed={0.25}
          color="#6FE8FF"
          opacity={0.4}
        />

        {/* Post */}
        <EffectComposer multisampling={2}>
          <Bloom intensity={1} luminanceThreshold={0.4} luminanceSmoothing={0.9} mipmapBlur />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.3} darkness={0.8} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}