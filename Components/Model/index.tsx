import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const NeuralLinks = () => {
  const sphereCount = 200; // Number of nodes

  // Generate random node positions in a 3D space
  const spheres = useMemo(() => {
    const positions = [];
    for (let i = 0; i < sphereCount; i++) {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      const z = Math.random() * 200 - 100;
      positions.push({ position: [x, y, z] as [number, number, number], size: 1.0 }); // Increased size for visibility
    }
    return positions;
  }, [sphereCount]);

  // Generate connections between nodes
  const links = useMemo(() => {
    const result = [];
    for (let i = 0; i < sphereCount - 1; i++) {
      const start = spheres[i].position;
      const end = spheres[i + 1].position;
      result.push({ start, end });
    }
    // Optionally, connect the last node to the first one to close the loop
    // result.push({ start: spheres[sphereCount - 1].position, end: spheres[0].position });
    return result;
  }, [spheres, sphereCount]);

  const meshRefs = useRef<any[]>([]);

  useEffect(() => {
    meshRefs.current = meshRefs.current.slice(0, sphereCount);
  }, [sphereCount]);

  useFrame(({ clock }: any) => {
    const time = clock.getElapsedTime();
    meshRefs.current.forEach((mesh: any) => {
      if (mesh) {
        mesh.rotation.y = time * 0.1;
        mesh.rotation.x = time * 0.05;
      }
    });
  });

  // Create curved line
  const createCurvedLine = (start: [number, number, number], end: [number, number, number]) => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + Math.random() * 5, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end)
    );
    const points = curve.getPoints(50);
    return new THREE.BufferGeometry().setFromPoints(points);
  };

  // Randomly select a node to display the message
  const randomIndex = Math.floor(Math.random() * spheres.length);
  const randomPosition = spheres[randomIndex].position;

  return (
    <>
      {spheres.map((sphere, index) => (
        <mesh
          key={index}
          ref={(el: any) => (meshRefs.current[index] = el)}
          position={sphere.position as [number, number, number]}
        >
          <sphereGeometry args={[1.0, 16, 16]} /> {/* Adjusted size */}
          <meshStandardMaterial color={`#FF0000`} />
        </mesh>
      ))}

      {links.map((link, index) => {
        const geometry = createCurvedLine(link.start as [number, number, number], link.end as [number, number, number]);
        return (
          <line key={index}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial color="white" linewidth={2} /> {/* Increased linewidth for visibility */}
          </line>
        );
      })}

      {/* Display the message at the randomly selected node */}
      <Html position={randomPosition as [number, number, number]}>
        <div style={{
          color: 'white',
          backgroundColor: 'red',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          You are here
        </div>
      </Html>
    </>
  );
};

const NeuralLinksModel = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw', backgroundColor: '#000' }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <NeuralLinks />
      <OrbitControls />
    </Canvas>
  );
};

export default NeuralLinksModel;
