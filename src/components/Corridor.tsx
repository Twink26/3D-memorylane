import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

export function Corridor() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && 'opacity' in meshRef.current.material) {
      // Gentle pulsing effect
      meshRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* Main corridor tube */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, -20]}>
        <cylinderGeometry args={[8, 8, 100, 32, 1, true]} />
        <meshStandardMaterial
          color="#0ea5e9"
          transparent
          opacity={0.05}
          side={2}
          wireframe
        />
      </mesh>

      {/* Grid floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -20]}>
        <planeGeometry args={[50, 100, 20, 40]} />
        <meshStandardMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Ambient light rings */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0, -i * 10]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[7, 0.1, 16, 100]} />
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      {/* Particle field */}
      {Array.from({ length: 100 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 15;
        const y = (Math.random() - 0.5) * 10;
        const z = -Math.random() * 50;
        
        return (
          <mesh key={`particle-${i}`} position={[x, y, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={Math.random() * 0.5 + 0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
