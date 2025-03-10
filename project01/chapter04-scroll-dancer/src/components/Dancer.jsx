import { useRecoilValue } from "recoil"
import { IsEnteredAtom } from "../stores"
import { useEffect, useRef } from "react";
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { Loader } from "./Loader";

export const Dancer = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF('/models/dancer.glb');
  const { actions } = useAnimations(animations, dancerRef);
  const scroll = useScroll();

  useEffect(() => {
    if(!isEntered) return;
    actions['wave'].play();
  }, [actions, isEntered]);

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