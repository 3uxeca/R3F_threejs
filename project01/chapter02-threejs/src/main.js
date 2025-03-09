import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // renderer에서 shadowMap을 사용
// renderer.shadowMap.type = THREE.BasicShadowMap; // 품질이 낮고 성능이 높은 shadow
// renderer.shadowMap.type = THREE.PCFShadowMap; // 품질/성능이 중간인 shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 품질 높음 / 성능이 낮은 shadow
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60, // fov(시야각)
  window.innerWidth / window.innerHeight, // 카메라가 담을 가로/세로 비율
  0.1, // 카메라가 피사체를 담을 수 있는 범위의 하한
  100 // 카메라가 피사체를 담을 수 있는 범위의 상한
);

camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xbbbbbb,
  // side: THREE.DoubleSide,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // -90도
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

//////////////////////////////////////////////////////////////////
// Geometry 파트 실습
// const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // 직사광선
// directionalLight.castShadow = true;
// directionalLight.position.set(3, 4, 5);
// directionalLight.lookAt(0, 0, 0);
// scene.add(directionalLight);

// const geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = 0.5;
// mesh.castShadow = true;
// scene.add(mesh);

// const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
// const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 })
// const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
// capsuleMesh.position.set(3, 1.75, 0);
// capsuleMesh.receiveShadow = true;
// capsuleMesh.castShadow = true;
// scene.add(capsuleMesh);

// const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
// const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
// cylinderMesh.position.set(-3, 1, 0);
// cylinderMesh.castShadow = true;
// cylinderMesh.receiveShadow = true;
// scene.add(cylinderMesh);

// const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
// const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
// const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
// torusMesh.position.set(0, 0.5, 1);
// torusMesh.castShadow = true;
// torusMesh.receiveShadow = true;
// scene.add(torusMesh);

// const starShape = new THREE.Shape();
// starShape.moveTo(0, 1);
// starShape.lineTo(0.2, 0.2);
// starShape.lineTo(1, 0.2);
// starShape.lineTo(0.4, -0.1);
// starShape.lineTo(0.6, -1);
// starShape.lineTo(0, -0.5);
// starShape.lineTo(-0.6, -1);
// starShape.lineTo(-0.4, -0.1);
// starShape.lineTo(-1, 0.2);
// starShape.lineTo(-0.2, 0.2);
// const shapeGeometry = new THREE.ShapeGeometry(starShape);
// const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
// const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
// shapeMesh.position.set(0, 1, 2);
// scene.add(shapeMesh);

// // 3d로 만들기
// const extrudeSettings = {
//   steps: 1, // 값이 클수록 부드럽게
//   depth: 0.1, // 입체로 만들 때의 두께
//   bevelEnabled: true, // 모서리 둥글게 할지 여부
//   bevelThickness: 0.1, // 모서리 두께
//   bevelSize: 0.3, // 모서리 크기
//   bevelSegments: 100, // 모서리 매끄럽게
// };

// const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
// const extrudeMaterial = new THREE.MeshStandardMaterial({ color:  0x0ddaaf });
// const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
// extrudeMesh.position.set(2, 1.3, 2);
// extrudeMesh.castShadow = true;
// extrudeMesh.receiveShadow = true;
// scene.add(extrudeMesh);

// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x98daaf });
// const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphereMesh.position.set(0, 1, -3);
// // scene.add(sphereMesh);

// const numPoints = 1000;
// const positions = new Float32Array(numPoints * 3); // 점 하나당 x,y,z 3개의 좌표가 들어가야해서 3배

// for (let i=0; i<numPoints; i++) {
//   const x = (Math.random() - 0.5) * 1;
//   const y = (Math.random() - 0.5) * 1;
//   const z = (Math.random() - 0.5) * 1;

//   positions[i*3] = x;
//   positions[i*3 + 1] = y;
//   positions[i*3 + 2] = z;
// }

// const bufferGeometry = new THREE.BufferGeometry(); // GPU 사용을 효율적으로 하는 Geometry
// bufferGeometry.setAttribute(
//   'position',
//   new THREE.BufferAttribute(positions, 3)
// );

