import {
  Bloom,
  BrightnessContrast,
  DotScreen,
  EffectComposer,
  Glitch,
  Grid,
  HueSaturation,
  Pixelation,
  Sepia,
} from "@react-three/postprocessing";
export const PostProcessor = () => {
  return (
    <EffectComposer disableNormalPass>
      {/* <Bloom
        intensity={0.5}
        mipmapBlur
        luminanceThreshold={1}
        luminanceSmoothing={0.02}
      /> */}
      {/* <BrightnessContrast brigtness={-0.2} contrast={-0.8} /> */}
      {/* <DotScreen angle={Math.PI / 6} scale={1} /> */}
      {/* <Glitch
        delay={[1.5, 3.5]} // 지지직 거리는 지연시간 최소 최대
        duration={[0.5, 1.0]} // 지지직 거리는 시간의 최소 최대
        strength={[0.01, 1.0]} // 지지직 거리는 효과의 세기 최소 최대
        ratio={0.5} // 1에 가까울수록 약한 지지직
      /> */}
      {/* <Grid scale={0.1} lineWidth={0.1} /> */}
      {/* <HueSaturation hue={Math.PI / 2} saturation={0.4} /> */}
      {/* <Pixelation granularity={1} /> */}
      {/* <Sepia intensity={0.5} /> */}
    </EffectComposer>
  );
};
