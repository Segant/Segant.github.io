import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.128.0-iMoHyZSGHEjRAgeu5uDw/mode=imports,min/optimized/three.js';
// Find the latest version by visiting https://cdn.skypack.dev/three.

function main() {
	const canvas = document.querySelector('#canvas');
	const canvasWidth = canvas.width = window.innerWidth;
	const canvasHeight = canvas.height = window.innerHeight;

	// renderer
	const renderer = new THREE.WebGLRenderer({ canvas });

	// scene
	const scene = new THREE.Scene();

	// light
	{
		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-2, 5, 10);
		scene.add(light);
	}

	//camera
	const fov = 75;
	const aspect = canvasWidth / canvasHeight;  // значение для canvas по умолчанию
	const near = 0.1;
	const far = 5;

	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 2;

	// geometry
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;

	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	// material
	const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

	function makeInstance(geometry, color, x) {
		const material = new THREE.MeshPhongMaterial({color});
	   
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
	   
		cube.position.x = x;
	   
		return cube;
	}

	// combine to shape 
	const cube = new THREE.Mesh(geometry, material);

	// scene.add(cube);
	const cubes = [
		makeInstance(geometry, 0xaaffff,  0),
		makeInstance(geometry, 0xaa8844,  0),
		makeInstance(geometry, 0xffffff,  0),
		makeInstance(geometry, 0xaa8844,  0),
		makeInstance(geometry, 0xffffff,  0),
		makeInstance(geometry, 0xaa8844,  0),
		makeInstance(geometry, 0xaaffff,  0),
	];


	// renderer.render(scene, camera);

	function render(time) {
		time *= 0.001;  // конвертировать время в секунды

		cubes.forEach((cube, ndx) => {
			const speed = 1 + (ndx/ 2) * .1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;
		});

		renderer.render(scene, camera);

		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}

main();