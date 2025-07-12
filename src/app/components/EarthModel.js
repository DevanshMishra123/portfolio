import React from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { RGBELoader } from 'three-stdlib';
import { meshBounds, OrbitControls, useGLTF, Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

function EarthModel(){
  const { scene } = useGLTF('/earth.glb')
  return <primitive object={scene} scale={2.2} />
}

export default React.memo(EarthModel);