'use client'
import React from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { RGBELoader } from 'three-stdlib';
import { meshBounds, OrbitControls, useGLTF, Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from 'react';
import { divMode } from 'tsparticles-engine';

function EarthModel(){
  const { scene } = useGLTF('/models/earth.glb')
  return (
    <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<div>Loading...</div>}>
            <primitive object={scene} scale={2.2} /> 
        </Suspense>
        {/* <NetworkOverlay />  */}
        <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default React.memo(EarthModel);