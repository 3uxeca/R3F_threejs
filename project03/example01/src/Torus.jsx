import { useTrimesh } from "@react-three/cannon";
import { useEffect, useMemo } from "react";
import { TorusGeometry } from "three";

export function Torus(props) {
  const geometry = useMemo(() => new TorusGeometry(0.5, 0.2, 16, 100), []);
  const [ref, api] = useTrimesh(() => ({
    args: [geometry.attributes.position.array, geometry.index.array],
    mass: 1,
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  useEffect(() => {
    console.log(geometry);
  }, [ref]);

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      onPointerDown={() => api.velocity.set(0, 2, 1)}
    >
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}
