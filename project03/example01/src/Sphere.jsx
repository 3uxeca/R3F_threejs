import { useSphere } from "@react-three/cannon";
import { useEffect, useState } from "react";

export function Sphere(props) {
  const [meshRef, api] = useSphere(() => ({ args: [0.5], mass: 1, ...props }));

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
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
