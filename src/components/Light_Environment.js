import { Environment } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

export function Light_Environment() {
  return (
    <>
      <directionalLight
        position={[-1, 1, 0.1]}
        intensity={2}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-camera-top={3}
        shadow-camera-right={3}
        shadow-camera-bottom={-3}
        shadow-camera-left={-3}
        shadow-bias={-0.001}
      />
      <OrbitControls
        target={[2, -0.6, 0]}
        // zoomSpeed={0.8}
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.5}
        maxDistance={2.4}
        minDistance={0.5}
      />
      <Environment
        preset="warehouse"
        environmentIntensity={0.2}
        environmentRotation={[0.4, 0, 1.4]}
      />
    </>
  );
}
