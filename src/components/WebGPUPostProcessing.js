import * as THREE from "three/webgpu";
import { pass, mrt, output, emissive } from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { ssr } from "three/addons/tsl/display/SSRNode.js";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export function WebGPUPostProcessing({ strength = 2.5, radius = 0.5 }) {
  const { gl: renderer, scene, camera } = useThree();
  const postProcessingRef = useRef(null);

  const params = {
    maxDistance: 0.5,
    opacity: 1,
    thickness: 0.015,
    enabled: true,
  };

  useEffect(() => {
    if (!renderer || !scene || !camera) return;

    // Create post-processing setup
    const scenePass = pass(scene, camera);

    scenePass.setMRT(
      mrt({
        output,
        emissive,
      })
    );

    const outputPass = scenePass.getTextureNode();
    const emissivePass = scenePass.getTextureNode("emissive");
    const bloomPass = bloom(emissivePass, strength, radius);

    const postProcessing = new THREE.PostProcessing(renderer);
    postProcessing.outputNode = outputPass.add(bloomPass);
    postProcessingRef.current = postProcessing;

    // Handle window resize
    const handleResize = () => {
      if (postProcessing.setSize) {
        postProcessing.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      postProcessingRef.current = null;
    };
  }, [renderer, scene, camera, strength, radius]);

  // Use useFrame para renderizar o post-processing após a cena principal
  useFrame(({ gl, scene, camera }) => {
    if (postProcessingRef.current) {
      gl.clear();
      postProcessingRef.current.render();
    }
  }, 1); // Prioridade 1 para garantir que rode após a renderização normal

  return null;
}
