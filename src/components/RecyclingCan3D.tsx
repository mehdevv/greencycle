import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Group, MeshStandardMaterial } from 'three';
import * as THREE from 'three';

// Detect device performance
const isLowEndDevice = () => {
  if (typeof window === 'undefined') return true;
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  const deviceMemory = (navigator as any).deviceMemory || 2;
  return hardwareConcurrency <= 4 || deviceMemory <= 4;
};

// Performance settings for low-end devices (function to compute at runtime)
const getPerformanceMode = () => {
  const lowEnd = isLowEndDevice();
  return {
    pixelRatio: lowEnd 
      ? Math.min(window.devicePixelRatio || 1, 1) 
      : Math.min(window.devicePixelRatio || 1, 1.5),
    shadows: false, // Disable shadows for better performance
    antialias: !lowEnd, // Disable antialias on low-end devices
    dpr: lowEnd ? [0.5, 1] : [0.5, 1.5], // Adaptive pixel ratio
  };
};

// Optimized model loader with performance settings
function Model({ url, useManualRotation = false, rotationSpeed = 0.5 }: { url: string; useManualRotation?: boolean; rotationSpeed?: number }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<Group>(null);
  const lowEnd = isLowEndDevice();

  // Optimize the model for performance
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Optimize materials for better performance
        if (child.material instanceof MeshStandardMaterial || child.material instanceof THREE.MeshStandardMaterial) {
          // Use simpler shading on low-end devices
          if (lowEnd) {
            child.material.flatShading = true;
          }
          child.material.needsUpdate = true;
        }
        
        // Enable frustum culling for performance
        child.frustumCulled = true;
        
        // Optimize geometry
        if (child.geometry) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
        
        // Reduce render order complexity
        child.renderOrder = 0;
      }
    });
  }, [scene, lowEnd]);

  // Manual rotation only when OrbitControls is not used (low-end devices)
  useFrame((_state, delta) => {
    if (groupRef.current && useManualRotation) {
      // Use delta time for smooth rotation
      groupRef.current.rotation.y += rotationSpeed * delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={[2.2, 2.2, 2.2]} rotation={[0, -Math.PI / 9, -Math.PI / 18]}>
      <primitive object={scene} />
    </group>
  );
}

// Loading fallback component - simple and performant
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#10b981" wireframe />
    </mesh>
  );
}

interface RecyclingCan3DProps {
  size?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export function RecyclingCan3D({ 
  size = 850, 
  autoRotate = true, 
  rotationSpeed = 0.5 
}: RecyclingCan3DProps) {
  const modelUrl = '/models/green recycling can 3d model.glb';
  const lowEnd = isLowEndDevice();
  const performanceMode = getPerformanceMode();

  // Preload the model for better performance
  useEffect(() => {
    try {
      useGLTF.preload(modelUrl);
    } catch (error) {
      console.error('Error preloading 3D model:', error);
    }
  }, [modelUrl]);

  return (
      <div 
      style={{ 
        width: size, 
        height: size * 1.1, 
        position: 'relative',
      }}
      className="relative"
    >
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: lowEnd ? 50 : 45, // Standard FOV
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: performanceMode.antialias,
          alpha: true,
          powerPreference: lowEnd ? 'default' : 'high-performance',
          preserveDrawingBuffer: false,
          stencil: false, // Disable stencil buffer for performance
          depth: true,
        }}
        dpr={performanceMode.dpr as [number, number]}
        performance={{ min: lowEnd ? 0.3 : 0.5 }} // More lenient on low-end devices
        frameloop="always"
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'transparent',
        }}
      >
        {/* Optimized lighting - fewer lights on low-end devices */}
        <ambientLight intensity={lowEnd ? 0.7 : 0.6} />
        {!lowEnd && (
          <>
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={0.8}
              castShadow={performanceMode.shadows}
            />
            <pointLight position={[-5, -5, -5]} intensity={0.4} />
          </>
        )}
        {lowEnd && (
          <directionalLight position={[5, 5, 5]} intensity={0.9} />
        )}
        
        {/* Load model with suspense for better loading experience */}
        <Suspense fallback={<LoadingFallback />}>
          <Model 
            url={modelUrl} 
            useManualRotation={lowEnd && autoRotate}
            rotationSpeed={rotationSpeed}
          />
        </Suspense>
        
        {/* Orbit controls for interaction - handles auto-rotate on non-low-end devices */}
        {!lowEnd && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={rotationSpeed * 2}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            dampingFactor={0.05}
            enableDamping={true}
            target={[0, 0, 0]}
          />
        )}
      </Canvas>
    </div>
  );
}

