import * as THREE from "three";

function material(color: string) {
    return new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05 });
}
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 12);

function part(parent: THREE.Group, geometry: THREE.BufferGeometry, mat: THREE.Material, size: number[], position: number[]) {
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.scale.set(size[0], size[1], size[2]);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
}

function drone() {
    const group = new THREE.Group();
    const orange = material("#f57927"), graphite = material("#27353a"), silver = material("#b1b9b6");
    part(group, boxGeometry, orange, [0.75, 0.32, 1.05], [0, 0, 0]);
    part(group, boxGeometry, graphite, [0.52, 0.18, 0.65], [0, -0.22, 0]);
    part(group, boxGeometry, silver, [0.32, 0.07, 0.32], [0, 0.2, -0.15]);
    const rotors: THREE.Group[] = [];
    for (const x of [-1, 1]) for (const z of [-1, 1]) {
        const arm = part(group, boxGeometry, graphite, [1.35, 0.12, 0.16], [x * 0.53, 0, z * 0.57]);
        arm.rotation.y = -x * z * Math.PI / 4;
        part(group, cylinderGeometry, graphite, [0.17, 0.22, 0.17], [x, 0.13, z]);
        const rotor = new THREE.Group();
        rotor.position.set(x, 0.29, z);
        part(rotor, boxGeometry, graphite, [1.15, 0.035, 0.1], [0, 0, 0]);
        part(rotor, cylinderGeometry, silver, [0.08, 0.08, 0.08], [0, 0.025, 0]);
        group.add(rotor);
        rotors.push(rotor);
        part(group, boxGeometry, graphite, [0.055, 0.45, 0.055], [x * 0.4, -0.43, z * 0.4]);
    }
    for (const x of [-0.4, 0.4]) part(group, boxGeometry, graphite, [0.07, 0.07, 1.35], [x, -0.65, 0]);
    return { group, rotors };
}

function car(color: string) {
    const group = new THREE.Group();
    const paint = material(color), glass = material("#34474f"), rubber = material("#263034");
    part(group, boxGeometry, paint, [0.7, 0.3, 1.5], [0, 0.3, 0]);
    part(group, boxGeometry, glass, [0.57, 0.27, 0.72], [0, 0.56, -0.06]);
    part(group, boxGeometry, paint, [0.58, 0.055, 0.52], [0, 0.71, -0.1]);
    for (const x of [-0.35, 0.35]) for (const z of [-0.48, 0.48]) {
        const wheel = part(group, cylinderGeometry, rubber, [0.16, 0.09, 0.16], [x, 0.2, z]);
        wheel.rotation.z = Math.PI / 2;
    }
    return group;
}

/** Deterministic illustration, independent of the research model and its metrics. */
export function createMotion() {
    const group = new THREE.Group();
    const paths = [
        [[-15, 12.8, -7], [-7, 13.5, 0], [0, 14, 7], [12, 13, 8], [16, 12.5, -5], [1, 14, -13]],
        [[14, 15, 14], [3, 15.5, 16], [-12, 15, 8], [-14, 14, -10], [0, 16, -5]],
        [[-15, 17, 14], [-5, 17.5, 6], [10, 17, -12], [16, 16.5, 0], [4, 17, 15]],
    ].map(points => new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), true, "catmullrom", 0.25));
    const drones = paths.map(() => { const d = drone(); group.add(d.group); return d; });
    const cars: { object: THREE.Group; axis: "x" | "z"; road: number; direction: number; distance: number }[] = [];
    for (const axis of ["x", "z"] as const) for (const road of [-7, 7]) for (const direction of [-1, 1]) {
        for (let i = 0; i < 2; i++) {
            const object = car(i ? "#e8e7dc" : direction === 1 ? "#e97d30" : "#6f858b");
            object.rotation.y = axis === "z" ? (direction === 1 ? 0 : Math.PI) : (direction === 1 ? Math.PI / 2 : -Math.PI / 2);
            group.add(object);
            cars.push({ object, axis, road, direction, distance: -19 + i * 19 + (road === 7 ? 4 : 0) });
        }
    }
    const position = new THREE.Vector3(), tangent = new THREE.Vector3();
    let time = 0;
    function update(delta: number) {
        time += delta;
        drones.forEach((d, i) => {
            const u = (time / (42 + i * 8) + i * 0.29) % 1;
            paths[i].getPointAt(u, position);
            paths[i].getTangentAt(u, tangent);
            d.group.position.copy(position);
            d.group.position.y += Math.sin(time * 1.7 + i) * 0.075;
            d.group.rotation.set(0.04, Math.atan2(tangent.x, tangent.z), Math.sin(time * 0.42 + i) * 0.1);
            d.rotors.forEach((rotor, j) => { rotor.rotation.y = time * 32 * (j % 2 ? 1 : -1); });
        });
        // All approaches share a signal phase; queue spacing prevents overlapping cars.
        const xGreen = time % 16 < 8;
        cars.forEach(c => {
            const allowed = c.axis === "x" ? xGreen : !xGreen;
            let step = delta * 1.8;
            if (!allowed) for (const intersection of [-7, 7]) {
                const stop = intersection - c.direction * 3.6;
                const distanceToStop = (stop - c.distance) * c.direction;
                if (distanceToStop >= 0 && distanceToStop < step) step = distanceToStop;
            }
            for (const ahead of cars) {
                if (ahead === c || ahead.axis !== c.axis || ahead.road !== c.road || ahead.direction !== c.direction) continue;
                const gap = (ahead.distance - c.distance) * c.direction;
                if (gap > 0 && gap < 2.5) step = Math.min(step, Math.max(0, gap - 2.1));
            }
            c.distance += step * c.direction;
            if (c.distance > 22) c.distance = -22;
            if (c.distance < -22) c.distance = 22;
            const lane = c.road + c.direction * 0.95;
            c.object.position.set(c.axis === "x" ? c.distance : lane, 0.05, c.axis === "z" ? c.distance : lane);
        });
    }
    update(0);
    return { group, update };
}
