'use client'
import React, { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RGBELoader } from 'three-stdlib';
import { meshBounds, OrbitControls, useGLTF, Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

function NetworkOverlay({ count = 5000, radius = 2.2 }) {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count, radius]);

  return (
    <>
    <Canvas>
      <Points positions={points} stride={3}>
        <PointMaterial
          size={0.02}
          color="violet"
          sizeAttenuation
          transparent
          opacity={0.7}
        />
      </Points>
    </Canvas>
    </>
  );
}

export default NetworkOverlay