"use client"
import React from "react";
import { OrbitControls, Decal } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three';
export default function TriangularSphere({technology}){
  const texture = useLoader(TextureLoader, technology);
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh scale={1.2}>
        <icosahedronGeometry args={[1, 2]} /> 
        <meshStandardMaterial color="#FFFFE0" roughness={0.4} metalness={0.3} flatShading/>
        <Decal
          position={[0, 0, 1]}  
          rotation={[0, 0, 0]}   
          scale={0.7}            
          map={texture}
          flatShading
          transparent
        />
      </mesh>
      <OrbitControls enableZoom={false}/>
    </Canvas>
  )
}