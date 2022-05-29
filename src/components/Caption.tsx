import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export const Caption = ({ children }: { children: string }) => {
  const { width } = useThree((state) => state.viewport);
  return (
    <Text
      position={[0, 0, -5]}
      lineHeight={0.8}
      font='assets/Ki-Medium.ttf'
      fontSize={width / 8}
      material-toneMapped={false}
      anchorX='center'
      anchorY='middle'>
      {children}
    </Text>
  );
};
