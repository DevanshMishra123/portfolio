'use client'
import React, { useEffect, useRef, useState } from "react";
import { Suspense } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { RGBELoader } from 'three-stdlib';
import { meshBounds, OrbitControls, useGLTF, Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

function Laptop() {
  const modelRef = useRef();
  const { scene } = useGLTF('/models/gamingPc.glb');
  const [targetRotation, setTargetRotation] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = scrollY * 0.002;
      setTargetRotation(rotation);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    if (modelRef.current) 
      modelRef.current.rotation.y += (targetRotation - modelRef.current.rotation.y) * 0.1;
  })

  return <primitive ref={modelRef} object={scene} scale={4} />;
}

function AnimatedLaptop() {
  return (
    <Canvas style={{ height: '400px' }} camera={{ position: [8, 3, 0], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <Suspense fallback={null}>
        <Laptop />
      </Suspense>
      <Laptop />
    </Canvas>
  );
}

export default React.memo(AnimatedLaptop)
{/* <Sky
        distance={450000} 
        sunPosition={[100, 20, 100]}
        inclination={0}
        azimuth={0.25}
        mieCoefficient={0.005}
        turbidity={10}
        rayleigh={1}
/> */}
{/* <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} /> */}