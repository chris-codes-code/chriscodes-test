import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MODEL_URL = '/models/character.opt.glb';
const TARGET_HEIGHT = 1.7;
const MAX_LOOK_YAW = 0.32;
const MAX_LOOK_PITCH = 0.14;

export function createCursorCompanion(canvas, { onReady, trackPointer = true } = {}) {
	let disposed = false;

	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: false,
		canvas,
		powerPreference: 'high-performance',
	});
	renderer.setClearColor(0x000000, 0);
	// Touch devices: keep pixel ratio lower — the GLB/WebGL cost dominates anyway.
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, trackPointer ? 1.25 : 1));

	const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
	const scene = new THREE.Scene();

	scene.add(new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 2.2));

	const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
	keyLight.position.set(2, 6, 8);
	scene.add(keyLight);

	let idle = null;
	const timer = new THREE.Timer();
	timer.connect(document);
	let lookYaw = 0;
	let lookPitch = 0;
	let cursorYaw = 0;
	let cursorPitch = 0;
	let lastX = null;
	let lastY = null;
	let lastMoveAt = performance.now() / 1000;
	let stillDelay = 2.6;
	let glance = null;
	let glanceStart = 0;
	let glanceHold = 0;

	function onPointerMove(event) {
		const moved = lastX === null || Math.hypot(event.clientX - lastX, event.clientY - lastY) > 3;

		lastX = event.clientX;
		lastY = event.clientY;

		const x = (event.clientX / window.innerWidth) * 2 - 1;
		const y = (event.clientY / window.innerHeight) * 2 - 1;

		cursorYaw = THREE.MathUtils.clamp(x, -1, 1) * MAX_LOOK_YAW;
		cursorPitch = THREE.MathUtils.clamp(y, -1, 1) * MAX_LOOK_PITCH;

		if (!moved) return;

		lastMoveAt = performance.now() / 1000;
		stillDelay = 2.2 + Math.random() * 1.2;
		glance = null;
	}

	function onPointerLeave() {
		cursorYaw = 0;
		cursorPitch = 0;
		lastMoveAt = performance.now() / 1000;
		glance = null;
	}

	function glanceTarget(now) {
		if (!trackPointer) return { yaw: 0, pitch: 0 };

		if (now - lastMoveAt < stillDelay) return { yaw: cursorYaw, pitch: cursorPitch };

		if (!glance) {
			glance = 'user';
			glanceStart = now;
			glanceHold = 2.8 + Math.random() * 0.7;
		}

		if (now - glanceStart > glanceHold) {
			glance = glance === 'user' ? 'cursor' : 'user';
			glanceStart = now;
			glanceHold = glance === 'user' ? 2.8 + Math.random() * 0.7 : 2.2 + Math.random() * 0.6;
		}

		if (glance === 'user') return { yaw: 0, pitch: 0 };

		return { yaw: cursorYaw, pitch: cursorPitch };
	}

	if (trackPointer) {
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerleave', onPointerLeave);
	}

	let lastWidth = 0;
	let resizeRaf = 0;

	function resize() {
		const width = Math.round(canvas.clientWidth || window.innerWidth);
		const height = Math.round(canvas.clientHeight || window.innerHeight);

		// Height-only changes (mobile URL bar) are ignored — only width needs a WebGL reset.
		if (Math.abs(width - lastWidth) < 2) return;

		lastWidth = width;
		renderer.setSize(width, height, false);
		frameCamera(camera, width, height);
	}

	const resizeObserver = new ResizeObserver(() => {
		if (resizeRaf) return;
		resizeRaf = requestAnimationFrame(() => {
			resizeRaf = 0;
			resize();
		});
	});
	resizeObserver.observe(canvas.parentElement || canvas);
	resize();

	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('/draco/');

	const loader = new GLTFLoader();
	loader.setDRACOLoader(dracoLoader);
	loader.load(
		MODEL_URL,
		(gltf) => {
			if (disposed) return;

			const model = gltf.scene;
			fitModel(model);
			scene.add(model);
			resize();

			idle = createIdle(model);
			renderer.compile(scene, camera);
			canvas.dataset.ready = 'true';
			onReady?.();
		},
		undefined,
		(error) => {
			console.error(error);
		},
	);

	let visible = true;

	function animate(timestamp) {
		if (disposed || !visible) return;

		timer.update(timestamp);
		const delta = Math.min(timer.getDelta(), 0.05);

		const glanceAt = glanceTarget(performance.now() / 1000);
		const easing = glance ? 2.3 : 5;

		lookYaw = THREE.MathUtils.damp(lookYaw, glanceAt.yaw, easing, delta);
		lookPitch = THREE.MathUtils.damp(lookPitch, glanceAt.pitch, easing, delta);
		idle?.update(timer.getElapsed(), lookYaw, lookPitch);

		renderer.render(scene, camera);
	}

	function setLoop(enabled) {
		visible = enabled;
		renderer.setAnimationLoop(enabled ? animate : null);
		if (enabled) timer.update();
	}

	const intersectionObserver = new IntersectionObserver(
		([entry]) => {
			setLoop(Boolean(entry?.isIntersecting));
		},
		{ rootMargin: '50px', threshold: 0 },
	);
	intersectionObserver.observe(canvas);

	setLoop(true);

	return {
		destroy() {
			disposed = true;
			setLoop(false);
			timer.dispose();
			intersectionObserver.disconnect();
			resizeObserver.disconnect();
			if (resizeRaf) cancelAnimationFrame(resizeRaf);
			if (trackPointer) {
				window.removeEventListener('pointermove', onPointerMove);
				window.removeEventListener('pointerleave', onPointerLeave);
			}
			scene.traverse((object) => {
				object.geometry?.dispose();

				if (!object.material) return;

				const materials = Array.isArray(object.material) ? object.material : [object.material];

				for (const material of materials) {
					material.dispose();
				}
			});

			dracoLoader.dispose();
			renderer.dispose();
		},
	};
}

