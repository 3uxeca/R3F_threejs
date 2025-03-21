import { useConvexPolyhedron } from "@react-three/cannon";
import { useEffect, useMemo } from "react";
import { IcosahedronGeometry } from "three";
import CannonUtils from "./utils/CannonUtils";

export function Icosahedron(props) {
  const geometry = useMemo(() => new IcosahedronGeometry(0.5, 0), []);

  const args = useMemo(() => CannonUtils.toConvexPolyhedronProps(geometry), []);
  const [ref, api] = useConvexPolyhedron(() => ({
    args,
    mass: 1,
    ...props,
  }));

  useEffect(() => {
    console.log("geo", geometry);
    console.log("args", args);
  }, [ref]);
  return (
    <mesh
      ref={ref}
      geometry={geometry}
      onPointerDown={() => api.velocity.set(0, 5, 2)}
    >
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}
