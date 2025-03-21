import { useCylinder } from "@react-three/cannon";
import { useEffect, useState } from "react";

export function Cylinder(props) {
  const [meshRef, api] = useCylinder(() => ({
    args: [0.5, 0.5, 1, 8],
    mass: 1,
    ...props,
  }));

  const [hovered, setHover] = useState(false);

  useEffect(() => {
    console.log(meshRef);
    console.log("api", api);
  }, [meshRef, api]);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerDown={() => api.velocity.set(0, 5, 0)}
    >
      <cylinderGeometry args={[0.5, 0.5, 1, 8]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
