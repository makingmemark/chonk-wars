import { useEffect, useRef, useState } from "react";
import * as THREE from "three/webgpu";
import { extend, Canvas } from "@react-three/fiber";
import { Environment, Float, Loader, OrbitControls } from "@react-three/drei";
import { WebGPUPostProcessing } from "./components/WebGPUPostProcessing";
import { Hall } from "./Hall";
import { Darth } from "./Darth";
import { Probe } from "./Probe";
import { Overlay } from "./components/Overlay";

extend(THREE);

export default function App() {
  const rendererRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [isPostProcessingEnabled, setIsPostProcessingEnabled] = useState(true);

  return (
    <>
      <Overlay
        isPostProcessingEnabled={isPostProcessingEnabled}
        setIsPostProcessingEnabled={setIsPostProcessingEnabled}
      />
      <Loader />

      <Canvas
        onCreated={(state) => {
          state.setSize(window.innerWidth, window.innerHeight);
        }}
        dpr={1}
        camera={{
          position: [6, -0.4, 0],
          near: 0.1,
          far: 100,
          fov: 80,
        }}
        shadows
        gl={(canvas) => {
          const renderer = new THREE.WebGPURenderer({
            canvas,
            powerPreference: "high-performance",
            antialias: false,
            alpha: false,
          });

          // Initialize WebGPU and store renderer reference
          renderer.init();
          rendererRef.current = renderer;
          return renderer;
        }}
      >
        <color attach="background" args={["black"]} />
        {isPostProcessingEnabled && (
          <WebGPUPostProcessing strength={0.15} radius={0.5} />
        )}
        <ambientLight intensity={0.1} />
        <directionalLight position={[-2, 5, 0]} intensity={1} castShadow />
        <OrbitControls
          target={[3, -0.4, 0]}
          zoomSpeed={0.8}
          dampingFactor={0.08}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.5}
        />
        <Environment
          preset="warehouse"
          environmentIntensity={0.2}
          environmentRotation={[0.4, 0, 1.4]}
        />
        <Hall position={[17, 0, 0]} />
        <Float speed={3.5} floatIntensity={0.2} rotationIntensity={0.3}>
          <Probe
            position={[3, 0, 1.2]}
            scale={0.05}
            rotation={[0, Math.PI / 2, 0]}
          />
        </Float>
        <Float speed={3.5} floatIntensity={0.2} rotationIntensity={0.3}>
          <Probe
            position={[3.5, -0.8, -1.2]}
            scale={0.05}
            rotation={[0, Math.PI / 2, 0]}
          />
        </Float>
        <Darth
          scale={0.008}
          position={[3, -1.325, 0.4]}
          rotation={[0, Math.PI / 2, 0]}
        />
      </Canvas>
    </>
  );
}
