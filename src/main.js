import * as THREE from 'three';
import { CreateScene } from './CreateScene';
import { cameraPosition } from 'three/src/nodes/TSL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// ----- 주제: 여러개의 캔버스 사용하기

// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

const scene1 = new CreateScene({
	renderer,
	placeHolder: '.canvas-placeholder.a',
});
scene1.set(() => {
	const light = new THREE.DirectionalLight('white', 2);
	// light.position.set(-1, 2, 3);

	scene1.camera.add(light); // 카메라에 조명을 달았다.
	// scene1.scene.add(light);
	scene1.controls = new OrbitControls(scene1.camera, scene1.elem);

	const geopetry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({ color: 'green' });
	const mesh = new THREE.Mesh(geopetry, material);

	scene1.meshes.push(mesh);
	scene1.meshes.forEach(mesh => {
		scene1.scene.add(mesh);
	});
});

const scene2 = new CreateScene({
	renderer,
	placeHolder: '.canvas-placeholder.b'
});
scene2.set(() => {
	const light = new THREE.DirectionalLight('white', 2);
	// light.position.set(-1, 2, 3);

	scene2.camera.add(light);
	// scene2.scene.add(light);
	scene2.controls = new OrbitControls(scene2.camera, scene2.elem);

	const geopetry = new THREE.BoxGeometry(0.4, 1, 0.7);
	const material = new THREE.MeshStandardMaterial({ color: 'red' });
	const mesh = new THREE.Mesh(geopetry, material);

	scene2.meshes.push(mesh);
	scene2.meshes.forEach(mesh => {
		scene2.scene.add(mesh);
	});
});

const gltfLoader = new GLTFLoader();

const scene3 = new CreateScene({
	renderer,
	placeHolder: '.canvas-placeholder.c'
});
scene3.set(() => {
	const light = new THREE.DirectionalLight('white', 2);
	// light.position.set(-1, 2, 3);

	scene3.camera.add(light);
	// scene3.scene.add(light);
	scene3.controls = new OrbitControls(scene3.camera, scene3.elem);

	gltfLoader.load(
		'./models/ilbuni.glb',
		(glb) => {
			console.log('glb', glb);
			const mesh = glb.scene.children[0];
			
			scene3.meshes.push(mesh);
			scene3.meshes.forEach(mesh => {
				scene3.scene.add(mesh);
			});
		}
	);
});

// 그리기
const clock = new THREE.Clock();

function draw() {
	const delta = clock.getDelta();

	scene1.meshes.forEach(mesh => { mesh.rotation.y += delta });
	scene2.meshes.forEach(mesh => { mesh.rotation.y += delta });
	scene3.meshes.forEach(mesh => { mesh.rotation.y += delta });

	scene1.render();
	scene2.render();
	scene3.render();
	renderer.setAnimationLoop(draw);
}

function setSize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// 이벤트
window.addEventListener('resize', setSize);

draw();
