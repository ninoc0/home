import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);
const geometry = new THREE.SphereGeometry(0.15, 24, 24);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff});

function addStar() {
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Sun

const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const sunNormalTexture = new THREE.TextureLoader().load('normal.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: sunTexture,
  })
);
sun.name = "sun";
scene.add(sun);
sun.position.z = -13;
sun.position.x = 5;

const raycaster = new THREE.Raycaster();
const mouse =  new THREE.Vector2();

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;

    // Check if the intersected object is the one we want
    if (intersectedObject.name === "sun") {
      window.location.href = '/home/basic.html';
    }
    if (intersectedObject.name === "mercury") {
      window.location.href = '/mercury.html';
    }
    if (intersectedObject.name === "venus") {
      window.open('https://github.com/ninoc0', '_blank');
    }
  }
}
// Mercury

const mercuryTexture = new THREE.TextureLoader().load('mercury.jpg');
const mercuryNormalTexture = new THREE.TextureLoader().load('mercurynormal.jpg');

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
    normalMap: mercuryNormalTexture,
  })
);

scene.add(mercury);

mercury.position.z = 16;
mercury.position.setX(-4);

mercury.name = "mercury";

// Venus

const venusTexture = new THREE.TextureLoader().load('venus.jpg');
const venusNormalTexture = new THREE.TextureLoader().load('mercurynormal.jpg');

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
    normalMap: venusNormalTexture,
  })
);

scene.add(venus);

venus.position.z = 28;
venus.position.setX(-4);
venus.name = "venus";


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  mercury.rotation.x += 0.05;
  mercury.rotation.y += 0.075;
  mercury.rotation.z += 0.05;

  sun.rotation.y += 0.01;
  sun.rotation.z += 0.01;

  venus.rotation.x += 0.05;
  venus.rotation.y += 0.075;
  venus.rotation.z += 0.05; 

  camera.position.z = t * -0.006;
  camera.position.x = t * -0.0004;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();
window.addEventListener('click', onMouseClick, false);
// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  //sun.rotation.x += 0.01;
  //sun.rotation.y += 0.005;
  //sun.rotation.z += 0.01;

  //moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();