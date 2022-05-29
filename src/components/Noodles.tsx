import * as THREE from 'three';
import { useState, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import { LayerMaterial, Depth, Fresnel, Noise, Color } from 'lamina/vanilla';
import { Mesh, Vector3 } from 'three';
import { GLTF } from 'three-stdlib/loaders/GLTFLoader';

const colorA = new THREE.Color('#2941ab').convertSRGBToLinear();
const colorB = new THREE.Color('#0f1c4d').convertSRGBToLinear();
const fresnel = new THREE.Color('#ffcdd1').convertSRGBToLinear();
const material = new LayerMaterial({
  layers: [
    new Color({ color: colorA }),
    new Depth({
      colorA,
      colorB,
      alpha: 0.5,
      mode: 'normal',
      near: 0,
      far: 2,
      origin: [1, 1, 1],
    }),
    new Depth({
      colorA: 'purple',
      colorB,
      alpha: 0.5,
      mode: 'add',
      near: 3,
      far: 2,
      origin: [1, 1, 1],
    }),
    new Fresnel({
      mode: 'add',
      color: fresnel,
      intensity: 0.3,
      power: 2.5,
      bias: 0.0,
    }),
    new Noise({
      mapping: 'local',
      type: 'simplex',
      scale: 1000,
      colorA: '#ffaf40',
      colorB: 'black',
      mode: 'overlay',
    }),
  ],
});

type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
};

const Noodle = () => {
  const { viewport, camera } = useThree();
  const { nodes } = useGLTF('/assets/worms-transformed.glb') as GLTFResult;
  const [geometry] = useState(
    () => nodes[`noodle_${Math.ceil(Math.random() * 4)}`].geometry
  );
  const [speed] = useState(() => 0.1 + Math.random() / 10);

  const position = useMemo<Vector3>(() => {
    const z = Math.random() * -30;
    const bounds = viewport.getCurrentViewport(camera, [0, 0, z]);
    return new Vector3(
      THREE.MathUtils.randFloatSpread(bounds.width),
      THREE.MathUtils.randFloatSpread(bounds.height * 0.75),
      z
    );
  }, [viewport]);

  return (
    <Float
      position={position}
      speed={speed}
      rotationIntensity={10}
      floatIntensity={40}
      dispose={null}>
      <mesh scale={5} geometry={geometry} material={material} />
    </Float>
  );
};

const Noodles = () => {
  return (
    <>
      {Array.from({ length: 25 }, (_, i) => (
        <Noodle key={i} />
      ))}
    </>
  );
};

export default Noodles;

useGLTF.preload('/assets/worms-transformed.glb');
