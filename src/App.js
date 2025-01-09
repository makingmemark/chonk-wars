import { useMemo, useState } from "react";
import * as THREE from "three/webgpu";
import { extend, Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { uniform, mix, positionLocal, sin, time, vec3, color } from "three/tsl";
import { easing } from "maath";
import { WebGPUPostProcessing } from "./components/WebGPUPostProcessing";
import { Hall } from "./Hall";

extend(THREE);

export default function App() {
  return (
    <Canvas
      onCreated={(state) => {
        state.setSize(window.innerWidth, window.innerHeight);
      }}
      gl={(canvas) => {
        const renderer = new THREE.WebGPURenderer({
          canvas,
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
        });
        // Initialize WebGPU
        renderer.init();
        return renderer;
      }}
    >
      <color attach="background" args={["black"]} />
      <WebGPUPostProcessing strength={1.5} radius={0.25} />
      <ambientLight intensity={4} />
      <directionalLight position={[0, 1, 1]} intensity={2} />
      <Sphere scale={0.5} position={[-1.5, 2.5, -3]} />
      <Sphere scale={0.5} position={[-1.3, 0, 0]} />
      <Sphere scale={0.5} position={[0.6, 0, 2]} />
      <OrbitControls />
      <Hall />
    </Canvas>
  );
}

function Sphere(props) {
  const { uHovered, colorNode, positionNode, emissiveNode } = useMemo(() => {
    const uHovered = uniform(0.0);
    const col1 = color("orange");
    const col2 = color("hotpink");
    const col3 = color("red");
    const currentTime = time.mul(2);
    const colorNode = mix(
      mix(col1, col2, sin(currentTime).add(1).div(2)),
      col3,
      uHovered
    );
    const positionNode = positionLocal.add(
      vec3(0, sin(currentTime).mul(0.05), 0)
    );
    const emissiveNode = colorNode.mul(2.0);
    return { uHovered, colorNode, positionNode, emissiveNode };
  }, []);

  const [hovered, hover] = useState(false);
  useFrame((state, delta) => {
    easing.damp(uHovered, "value", hovered ? 1 : 0, 0.1, delta);
  });

  return (
    <mesh
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <sphereGeometry />
      <meshPhysicalNodeMaterial
        colorNode={colorNode}
        positionNode={positionNode}
        emissiveNode={emissiveNode}
        roughness={0.3}
        metalness={0.9}
        emissiveIntensity={2.0}
        side={THREE.DoubleSide}
        key={colorNode.uuid}
      />
    </mesh>
  );
}
