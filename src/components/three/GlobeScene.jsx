import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// Utility — نقطة عشوائية على سطح كرة
// ============================================
const pointOnSphere = (radius) => {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
};

// ============================================
// 1) NETWORK NODES — عقد الشبكة
// ============================================
function NetworkNodes({ color = '#6FE8FF', radius = 2 }) {
  const nodes = useMemo(
    () => Array.from({ length: 48 }, () => pointOnSphere(radius)),
    [radius]
  );

  return (
    <group>
      {nodes.map((pos, i) => (
        <Node key={i} position={pos} color={color} delay={i * 0.08} />
      ))}
    </group>
  );
}

function Node({ position, color, delay }) {
  const ref = useRef();
  const halo = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    const pulse = (Math.sin(t * 1.5) + 1) / 2;

    if (ref.current) {
      ref.current.scale.setScalar(0.9 + pulse * 0.3);
    }
    if (halo.current) {
      halo.current.scale.setScalar(1 + pulse * 1.5);
      if (halo.current.material) {
        halo.current.material.opacity = (1 - pulse) * 0.4;
      }
    }
  });

  return (
    <group position={position}>
      {/* Core node — bright dot */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      {/* Colored glow */}
      <mesh scale={1.8}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      {/* Halo pulse */}
      <mesh ref={halo}>
        <ringGeometry args={[0.06, 0.09, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ============================================
// 2) NETWORK EDGES — اتصالات واضحة
// ============================================
function NetworkEdges({ color = '#6FE8FF', radius = 2 }) {
  const edges = useMemo(() => {
    const pts = Array.from({ length: 28 }, () => pointOnSphere(radius));
    const result = [];

    pts.forEach((p, i) => {
      const distances = pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d);

      const take = 3;
      distances.slice(0, take).forEach(({ j, d }) => {
        if (d < 1.8 && i < j) {
          result.push({ from: p, to: pts[j], opacity: 0.3 + Math.random() * 0.2 });
        }
      });
    });

    return result;
  }, [radius]);

  return (
    <group>
      {edges.map((edge, i) => (
        <Edge key={i} from={edge.from} to={edge.to} color={color} opacity={edge.opacity} />
      ))}
    </group>
  );
}

function Edge({ from, to, color, opacity = 0.35 }) {
  const points = useMemo(() => [from, to], [from, to]);
  const positions = useMemo(
    () => new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])),
    [points]
  );

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}

// ============================================
// 3) DATA PACKETS — حزم بيانات بتتحرك
// ============================================
function DataPackets({ color = '#6FE8FF', radius = 2 }) {
  const packets = useMemo(() => {
    const result = [];
    for (let i = 0; i < 20; i++) {
      const from = pointOnSphere(radius);
      const to = pointOnSphere(radius);
      if (from.distanceTo(to) > 1) {
        result.push({
          from,
          to,
          speed: 0.25 + Math.random() * 0.35,
          delay: Math.random(),
        });
      }
    }
    return result;
  }, [radius]);

  return (
    <group>
      {packets.map((p, i) => (
        <Packet key={i} {...p} color={color} />
      ))}
    </group>
  );
}

