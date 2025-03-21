import { useControls } from "leva";
import { useBox } from "@react-three/cannon";
import DummyCarBody from "./dummy/DummyCarBody";

const Car = () => {
  const chassisBodyValue = useControls("chassisBody", {
    width: { value: 0.16, min: 0, max: 1 }, // 차의 가로 너비
    height: { value: 0.12, min: 0, max: 1 }, // 차체 높이
    front: { value: 0.17 * 2, min: 0, max: 1 }, // 차체 길이 (바퀴 들어갈 공간을 위해 *2)
  });

  const position = [0, 0.5, 0];

  let width, height, front, mass, wheelRadius;

  width = 0.16;
  height = 0.12;
  front = 0.17;
  mass = 150;

  const chassisBodyArgs = [width, height, front * 2];

  const [chassisBody, chassisApi] = useBox(() => ({
    args: chassisBodyArgs,
    position: position,
    mass,
  }));
  return (
    <group>
      {/* 차체 */}
      <group ref={chassisBody}>
        {/* 차체 바디 */}
        <DummyCarBody
          width={chassisBodyValue.width}
          height={chassisBodyValue.height}
          front={chassisBodyValue.front}
        />
      </group>
      {/* 바퀴 */}
    </group>
  );
};

export default Car;
