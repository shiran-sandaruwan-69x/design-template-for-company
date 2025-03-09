import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function CreativeEarthLoading({
  onLoadComplete,
  className = "",
}: {
  onLoadComplete?: () => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add a glowing sphere behind the Earth
    const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Add stars to the background
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
    });

    const starVertices = [];
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3),
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Add orbital rings
    const ringGeometry1 = new THREE.TorusGeometry(2, 0.03, 16, 100);
    const ringMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeometry1, ringMaterial1);
    ring1.rotation.x = Math.PI / 2;
    ring1.rotation.y = Math.PI / 6;
    scene.add(ring1);

    const ringGeometry2 = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ring2.rotation.x = Math.PI / 2 - 0.3;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Add satellites
    const satelliteGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const satelliteMaterial1 = new THREE.MeshPhongMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 0.5,
    });
    const satellite1 = new THREE.Mesh(satelliteGeometry, satelliteMaterial1);
    scene.add(satellite1);

    const satelliteMaterial2 = new THREE.MeshPhongMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.5,
    });
    const satellite2 = new THREE.Mesh(satelliteGeometry, satelliteMaterial2);
    scene.add(satellite2);

    // Add a trail effect for satellites
    const trailGeometry1 = new THREE.BufferGeometry();
    const trailMaterial1 = new THREE.LineBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.4,
    });
    const trailPositions1 = new Float32Array(300); // 100 points * 3 values per point (x, y, z)
    trailGeometry1.setAttribute(
      "position",
      new THREE.BufferAttribute(trailPositions1, 3),
    );
    const trail1 = new THREE.Line(trailGeometry1, trailMaterial1);
    scene.add(trail1);

    const trailGeometry2 = new THREE.BufferGeometry();
    const trailMaterial2 = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.4,
    });
    const trailPositions2 = new Float32Array(300); // 100 points * 3 values per point (x, y, z)
    trailGeometry2.setAttribute(
      "position",
      new THREE.BufferAttribute(trailPositions2, 3),
    );
    const trail2 = new THREE.Line(trailGeometry2, trailMaterial2);
    scene.add(trail2);

    // Load the Earth model
    const loader = new GLTFLoader();
    let earth: THREE.Object3D;

    loader.load(
      "/lib/earth_cartoon.glb",
      (gltf) => {
        earth = gltf.scene;
        earth.scale.set(1.5, 1.5, 1.5);
        scene.add(earth);

        // Simulate complete loading
        setTimeout(() => {
          if (onLoadComplete) onLoadComplete();
        }, 1000);
      },
      (xhr) => {
        const progress = (xhr.loaded / xhr.total) * 100;
        setLoadingProgress(progress);
        console.log(progress + "% loaded");
      },
      (error) => {
        console.error("An error happened", error);
      },
    );

    // Animation loop
    const clock = new THREE.Clock();
    let trailIndex1 = 0;
    let trailIndex2 = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Rotate the earth if it's loaded
      if (earth) {
        earth.rotation.y = time * 0.2;
      }

      // Pulse the glow
      glow.scale.set(
        1 + Math.sin(time * 0.5) * 0.05,
        1 + Math.sin(time * 0.5) * 0.05,
        1 + Math.sin(time * 0.5) * 0.05,
      );
      glowMaterial.opacity = 0.2 + Math.sin(time * 0.5) * 0.05;

      // Rotate the rings
      ring1.rotation.z = time * 0.1;
      ring2.rotation.z = -time * 0.05;

      // Move satellites
      const satellite1Pos = {
        x: Math.cos(time * 0.5) * 2,
        y: Math.sin(time * 0.5) * 0.5,
        z: Math.sin(time * 0.5) * 2,
      };

      const satellite2Pos = {
        x: Math.cos(time * 0.3 + Math.PI) * 2.5,
        y: Math.sin(time * 0.3) * 0.3,
        z: Math.sin(time * 0.3 + Math.PI) * 2.5,
      };

      satellite1.position.set(
        satellite1Pos.x,
        satellite1Pos.y,
        satellite1Pos.z,
      );
      satellite2.position.set(
        satellite2Pos.x,
        satellite2Pos.y,
        satellite2Pos.z,
      );

      // Update satellite trails
      trailPositions1[trailIndex1 * 3] = satellite1Pos.x;
      trailPositions1[trailIndex1 * 3 + 1] = satellite1Pos.y;
      trailPositions1[trailIndex1 * 3 + 2] = satellite1Pos.z;

      trailPositions2[trailIndex2 * 3] = satellite2Pos.x;
      trailPositions2[trailIndex2 * 3 + 1] = satellite2Pos.y;
      trailPositions2[trailIndex2 * 3 + 2] = satellite2Pos.z;

      trailIndex1 = (trailIndex1 + 1) % 100;
      trailIndex2 = (trailIndex2 + 1) % 100;

      trailGeometry1.attributes.position.needsUpdate = true;
      trailGeometry2.attributes.position.needsUpdate = true;

      // Slowly rotate the stars
      stars.rotation.y += 0.0002;
      stars.rotation.x += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onLoadComplete]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: "300px" }}
      />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${loadingProgress}%` }}
        />
      </div>
    </div>
  );
}
