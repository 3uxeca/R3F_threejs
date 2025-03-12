import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

// 개별 인스턴스 메쉬의 회전 및 위치값 계산을 위한 임시 3D 오브젝트
const object3D = new THREE.Object3D();
const color = new THREE.Color(); // 각 mesh 개별 color 저장을 위한 변수
const boxCount = 1000000;
const boxSize = [0.2, 0.2, 0.2];
const colorPalettes = ["#00a0b0", "#6a4a3c", "#cc333f", "#eb6841", "#edc951"];

export const InstancedBoxes = () => {
  const ref = useRef(null);
  //  색상값을 컬러 팔레트 중 랜덤으로 선택해서 Float32Array 형태로 저장
  const colors = useMemo(
    () =>
      new Float32Array(
        Array.from({ length: boxCount }, () =>
          color.set(colorPalettes[Math.floor(Math.random() * 5)]).toArray()
        ).flat()
      ),
    []
  );

  useEffect(() => {
    let i = 0;
    const spaceWidth = Math.round(Math.pow(boxCount, 1 / 3));
    const halfOfSpaceWidth = spaceWidth / 2;
    
    for(let x = 0; x < spaceWidth; x += 1) {
      for(let y = 0; y < spaceWidth; y += 1) {
        for(let z = 0; z < spaceWidth; z += 1) {
          const id = i++;
          object3D.rotation.set(Math.random(), Math.random(), Math.random());
          object3D.position.set(
            halfOfSpaceWidth - x + Math.random(),
            halfOfSpaceWidth - y + Math.random(),
            halfOfSpaceWidth - z + Math.random(),
          );
          object3D.updateMatrix();
          ref.current.setMatrixAt(id, object3D.matrix);
        }
      }
    }
    ref.current.instanceMatrix.needsUpdate = true; // 다시 렌더 하라고 알려주는 코드
  }, []);

  return (
    <instancedMesh ref={ref} args={[null, null, boxCount]}>
      <boxGeometry args={boxSize}>
        <instancedBufferAttribute
          attach={'attributes-color'}
          args={[colors, 3]}
        />
      </boxGeometry>
      <meshLambertMaterial vertexColors />
    </instancedMesh>
  )
}