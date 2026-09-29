import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function HackerFigure({
  scrollProgress = 0,
  position = [0, -1.6, 0],
}) {
  const root = useRef();
  const headRef = useRef();
  const laptopScreenRef = useRef();
  const logoRef = useRef();
  const leftLeg = useRef();
  const rightLeg = useRef();
  const leftArm = useRef();
  const rightArm = useRef();

  // Position + scale based on scroll (visible from start)
  const z = THREE.MathUtils.lerp(-7, 2, scrollProgress);
  const y = THREE.MathUtils.lerp(-1.4, -1.0, scrollProgress);
  const scale = THREE.MathUtils.lerp(0.9, 1.6, scrollProgress);

  useFrame(({ clock }) => {
    if (!root.current) return;
    const t = clock.getElapsedTime();
    const walkSpeed = 2.5;
    const sway = Math.sin(t * walkSpeed) * 0.08;

    // Legs swing
    if (leftLeg.current) {
      leftLeg.current.rotation.x = Math.sin(t * walkSpeed) * 0.5;
    }
    if (rightLeg.current) {
      rightLeg.current.rotation.x =
        Math.sin(t * walkSpeed + Math.PI) * 0.5;
    }

    // Arms
    if (leftArm.current) {
      leftArm.current.rotation.z = -0.4 + Math.sin(t * walkSpeed) * 0.08;
    }
    if (rightArm.current) {
      rightArm.current.rotation.z =
        0.4 + Math.sin(t * walkSpeed + 0.5) * 0.08;
    }

    // Sway + bob
    root.current.position.x = position[0] + sway * 0.35;
    root.current.position.y =
      y + Math.abs(Math.sin(t * walkSpeed * 2)) * 0.06;

    // Head bob
    if (headRef.current) {
      headRef.current.rotation.z = sway * 0.5;
    }

    // Laptop screen flicker — با useEffect آمن
    if (laptopScreenRef.current?.material) {
      laptopScreenRef.current.material.opacity =
        0.7 + Math.sin(t * 8) * 0.15;
    }

    // Logo pulse — آمن كمان
    if (logoRef.current?.material) {
      const pulse = Math.sin(t * 2) * 0.5 + 0.5;
      logoRef.current.material.opacity = 0.6 + pulse * 0.4;
      logoRef.current.scale.setScalar(1 + pulse * 0.08);
    }
  });

  return (
    <group ref={root} position={[position[0], y, z]} scale={scale}>
      {/* BODY */}
      <mesh>
        <capsuleGeometry args={[0.55, 1.2, 8, 24]} />
        <meshStandardMaterial color="#141418" roughness={0.85} metalness={0.2} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.62, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1A1A22" roughness={0.8} />
      </mesh>

      {/* HEAD + HOOD */}
      <group ref={headRef} position={[0, 1.32, 0]}>
        <mesh>
          <sphereGeometry args={[0.32, 24, 24]} />
          <meshStandardMaterial color="#0E0E12" roughness={1} />
        </mesh>

        {/* Hood cone */}
        <group position={[0, 0.1, 0]}>
          <mesh>
            <coneGeometry args={[0.5, 0.7, 24]} />
            <meshStandardMaterial color="#141418" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.22, -0.25]} rotation={[-0.5, 0, 0]}>
            <coneGeometry args={[0.25, 0.6, 16]} />
            <meshStandardMaterial color="#141418" roughness={0.9} />
          </mesh>
        </group>

        {/* Glowing eyes */}
        <mesh position={[-0.08, 0.02, 0.29]}>
          <circleGeometry args={[0.028, 16]} />
          <meshBasicMaterial color="#6FE8FF" />
        </mesh>
        <mesh position={[0.08, 0.02, 0.29]}>
          <circleGeometry args={[0.028, 16]} />
          <meshBasicMaterial color="#6FE8FF" />
        </mesh>
      </group>

      {/* LEFT ARM */}
      <group ref={leftArm} position={[-0.55, 0.7, 0]} rotation={[-0.3, 0, -0.4]}>
        <mesh position={[0, -0.35, 0]}>
          <capsuleGeometry args={[0.12, 0.6, 6, 12]} />
          <meshStandardMaterial color="#141418" roughness={0.9} />
        </mesh>
      </group>

      {/* RIGHT ARM + LAPTOP */}
      <group ref={rightArm} position={[0.55, 0.7, 0]} rotation={[-0.7, 0, 0.4]}>
        <mesh position={[0, -0.35, 0]}>
          <capsuleGeometry args={[0.12, 0.6, 6, 12]} />
          <meshStandardMaterial color="#141418" roughness={0.9} />
        </mesh>

        {/* LAPTOP */}
        <group position={[0, -0.75, 0.15]} rotation={[-0.2, 0, 0]}>
          {/* Base */}
          <mesh>
            <boxGeometry args={[0.55, 0.03, 0.4]} />
            <meshStandardMaterial color="#1A1A22" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Screen — with ref on the MESH not material */}
          <mesh position={[0, 0.22, -0.2]} rotation={[-1.3, 0, 0]}>
            <planeGeometry args={[0.55, 0.4]} />
            <meshBasicMaterial
              ref={laptopScreenRef}
              color="#6FE8FF"
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Logo on screen */}
          <group position={[0, 0.22, -0.19]} rotation={[-1.3, 0, 0]}>
            <mesh ref={logoRef}>
              <ringGeometry args={[0.06, 0.1, 32]} />
              <meshBasicMaterial
                color="#FFFFFF"
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh>
              <ringGeometry args={[0.13, 0.15, 32]} />
              <meshBasicMaterial
                color="#6FE8FF"
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
            <Text
              position={[0, 0, 0.001]}
              fontSize={0.08}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
            >
              X
            </Text>
          </group>
        </group>
      </group>

      {/* LEFT LEG */}
      <group ref={leftLeg} position={[-0.2, -0.55, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <capsuleGeometry args={[0.16, 0.9, 6, 12]} />
          <meshStandardMaterial color="#141418" roughness={0.9} />
        </mesh>
        <mesh position={[0, -1, 0.08]}>
          <boxGeometry args={[0.22, 0.12, 0.32]} />
          <meshStandardMaterial color="#0A0A0F" roughness={1} />
        </mesh>
      </group>

      {/* RIGHT LEG */}
      <group ref={rightLeg} position={[0.2, -0.55, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <capsuleGeometry args={[0.16, 0.9, 6, 12]} />
          <meshStandardMaterial color="#141418" roughness={0.9} />
        </mesh>
        <mesh position={[0, -1, 0.08]}>
          <boxGeometry args={[0.22, 0.12, 0.32]} />
          <meshStandardMaterial color="#0A0A0F" roughness={1} />
        </mesh>
      </group>

      {/* Rim lights */}
      <pointLight position={[1, 1.2, 1.5]} intensity={2} color="#6FE8FF" distance={5} />
      <pointLight position={[-1, 0.6, 0.5]} intensity={1.5} color="#A68BFF" distance={4} />
      <pointLight position={[0, 2, -1]} intensity={1} color="#FFFFFF" distance={5} />
    </group>
  );
}