'use client'
import React, { useEffect, useRef, useState } from "react";
import { Suspense } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { RGBELoader } from 'three-stdlib';
import { meshBounds, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Fox = ({currentAnimation, ...props}) => {
    const group = useRef();
    const { scene, nodes, materials, animations } = useGLTF('/models/fox.glb');
    const { actions, names, mixer } = useAnimations(animations, group)

    useEffect(() => {
        console.log(actions)
        Object.values(actions).forEach((action) => action.stop())
        actions[currentAnimation]?.play()
    },[actions, currentAnimation])

    return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_7.skeleton}
        />
        <skinnedMesh
          name="Object_8"
          geometry={nodes.Object_8.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_8.skeleton}
        />
        <skinnedMesh
          name="Object_9"
          geometry={nodes.Object_9.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_9.skeleton}
        />
        <skinnedMesh
          name="Object_10"
          geometry={nodes.Object_10.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_10.skeleton}
        />
        <skinnedMesh
          name="Object_11"
          geometry={nodes.Object_11.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_11.skeleton}
        />
      </group>
    </group>
  )
}

export default Fox