function fitModel(model) {
	model.position.set(0, 0, 0);
	model.scale.setScalar(1);
	model.updateMatrixWorld(true);

	const box = new THREE.Box3().setFromObject(model);
	const size = box.getSize(new THREE.Vector3());
	const height = Math.max(size.y, 0.001);

	model.scale.setScalar(TARGET_HEIGHT / height);
	model.updateMatrixWorld(true);

	const fitted = new THREE.Box3().setFromObject(model);
	const center = fitted.getCenter(new THREE.Vector3());

	model.position.x -= center.x;
	model.position.z -= center.z;
	model.position.y -= fitted.min.y;
}

function createIdle(model) {
	const bones = {};

	model.traverse((object) => {
		if (object.isBone) bones[object.name] = object;
	});

	hangArms(bones);

	const sway = ['Hips', 'Spine', 'Spine1', 'Spine2', 'Neck', 'Head'].map((name) => {
		const bone = bones[`mixamorig${name}`];

		return { bone, rest: bone.quaternion.clone() };
	});

	const euler = new THREE.Euler();
	const extra = new THREE.Quaternion();

	return {
		update(time, lookYaw = 0, lookPitch = 0) {
			const drift = Math.sin(time * 0.22);
			const shift = Math.sin(time * 0.5);
			const breathe = Math.sin(time * 1.1);

			pose(sway[0], shift * 0.026 + drift * 0.012, lookYaw * 0.1, shift * 0.018, euler, extra);
			pose(sway[1], breathe * 0.014, lookYaw * 0.06, shift * -0.016, euler, extra);
			pose(sway[2], breathe * 0.02 + lookPitch * 0.12, lookYaw * 0.14 + drift * 0.01, shift * -0.02, euler, extra);
			pose(sway[3], breathe * 0.012 + lookPitch * 0.2, lookYaw * 0.22, shift * 0.036 + drift * 0.012, euler, extra);
			pose(sway[4], lookPitch * 0.4, lookYaw * 0.4, shift * -0.016, euler, extra);
			pose(sway[5], breathe * -0.018 + lookPitch, drift * -0.012 + lookYaw, shift * -0.02, euler, extra);
		},
	};
}

function hangArms(bones) {
	const direction = new THREE.Vector3();

	hang(bones.mixamorigLeftArm, direction.set(0.1, -0.99, 0.05));
	hang(bones.mixamorigLeftForeArm, direction.set(0.05, -0.97, 0.16));
	hang(bones.mixamorigRightArm, direction.set(-0.1, -0.99, 0.05));
	hang(bones.mixamorigRightForeArm, direction.set(-0.05, -0.97, 0.16));
}

function hang(bone, direction) {
	bone.updateWorldMatrix(true, false);

	const parentQuat = bone.parent.getWorldQuaternion(new THREE.Quaternion());
	const restWorld = bone.getWorldQuaternion(new THREE.Quaternion());
	const currentY = new THREE.Vector3(0, 1, 0).applyQuaternion(restWorld).normalize();
	const swing = new THREE.Quaternion().setFromUnitVectors(currentY, direction.normalize());
	const worldQuat = swing.multiply(restWorld);

	bone.quaternion.copy(parentQuat.invert().multiply(worldQuat));
	bone.updateMatrixWorld(true);
}

function pose(entry, x, y, z, euler, extra) {
	euler.set(x, y, z);
	extra.setFromEuler(euler);
	entry.bone.quaternion.copy(entry.rest).multiply(extra);
}

function frameCamera(camera, width, height) {
	// Character height as a fraction of the canvas — keep a little headroom for idle motion
	const fraction = 0.92;
	const fov = THREE.MathUtils.degToRad(camera.fov);
	const distance = TARGET_HEIGHT / (2 * Math.tan(fov / 2) * fraction);
	const lookY = TARGET_HEIGHT * 0.5;

	camera.clearViewOffset();
	camera.aspect = width / Math.max(height, 1);
	camera.position.set(0, lookY, distance);
	camera.lookAt(0, lookY, 0);
	camera.updateProjectionMatrix();
}
