import {
  FirstPersonControls,
  FlyControls,
  OrbitControls,
  PointerLockControls,
  TrackballControls,
} from "@react-three/drei";

export const Controls = () => {
  return (
    <>
      <OrbitControls />
      {/* <OrbitControls
        enableDamping
        dampingFactor={0.03}
        enableZoom
        enablePan
        // autoRotate
        // autoRotateSpeed={1}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        // maxAzimuthAngle={Math.PI / 2}
        // minAzimuthAngle={-Math.PI / 2}
      /> */}
      {/* <FlyControls
        movementSpeed={1}
        rollSpeed={Math.PI / 20}
        autoForward={false}
      /> */}
      {/* <FirstPersonControls
        lookSpeed={0.1}
        movementSpeed={1}
        lookVertical={false}
      /> */}
      {/* <PointerLockControls /> */}
      {/* <TrackballControls
        rotateSpeed={2}
        zoomSpeed={1.5}
        panSpeed={0.5}
        noRotate={false}
        noZoom={false}
        noPan={false}
        staticMoving={false}
        dynamicDampingFactor={0.05}
      /> */}
    </>
  );
};
