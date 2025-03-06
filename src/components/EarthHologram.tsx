import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Icosahedron, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Low-poly Earth component
function LowPolyEarth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Animate the Earth rotation
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = clock.getElapsedTime() * -0.05;
    }
  });

  return (
    <>
      {/* Earth base */}
      <Icosahedron ref={earthRef} args={[1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4dabf7"
          flatShading
          roughness={0.8}
          metalness={0.2}
        />
      </Icosahedron>

      {/* Land masses */}
      <group ref={cloudRef}>
        {Array.from({ length: 15 }).map((_, i) => {
          const scale = 0.1 + Math.random() * 0.2;
          const angle = Math.random() * Math.PI * 2;
          const tilt = Math.random() * Math.PI;
          const distance = 1;

          const x = distance * Math.sin(tilt) * Math.cos(angle);
          const y = distance * Math.sin(tilt) * Math.sin(angle);
          const z = distance * Math.cos(tilt);

          return (
            <mesh key={i} position={[x, y, z]} scale={scale}>
              <icosahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial color="#2ecc71" flatShading />
            </mesh>
          );
        })}
      </group>

      {/* Atmosphere glow */}
      <Sphere ref={atmosphereRef} args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4dabf7"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Holographic rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.6}
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2 - 0.3, 0.3, 0]}>
        <torusGeometry args={[1.7, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
        />
      </mesh>
    </>
  );
}

// Floating particles around the Earth
function HolographicParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesCount = 1500;

  useEffect(() => {
    if (!particlesRef.current) return;

    // Randomize particle positions
    const positions = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const radius = 1.8 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      particlesRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          itemSize={3}
          array={new Float32Array(particlesCount * 3)}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4dabf7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Floating digital elements
function DigitalElements() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }).map((_, i) => {
        const scale = 0.05 + Math.random() * 0.05;
        const angle = Math.random() * Math.PI * 2;
        const tilt = Math.random() * Math.PI;
        const distance = 2.2 + Math.random() * 0.3;

        const x = distance * Math.sin(tilt) * Math.cos(angle);
        const y = distance * Math.sin(tilt) * Math.sin(angle);
        const z = distance * Math.cos(tilt);

        const shape =
          Math.random() > 0.5 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : (
            <octahedronGeometry args={[0.8, 0]} />
          );

        return (
          <mesh key={i} position={[x, y, z]} scale={scale}>
            {shape}
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6"}
              transparent
              opacity={0.7}
              emissive={Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6"}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene() {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional light (sun) */}
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />

      {/* Point lights for holographic effect */}
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, -3, 0]} intensity={0.5} color="#8b5cf6" />

      <LowPolyEarth />
      <HolographicParticles />
      <DigitalElements />

      {/* Controls for touch/mouse interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function EarthHologram({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
