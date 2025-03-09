import { useBox, useSphere } from "@react-three/cannon";
import {
  Box,
  Circle,
  Cone,
  Cylinder,
  Plane,
  Sphere,
  Torus,
  TorusKnot,
} from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export const Meshes = () => {
  const [planeRef] = useBox(() => ({
    args: [50, 1, 50],
    type: "Static",
    mass: 1,
    position: [0, 0, 0],
    material: {
      restitution: 1, // 탄성력
      friction: 0.5, // 마찰력
    },
    onCollide: () => {
      // 충돌 시 처리
      console.log("바닥에 충돌했다!");
    },
  }));

  // api = 인위적으로 mesh에 영향을 주는 메소드 applyForce : 지속적인 힘, applyImpulse : 한번만 힘
  const [boxRef, api] = useBox(() => ({
    args: [1, 1, 1],
    mass: 1,
    position: [-1, 2, 0],
    material: {
      restitution: 0.4,
      friction: 0.2,
    },
  }));

  const [sphereRef1, sphereApi] = useSphere(() => ({
    mass: 5,
    position: [0.5, 8, 0],
    material: {
      restitution: 0.4,
      friction: 0.1,
    },
  }));

  const [sphereRef2] = useSphere(() => ({
    mass: 0.2,
    position: [1, 5, 0],
    material: {
      restitution: 0.2,
      friction: 0.1,
    },
  }));

  useEffect(() => {
    api.applyForce([555, 50, 0], [1, 0, 0]); // 힘이 진행하는 방향, 전체 좌표에서 진행방향으로 영향을 줌
    sphereApi.applyLocalForce([-2000, 0, 0], [1, 0, 0]); // 힘을 가하는 방향, 좌표 위치가 mesh 위치 기준으로 영향을 줌
  }, [api, sphereApi]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      api.applyLocalImpulse([0, 20, 0], [1, 0, 0]);
      sphereApi.applyImpulse([200, 10, 0], [0, 0, 0]);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [api, sphereApi]);
  return (
    <>
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh> */}
      {/* drei가 기본 제공하는 Mesh 사용 시 자동으로 bufferGeometry로 구현되기 때문에 성능면에서도 더 좋음! */}
      {/* <Plane args={[40, 40]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Plane> */}
      {/* <Box args={[1, 1, 1]} castShadow position-y={0.5}>
        <meshStandardMaterial color={0xff0000} />
      </Box>
      <Sphere args={[1]} position={[0, 1, 3]} material-color={0xffff00} />
      <Circle
        args={[1]}
        position={[0, 1, -3]}
        material-color={"violet"}
        material-side={THREE.DoubleSide}
      />
      <Cone args={[1, 2]} position={[3, 1, 3]} material-color={"brown"} />
      <Cylinder
        args={[2, 1, 2]}
        position={[3, 1, -3]}
        material-color={"pink"}
      />
      <Torus
        args={[1, 0.2]}
        position={[-3, 1.2, -3]}
        material-color={"hotpink"}
      /> */}

      {/* <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[3, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={0xffff00}
          roughness={0.2}
          metalness={0.5}
          emissive={0xffff00}
          emissiveIntensity={2}
        />
      </TorusKnot> */}
      {/* <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[-7, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial
          color={0x0abff0}
          emissive={0xff0000}
          emissiveIntensity={0.5}
        />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[-11, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshPhongMaterial
          color={0xff0000}
          emissive={0x00ff00}
          emissiveIntensity={0.5}
          specular={0x0000ff}
          shininess={100}
        />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[-15, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshDepthMaterial opacity={0.5} />
      </TorusKnot> */}

      {/* Cannon */}
      {/* Plane 대신 Box를 사용한 이유 : 물리엔진 이용 시 두께가 없는 mesh를 쓰면 물리엔진 비정상 작동이 발생할 수 있기 때문에! */}
      <Box ref={planeRef} args={[50, 1, 50]}>
        <meshStandardMaterial
          color={0xfefefe}
          roughness={0.3}
          metalness={0.8}
        />
      </Box>
      <Box ref={boxRef} args={[1, 1, 1]}>
        <meshStandardMaterial
          color={0xff0000}
          roughness={0.3}
          metalness={0.8}
        />
      </Box>
      <Sphere ref={sphereRef1}>
        <meshStandardMaterial
          color={0x9000ff}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
      <Sphere ref={sphereRef2}>
        <meshStandardMaterial
          color={0xff00ff}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
    </>
  );
};