function Packet({ from, to, speed, delay, color }) {
  const ref = useRef();
  const trail = useRef();

  const vec = useMemo(() => new THREE.Vector3(), []);
  const trailVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = ((clock.getElapsedTime() * speed + delay) % 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    vec.lerpVectors(from, to, eased);
    if (ref.current) ref.current.position.copy(vec);

    const tTrail = Math.max(0, eased - 0.06);
    trailVec.lerpVectors(from, to, tTrail);
    if (trail.current) trail.current.position.copy(trailVec);
  });

  return (
    <group>
      {/* Main packet — white */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      {/* Trail — colored */}
      <mesh ref={trail}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// ============================================
// 4) FIREWALL SHIELDS — حلقات حماية واضحة
// ============================================
function FirewallShields({ color = '#6FE8FF' }) {
  const shield1 = useRef();
  const shield2 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (shield1.current) {
      shield1.current.rotation.x = t * 0.12;
      shield1.current.rotation.y = t * 0.18;
    }
    if (shield2.current) {
      shield2.current.rotation.x = -t * 0.15;
      shield2.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group>
      {/* Outer wireframe shield */}
      <mesh ref={shield1}>
        <icosahedronGeometry args={[2.35, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
      {/* Bigger outer shield */}
      <mesh ref={shield2}>
        <icosahedronGeometry args={[2.6, 0]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

// ============================================
// 5) SCAN PULSES — نبضات رادار
// ============================================
function ScanPulses({ color = '#6FE8FF' }) {
  return (
    <group>
      <Pulse delay={0}   color={color} />
      <Pulse delay={1.3} color={color} />
      <Pulse delay={2.6} color={color} />
    </group>
  );
}

function Pulse({ delay, color }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = ((clock.getElapsedTime() + delay) % 3.6) / 3.6;
    const scale = 1 + t * 1.8;
    ref.current.scale.setScalar(scale);
    if (ref.current.material) {
      ref.current.material.opacity = (1 - t) * 0.4;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.05, 2.07, 96]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// ============================================
// 6) AXIS RINGS — حلقات المحاور
// ============================================
function AxisRings({ color = '#6FE8FF' }) {
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (r1.current) r1.current.rotation.z = t * 0.08;
    if (r2.current) r2.current.rotation.z = -t * 0.06;
    if (r3.current) r3.current.rotation.y = t * 0.05;
  });

  return (
    <group>
      <mesh ref={r1} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.15, 0.004, 12, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <mesh ref={r2} rotation={[0, Math.PI / 4, Math.PI / 3]}>
        <torusGeometry args={[2.3, 0.003, 12, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
        <torusGeometry args={[2.45, 0.003, 12, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// ============================================
// 7) CORE — نقطة لامعة في المركز بدل الكرة السوداء
// ============================================
function GlowingCore({ color = '#6FE8FF' }) {
  const ref = useRef();
  const halo = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = (Math.sin(t * 1.2) + 1) / 2;
    if (ref.current) {
      ref.current.scale.setScalar(0.9 + pulse * 0.2);
    }
    if (halo.current) {
      halo.current.scale.setScalar(1.5 + pulse * 0.8);
      if (halo.current.material) {
        halo.current.material.opacity = 0.15 - pulse * 0.08;
      }
    }
  });

  return (
    <group>
      {/* Core bright point */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      {/* Colored glow */}
      <mesh scale={2}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      {/* Halo */}
      <mesh ref={halo}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>
      {/* Core light */}
      <pointLight color={color} intensity={3} distance={8} />
    </group>
  );
}

// ============================================
// 8) MAIN GLOBE — يجمع كل حاجة بدون كرة سوداء
// ============================================
function CyberNetworkGlobe({ color = '#6FE8FF' }) {
  const group = useRef();

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={group}>
      {/* No inner black sphere — الشبكة هي الكرة */}
      <GlowingCore color={color} />
      <NetworkNodes color={color} radius={2} />
      <NetworkEdges color={color} radius={2} />
      <DataPackets color={color} radius={2} />
      <AxisRings color={color} />
      <FirewallShields color={color} />
      <ScanPulses color={color} />

      {/* Lights */}
      <pointLight color={color} intensity={1.5} distance={10} position={[0, 3, 2]} />
      <pointLight color="#FFFFFF" intensity={0.6} distance={8} position={[-3, 0, 2]} />
    </group>
  );
}

// ============================================
// Camera
// ============================================
function CameraRig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    const targetX = mouse.x * 0.8;
    const targetY = mouse.y * 0.5;
    vec.set(targetX, targetY, 7);
    camera.position.lerp(vec, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ============================================
// Scene
// ============================================
export default function GlobeScene({ className = '', color = '#6FE8FF' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 45 }}
      >
        <color attach="background" args={['#06070B']} />

        <Suspense fallback={null}>
          <CameraRig />
          <ambientLight intensity={0.3} />
          <CyberNetworkGlobe color={color} />
        </Suspense>
      </Canvas>
    </div>
  );
}