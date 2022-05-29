import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bg } from '../components/Bg';
import Noodles from '../components/Noodles';
import { Caption } from '../components/Caption';
import { Rig } from '../components/Rig';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 192px;
  height: 48px;
  border: none;
  border-radius: 50px;
  background-color: #d83519;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 150ms ease-in;
  &:hover {
    cursor: pointer;
    background-color: #c12f16;
    transform: translate(-50%, -50%) scale(1.05);
  }
`;

const HomeView = () => {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}>
        <Bg />
        <Suspense fallback={null}>
          <Noodles />
          <Caption>{`ELYSIUM\nMUSIC\nPLAYER`}</Caption>
          <Rig />
        </Suspense>
      </Canvas>
      <Button onClick={() => navigate('/player')}>OPEN PLAYER</Button>
    </div>
  );
};

export default HomeView;
