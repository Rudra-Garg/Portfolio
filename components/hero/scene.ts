import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createCity, disposeScene } from "./city";
import { createMotion } from "./motion";

export type CityView = "isometric" | "overhead";

export function mountCity(host: HTMLElement, onFailure: () => void) {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-32, 32, 26, -26, 0.1, 180);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    // Let the shared page background show through, including during theme transitions.
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(0xffffff, 0x66747b, 2.2);
    const sun = new THREE.DirectionalLight(0xfff7e8, 3.1);
    sun.position.set(-24, 46, 18);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -36, right: 36, top: 36, bottom: -36, near: 1, far: 100 });
    sun.shadow.normalBias = 0.04;
    sun.shadow.bias = -0.00015;
    scene.add(ambient, sun, createCity());
    const motion = createMotion();
    scene.add(motion.group);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 3, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = window.matchMedia("(pointer: fine)").matches;
    controls.minPolarAngle = 0.01;
    controls.maxPolarAngle = Math.PI * 0.43;
    controls.rotateSpeed = 0.5;
    renderer.domElement.style.touchAction = "pan-y";

    let paused = false, visible = true, disposed = false, failed = false;
    let frame = 0, last = 0;
    let transition: { from: THREE.Vector3; to: THREE.Vector3; elapsed: number } | null = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const iso = new THREE.Vector3(42, 39, 42);
    const overhead = new THREE.Vector3(0, 70, 0.01);
    camera.position.copy(iso);
    controls.update();

    function requestFrame() {
        if (!frame && !disposed && !failed && visible && !document.hidden) frame = requestAnimationFrame(tick);
    }
    function tick(now: number) {
        frame = 0;
        if (disposed || failed || !visible || document.hidden) { last = 0; return; }
        const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
        last = now;
        if (!paused) motion.update(delta);
        if (transition) {
            transition.elapsed += delta;
            const t = Math.min(transition.elapsed / 1.1, 1);
            const ease = t * t * (3 - 2 * t);
            camera.position.lerpVectors(transition.from, transition.to, ease);
            if (t === 1) transition = null;
        }
        const changed = controls.update();
        renderer.render(scene, camera);
        if (!paused || transition || changed) requestFrame();
        else last = 0;
    }
    function stopFrame() { cancelAnimationFrame(frame); frame = 0; last = 0; }
    function handleVisibility() {
        if (document.hidden) stopFrame(); else requestFrame();
    }
    function onControlStart() { transition = null; requestFrame(); }
    function resize() {
        const width = Math.max(host.clientWidth, 1), height = Math.max(host.clientHeight, 1);
        const aspect = width / height;
        const span = Math.max(48, 62 / aspect);
        camera.left = -span * aspect / 2;
        camera.right = span * aspect / 2;
        camera.top = span / 2;
        camera.bottom = -span / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        requestFrame();
    }
    function loseContext(event: Event) {
        event.preventDefault();
        failed = true;
        stopFrame();
        onFailure();
    }
    controls.addEventListener("start", onControlStart);
    controls.addEventListener("change", requestFrame);
    document.addEventListener("visibilitychange", handleVisibility);
    renderer.domElement.addEventListener("webglcontextlost", loseContext);
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const intersection = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (visible) requestFrame(); else stopFrame();
    });
    intersection.observe(host);
    resize();

    return {
        setTheme(dark: boolean) {
            ambient.intensity = dark ? 1.8 : 2.2;
            requestFrame();
        },
        setPaused(value: boolean) { paused = value; requestFrame(); },
        setView(view: CityView) {
            const target = view === "overhead" ? overhead : iso;
            if (reducedMotion.matches) {
                camera.position.copy(target);
                transition = null;
            } else transition = { from: camera.position.clone(), to: target.clone(), elapsed: 0 };
            requestFrame();
        },
        rotate() {
            transition = null;
            const offset = camera.position.clone().sub(controls.target);
            // Leave the overhead singularity before orbiting with the button.
            if (Math.hypot(offset.x, offset.z) < 1) offset.copy(iso).sub(controls.target);
            offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 6);
            camera.position.copy(controls.target).add(offset);
            requestFrame();
        },
        dispose() {
            disposed = true;
            stopFrame();
            observer.disconnect();
            intersection.disconnect();
            document.removeEventListener("visibilitychange", handleVisibility);
            renderer.domElement.removeEventListener("webglcontextlost", loseContext);
            controls.removeEventListener("start", onControlStart);
            controls.removeEventListener("change", requestFrame);
            controls.dispose();
            disposeScene(scene);
            sun.shadow.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        },
    };
}
