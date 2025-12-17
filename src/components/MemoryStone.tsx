import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { Memory } from '@/types/memory';

interface MemoryStoneProps {
  memory: Memory;
  onClick: (memory: Memory) => void;
  isSelected: boolean;
}

export function MemoryStone({ memory, onClick, isSelected }: MemoryStoneProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = memory.position[1] + Math.sin(state.clock.elapsedTime + memory.position[0]) * 0.2;
      
      // Gentle rotation
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;

      // Scale on hover
      const targetScale = hovered || isSelected ? 1.3 : 1;
      meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
      meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
      meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;
    }
  });

  return (
    <group position={[memory.position[0], 0, memory.position[2]]}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(memory)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color={memory.color}
          emissive={memory.color}
          emissiveIntensity={hovered || isSelected ? 0.8 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow effect */}
      <mesh position={[0, memory.position[1], 0]} scale={hovered || isSelected ? 2 : 1.5}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial
          color={memory.color}
          transparent
          opacity={hovered || isSelected ? 0.3 : 0.15}
        />
      </mesh>

      {/* Particle ring */}
      <mesh position={[0, memory.position[1], 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshBasicMaterial
          color={memory.color}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}
