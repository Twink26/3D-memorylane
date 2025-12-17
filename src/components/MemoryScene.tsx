import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { MemoryStone } from './MemoryStone';
import { Corridor } from './Corridor';
import { memories } from '@/data/memories';
import { Memory } from '@/types/memory';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MemorySceneProps {
  selectedMemory: Memory | null;
  onMemorySelect: (memory: Memory | null) => void;
}

export function MemoryScene({ selectedMemory, onMemorySelect }: MemorySceneProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (selectedMemory && cameraRef.current && controlsRef.current) {
      // Animate camera to selected stone
      const targetPosition = new THREE.Vector3(
        selectedMemory.position[0],
        selectedMemory.position[1] + 2,
        selectedMemory.position[2] + 5
      );

      const startPosition = cameraRef.current.position.clone();
      const startTarget = controlsRef.current.target.clone();
      const targetLookAt = new THREE.Vector3(
        selectedMemory.position[0],
        selectedMemory.position[1],
        selectedMemory.position[2]
      );

      let progress = 0;
      const duration = 1.5;

      const animate = () => {
        progress += 0.016 / duration; // ~60fps

        if (progress < 1) {
          // Smooth camera transition
          cameraRef.current!.position.lerpVectors(startPosition, targetPosition, easeInOutCubic(progress));
          controlsRef.current.target.lerpVectors(startTarget, targetLookAt, easeInOutCubic(progress));
          controlsRef.current.update();
          requestAnimationFrame(animate);
        } else {
          cameraRef.current!.position.copy(targetPosition);
          controlsRef.current.target.copy(targetLookAt);
          controlsRef.current.update();
        }
      };

      animate();
    }
  }, [selectedMemory]);

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  return (
    <Canvas shadows className="w-full h-full">
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 2, 10]}
        fov={75}
      />

      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={30}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
      />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#0ea5e9" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#60a5fa"
      />

      {/* Background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Scene elements */}
      <Corridor />

      {/* Memory stones */}
      {memories.map((memory) => (
        <MemoryStone
          key={memory.id}
          memory={memory}
          onClick={onMemorySelect}
          isSelected={selectedMemory?.id === memory.id}
        />
      ))}

      {/* Fog for depth */}
      <fog attach="fog" args={['#0f172a', 10, 60]} />
    </Canvas>
  );
}
