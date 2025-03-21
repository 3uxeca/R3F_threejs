import { useControls } from "leva";
import { useCompoundBody, useRaycastVehicle } from "@react-three/cannon";
import DummyCarBody from "./dummy/DummyCarBody";
import { useRef } from "react";
import DummyWheel from "./dummy/DummyWheel";
import useWheels from "./utils/useWheels";

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
  wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [chassisBody, chassisApi] = useCompoundBody(
    () => ({
      // args: chassisBodyArgs,
      position,
      mass,
      shapes: [
        {
          args: chassisBodyArgs,
          position: [0, 0, 0],
          type: "Box",
        },
        {
          args: [width, height, front],
          position: [0, height, 0],
          type: "Box",
        },
      ],
    }),
    useRef(null)
  );

  const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody,
    wheelInfos,
    wheels,
  }));

  return (
    <group ref={vehicle}>
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
      <DummyWheel wheelRef={wheels[0]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[1]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[2]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
};

export default Car;