// const pointsMaterial = new THREE.PointsMaterial({ color: 0xffff00, size: 0.05, });
// const point = new THREE.Points(sphereGeometry, pointsMaterial);
// point.position.set(0, 0, -5);
// scene.add(point);

//////////////////////////////////////////////////////////////////
// Material 파트 실습
// const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
// const frontSideMaterial = new THREE.MeshStandardMaterial({
//   color: 0x00ffff,
//   side: THREE.FrontSide,
// });
// const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
// frontSideMesh.position.z = 4;
// frontSideMesh.position.y = 0.5;
// frontSideMesh.castShadow = true;
// frontSideMesh.receiveShadow = true;
// scene.add(frontSideMesh);

// const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
// const backSideMaterial = new THREE.MeshStandardMaterial({
//   color: 0x00ff00,
//   side: THREE.BackSide,
// });
// const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
// backSideMesh.position.set(2, 0.5, 4);
// backSideMesh.position.y = 0.51;
// // backSideMesh.castShadow = true;
// backSideMesh.receiveShadow = true;
// scene.add(backSideMesh);

// const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
// const doubleSideMaterial = new THREE.MeshStandardMaterial({
//   color: 0x00ff00,
//   side: THREE.DoubleSide,
// });
// const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
// doubleSideMesh.position.set(4, 0.5, 4);
// doubleSideMesh.position.y = 0.51;
// doubleSideMesh.receiveShadow = true;
// // doubleSideMesh.castShadow = true;
// scene.add(doubleSideMesh);

// // MeshStandardMaterial
// const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
// const torusKnotStandardMaterial = new THREE.MeshStandardMaterial({
//   color: 0xff0000,
// });
// torusKnotStandardMaterial.roughness = 0.5;
// torusKnotStandardMaterial.metalness = 1;
// const torusKnotStandardMesh = new THREE.Mesh(
//   torusKnotGeometry,
//   torusKnotStandardMaterial
// );
// torusKnotStandardMesh.castShadow = true;
// torusKnotStandardMesh.receiveShadow = true;
// torusKnotStandardMesh.position.set(-4, 1, 0);
// scene.add(torusKnotStandardMesh);

// // MeshLambertMaterial
// const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
//   color: 0xff0000,
// });
// torusKnotLambertMaterial.emissive = new THREE.Color(0x0000ff);
// torusKnotLambertMaterial.emissiveIntensity = 0.2;
// const torusKnotLambertMesh = new THREE.Mesh(
//   torusKnotGeometry,
//   torusKnotLambertMaterial
// );
// torusKnotLambertMesh.castShadow = true;
// torusKnotLambertMesh.receiveShadow = true;
// torusKnotLambertMesh.position.set(-2, 1, 0);
// scene.add(torusKnotLambertMesh);

// // MeshPhongMaterial
// const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
// torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00); // 자체발광(빛이 닫지 않는 부분의 색상)
// torusKnotPhongMaterial.emissiveIntensity = 0.2; // 자체발광 세기
// torusKnotPhongMaterial.specular = new THREE.Color(0x0000ff); // 빛이 직접 닿아 반사되는 부분의 색상
// torusKnotPhongMaterial.shininess = 100; // specular의 강도
// const torusKnotPhongMesh = new THREE.Mesh(
//   torusKnotGeometry,
//   torusKnotPhongMaterial
// );
// torusKnotPhongMesh.castShadow = true;
// torusKnotPhongMesh.receiveShadow = true;
// torusKnotPhongMesh.position.set(0, 1, 0);
// scene.add(torusKnotPhongMesh);

// // MeshBasicMaterial
// const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const torusKnotBasicMesh = new THREE.Mesh(
//   torusKnotGeometry,
//   torusKnotBasicMaterial
// );
// torusKnotBasicMesh.castShadow = true;
// torusKnotBasicMesh.receiveShadow = true;
// torusKnotBasicMesh.position.set(2, 1, 0);
// scene.add(torusKnotBasicMesh);

