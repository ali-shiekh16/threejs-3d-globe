import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  PointLight,
  MeshStandardMaterial,
  TextureLoader,
  SphereGeometry,
  AmbientLight,
  BufferGeometry,
  PointsMaterial,
  Points,
  Float32BufferAttribute,
} from 'three';

import earthNormalMap from '/images/earth-normal-map.webp';
import earthMap from '/images/earth.jpg';

// Scene
const scene = new Scene();

const canvas = document.querySelector('#canvas');
const { offsetWidth: canvasWidth, offsetHeight: canvasHeight } = canvas;
// Camera
const camera = new PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
camera.position.setZ(10);

// Renderer
const renderer = new WebGLRenderer({
  antialias: true,
  canvas,
});
const configRenderer = () => {
  renderer.setSize(canvasWidth, canvasHeight);
  renderer.setPixelRatio(canvasWidth / canvasHeight);
};
configRenderer();
window.addEventListener('resize', configRenderer);

// * Sphere
// Geometry
const geometry = new SphereGeometry(3, 20, 20);
const material = new MeshStandardMaterial({
  normalMap: new TextureLoader().load(earthNormalMap),
  map: new TextureLoader().load(earthMap),
});

const sphere = new Mesh(geometry, material);
scene.add(sphere);

// * Stars
const starGeometry = new BufferGeometry();
const starMaterial = new PointsMaterial({ color: 0xffffff });

const starVertices = [];
for (let i = 0; i <= 500; i++) {
  const x = (Math.random() - 0.5) * 1000;
  const y = (Math.random() - 0.5) * 1000;
  const z = -Math.random() * 2000;

  starVertices.push(x, y, z);
}

starGeometry.setAttribute(
  'position',
  new Float32BufferAttribute(starVertices, 3)
);

const stars = new Points(starGeometry, starMaterial);
scene.add(stars);

// * Lights
const pointLight = new PointLight(0xffffff, 1.5);
pointLight.position.set(3.3, 3.8, 3.6);

const ambientLight = new AmbientLight(0xf2f2f2, 0.1);
scene.add(pointLight, ambientLight);

// Animate
function animate() {
  requestAnimationFrame(animate);
  sphere.rotateX(0.005);
  sphere.rotateY(0.005);
  renderer.render(scene, camera);
}

animate();
