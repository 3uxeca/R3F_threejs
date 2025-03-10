import { useRecoilValue } from "recoil"
import { IsEnteredAtom } from "../stores"
import { useEffect, useRef } from "react";
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { Loader } from "./Loader";
import gsap from 'gsap';
import { useThree } from "@react-three/fiber";

export const Dancer = () => {
  const three = useThree();
  const isEntered = useRecoilValue(IsEnteredAtom);
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF('/models/dancer.glb');
  const { actions } = useAnimations(animations, dancerRef);
  const scroll = useScroll();

  useEffect(() => {
    if(!isEntered) return;
    actions['wave'].play();
  }, [actions, isEntered]);

  useEffect(() => {
    // gsap
    if(!isEntered) return;
    if(!dancerRef.current) return;
    // 카메라 이동동
    gsap.fromTo(
      three.camera.position, 
      {
        x: -5,
        y: 5,
        z: 5,
      },
      {
        duration: 2.5,
        x: 0,
        y: 6,
        z: 12,
      }
    )
    // 카메라 회전
    gsap.fromTo(
      three.camera.rotation,
      { z: Math.PI },
      {
        duration: 2.5,
        z: 0,
      }
    )
  }, [isEntered, three.camera.position, three.camera.rotation]);

  if(isEntered) {
    return (
      <>
      <ambientLight intensity={2} />
      <primitive ref={dancerRef} object={scene} scale={0.05} />
      </>
    )
  }
  return <Loader isCompleted />
}