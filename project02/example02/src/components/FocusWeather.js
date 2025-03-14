import { useBounds } from '@react-three/drei'
import { useEffect, useRef } from 'react';

export function FocusWeather({children}) {
  const bounds = useBounds();
  const ref = useRef(null);

  // useEffect(() => {
  //   console.log(bounds.getSize());  // 현재 바운딩 박스의 크기를 반환
  //   // bounds.clip();  // <Bounds clip></Bounds> 과 동일한 기능
  //   // bounds.fit(); // <Bounds fit></Bounds> 과 동일한 기능
  //   // bounds.refresh(); // 바운딩 박스가 최신으로 유지
  //   // bounds.refresh(ref.current).clip().fit();
  // }, []);

  const onClick = (e) => {
    console.log('e.object : ', e.object);
    e.stopPropagation();
    bounds.refresh(e.object).clip().fit();
  }

  const onPointerMissed = (e) => {
    if(e.button === 0) {  // 좌클릭(0) 시에만 동작
      bounds.refresh().fit();
    }
  }

  return (
    <group onClick={onClick} onPointerMissed={onPointerMissed}>
      {children}
    </group>
  )
}