// // MeshDepthMaterial
// const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({ color: 0xffffff }); // 카메라와의 거리에 따라 색이 달라짐
// torusKnotDepthMaterial.opacity = 0.5; // 투명도
// const torusKnotDepthMesh = new THREE.Mesh(
//   torusKnotGeometry,
//   torusKnotDepthMaterial
// );
// torusKnotDepthMesh.castShadow = true;
// torusKnotDepthMesh.receiveShadow = true;
// torusKnotDepthMesh.position.set(4, 1, 0);
// scene.add(torusKnotDepthMesh);

// 이미지파일을 texture로 불러오도록 하는 textureLoader
// const textureLoader = new THREE.TextureLoader();
// load 함수와 콜백 이용
// textureLoader.load("/threejs.webp", (texture) => {
//   console.log(texture);
//   const texturetorusKnotGeometry = new THREE.torusKnotGeometry(1, 1, 1);
//   const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
//   const textureMesh = new THREE.Mesh(texturetorusKnotGeometry, textureMaterial);
//   textureMesh.castShadow = true;
//   textureMesh.receiveShadow = true;
//   textureMesh.position.z = 2;
//   scene.add(textureMesh);
// });

// loadAsync 함수 이용
// const texture = await textureLoader.loadAsync("/threejs.webp");
// const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
// const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
// textureMesh.castShadow = true;
// textureMesh.receiveShadow = true;
// textureMesh.position.set(0, 0.5, 2);
// scene.add(textureMesh);

//////////////////////////////////////////////////////////////////
// Light 실습
// const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
// boxMesh.castShadow = true;
// boxMesh.receiveShadow = true;
// boxMesh.position.y = 0.5;
// scene.add(boxMesh);

// // const ambientLight = new THREE.AmbientLight(0xffffff, 5);
// // scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
// scene.add(directionalLight);
// directionalLight.castShadow = true;
// directionalLight.position.set(3, 4, 5);
// directionalLight.lookAt(0, 0, 0);
// scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   1
// );
// scene.add(directionalLightHelper);

// const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5);
// hemisphereLight.position.set(0, 1, 0);
// hemisphereLight.lookAt(0, 0, 0);
// scene.add(hemisphereLight);

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
//   hemisphereLight,
//   1
// );
// scene.add(hemisphereLightHelper);

// const pointLight = new THREE.PointLight(0xffffff, 5, 5, 4);
// pointLight.castShadow = true;
// pointLight.position.set(1, 1, 1);
// scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

// const rectareaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2);
// rectareaLight.position.set(0, 1, 2);
// scene.add(rectareaLight);

// SpotLight는 lootAt을 못쓰기 때문에 targetObject가 필요
// const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4, 1, 1);
// spotLight.castShadow = true;
// spotLight.position.set(0, 3, 0);
// scene.add(spotLight);

// const targetObject = new THREE.Object3D();
// scene.add(targetObject);
// spotLight.target = targetObject;
// spotLight.target.position.set(1, 0, 2);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);\

/////////////////////////////////////////////
// shadow 실습
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
scene.add(boxMesh);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
scene.add(directionalLight);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;

directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1
);
scene.add(directionalLightHelper);

// controls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

// 화면 사이즈가 변경될 때
window.addEventListener("resize", () => {
  // 카메라의 가로세로 비율을 바뀐 비율로 재설정
  camera.aspect = window.innerWidth / window.innerHeight;

  // 위에서 바뀐 속성 정보 적용
  camera.updateProjectionMatrix();

  // renderer에도 바뀐 가로 세로 사이즈 적용
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 바뀐 상태로 리랜더
  renderer.render(scene, camera);
});

const render = () => {
  renderer.render(scene, camera);

  // Material 실습
  // torusKnotStandardMesh.rotation.y += 0.01;
  // torusKnotLambertMesh.rotation.y += 0.01;
  // torusKnotPhongMesh.rotation.y += 0.01;
  // torusKnotDepthMesh.rotation.y += 0.01;
  // torusKnotBasicMesh.rotation.y += 0.01;
  // textureMesh.rotation.y += 0.01;

  requestAnimationFrame(render);
};

render();
