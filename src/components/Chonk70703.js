/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Chonk70703(props) {
  const { nodes, materials } = useGLTF('/70703.glb')
  const [visibleMeshes, setVisibleMeshes] = useState(new Set())

  // Add effect to gradually show meshes
  useEffect(() => {
    const totalMeshes = 383 // Total number of meshes (0-382)
    const delayPerMesh = 10 // Milliseconds between each mesh appearance

    for (let i = 0; i < totalMeshes; i++) {
      setTimeout(() => {
        setVisibleMeshes(prev => new Set([...prev, i]))
      }, i * delayPerMesh)
    }
  }, [])

  // Function to check if a material's color matches target color
  const processEmissiveMaterial = (material) => {
    if (!material.color) return material

    // Create a new material to avoid modifying the original
    const newMaterial = material.clone()

    // Convert material color to hex for easier comparison
    const colorHex = '#' + newMaterial.color.getHexString()

    // Check for specific colors and set emissive properties
    if (colorHex === '#ff0021' || colorHex === '#ff3953') { // Red
      newMaterial.emissive = newMaterial.color
      newMaterial.emissiveIntensity = 6
    } else if (colorHex === '#0d0d0d' || colorHex === '#262626' || colorHex === '#000000') {
      newMaterial.emissive = newMaterial.color
      // newMaterial.emissiveIntensity = 5
      // make it shiny
      newMaterial.roughness = 0
      newMaterial.metalness = 1
    } else {
      newMaterial.emissive = newMaterial.color
      newMaterial.emissiveIntensity = 0.25
    }
    // Add more color conditions as needed
    // else if (colorHex === '#00ff00') { // Green
    //   newMaterial.emissive = newMaterial.color
    //   newMaterial.emissiveIntensity = 1
    // }

    return newMaterial
  }

  // Helper function to create mesh with processed material
  const createMeshWithProcessedMaterial = (meshData, index) => (
    <mesh
      key={`mesh_${index}`}
      castShadow
      receiveShadow
      geometry={meshData.geometry}
      material={processEmissiveMaterial(meshData.material)}
      position={meshData.position}
      visible={true}
      // {visibleMeshes.has(index)}
    />
  )

  return (
    <group {...props} dispose={null}>
      <group rotation={[0, Math.PI / 2, 0]}>
        {/* Process all meshes from 0 to 7 */}
        {Array.from({ length: 8 }, (_, i) => (
          createMeshWithProcessedMaterial(nodes[`mesh_${i}`], i)
        ))}
      </group>
      <group rotation={[0, Math.PI / 2, 0]}>
        {/* Process meshes from 8 to 43 */}
        {Array.from({ length: 36 }, (_, i) => (
          createMeshWithProcessedMaterial(nodes[`mesh_${i + 8}`], i + 8)
        ))}
      </group>
      <group rotation={[0, Math.PI / 2, 0]}>
        {/* Process meshes from 44 to 123 */}
        {Array.from({ length: 80 }, (_, i) => (
          createMeshWithProcessedMaterial(nodes[`mesh_${i + 44}`], i + 44)
        ))}
      </group>
      <group rotation={[0, Math.PI / 2, 0]}>
        {/* Process remaining meshes from 124 to 382 */}
        {Array.from({ length: 259 }, (_, i) => (
          createMeshWithProcessedMaterial(nodes[`mesh_${i + 124}`], i + 124)
        ))}
      </group>
    </group>
  )
}

useGLTF.preload('/70703.glb')
