import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function EarthAnimation({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Earth geometry
    const earthGeometry = new THREE.IcosahedronGeometry(1, 2);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x112244,
      specular: 0xffffff,
      shininess: 10,
      flatShading: true,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Continents (random shapes on the surface)
    const continentGeometry = new THREE.IcosahedronGeometry(0.2, 0);
    const continentMaterial = new THREE.MeshPhongMaterial({
      color: 0x2ecc71,
      flatShading: true,
    });

    // Add random continents
    for (let i = 0; i < 15; i++) {
      const continent = new THREE.Mesh(continentGeometry, continentMaterial);
      const phi = Math.acos(-1 + (2 * i) / 15);
      const theta = Math.sqrt(15 * Math.PI) * phi;

      continent.position.setFromSphericalCoords(
        1.01, // Slightly above the earth surface
        phi,
        theta,
      );

      continent.scale.setScalar(Math.random() * 0.5 + 0.5);
      continent.lookAt(0, 0, 0); // Make it face the center
      earth.add(continent);
    }

    // Orbit rings
    const orbitGeometry1 = new THREE.TorusGeometry(1.5, 0.03, 16, 100);
    const orbitMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6,
    });
    const orbit1 = new THREE.Mesh(orbitGeometry1, orbitMaterial1);
    orbit1.rotation.x = Math.PI / 2;
    scene.add(orbit1);

    const orbitGeometry2 = new THREE.TorusGeometry(1.8, 0.02, 16, 100);
    const orbitMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.4,
    });
    const orbit2 = new THREE.Mesh(orbitGeometry2, orbitMaterial2);
    orbit2.rotation.x = Math.PI / 2 - 0.3;
    orbit2.rotation.y = 0.3;
    scene.add(orbit2);

    // Satellites
    const satelliteGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
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

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 1, 10);
    blueLight.position.set(0, 3, 0);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 1, 10);
    purpleLight.position.set(0, -3, 0);
    scene.add(purpleLight);

    // Animation loop
    const animate = () => {
      const time = Date.now() * 0.001;

      // Rotate earth
      earth.rotation.y = time * 0.1;

      // Rotate orbits
      orbit1.rotation.z = time * 0.05;
      orbit2.rotation.z = -time * 0.03;

      // Move satellites
      satellite1.position.x = Math.cos(time * 0.5) * 1.5;
      satellite1.position.z = Math.sin(time * 0.5) * 1.5;
      satellite1.rotation.y = time * 2;

      satellite2.position.x = Math.cos(time * 0.3 + Math.PI) * 1.8;
      satellite2.position.z = Math.sin(time * 0.3 + Math.PI) * 1.8;
      satellite2.rotation.y = time * 1.5;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize and cleanup
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

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // Dispose resources
      earthGeometry.dispose();
      earthMaterial.dispose();
      continentGeometry.dispose();
      continentMaterial.dispose();
      orbitGeometry1.dispose();
      orbitMaterial1.dispose();
      orbitGeometry2.dispose();
      orbitMaterial2.dispose();
      satelliteGeometry.dispose();
      satelliteMaterial1.dispose();
      satelliteMaterial2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{ minHeight: "300px" }}
    />
  );
}
