import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  // Load Earth textures
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
    ],
  );

  // Animate the Earth rotation
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <>
      {/* Earth sphere */}
      <Sphere ref={earthRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={5}
        />
      </Sphere>

      {/* Cloud layer */}
      <Sphere ref={cloudRef} args={[1.01, 64, 64]} position={[0, 0, 0]}>
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </Sphere>

      {/* Holographic ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.04, 16, 100]} />
        <meshPhongMaterial color="#3b82f6" transparent opacity={0.6} />
      </mesh>

      {/* Second holographic ring */}
      <mesh rotation={[Math.PI / 2 - 0.2, 0.3, 0]}>
        <torusGeometry args={[1.7, 0.02, 16, 100]} />
        <meshPhongMaterial color="#8b5cf6" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

function HolographicParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    // Randomize particle positions
    const positions = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const radius = 1.8 + Math.random() * 0.5;
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
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          itemSize={3}
          array={new Float32Array(1000 * 3)}
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

function Scene() {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.1} />

      {/* Directional light (sun) */}
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />

      {/* Point lights for holographic effect */}
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, -3, 0]} intensity={0.5} color="#8b5cf6" />

      <Earth />
      <HolographicParticles />

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
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
