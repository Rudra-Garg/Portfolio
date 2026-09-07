import * as THREE from "three";

type Block = { position: [number, number, number]; size: [number, number, number]; rotation?: number };

/** Repeated architectural details share geometry and material in instanced batches. */
export function createCity() {
    const city = new THREE.Group();
    const batches = new Map<string, Block[]>();
    const box = (color: string, x: number, y: number, z: number, w: number, h: number, d: number, rotation = 0) => {
        const list = batches.get(color) ?? [];
        list.push({ position: [x, y, z], size: [w, h, d], rotation });
        batches.set(color, list);
    };
    const asphalt = "#42494c", concrete = "#b9bebc", white = "#e4e5df", window = "#56666b";
    box("#858e8f", 0, -0.48, 0, 43, 0.7, 43);
    box(asphalt, 0, -0.06, 0, 43, 0.18, 43);

    // Nine blocks, separated by two intersecting avenues in each direction.
    const centers = [-14, 0, 14];
    centers.forEach(x => centers.forEach(z => {
        box(concrete, x, 0.09, z, 10, 0.22, 10);
        box("#d0d3ce", x, 0.21, z, 9.55, 0.08, 9.55);
    }));
    // Lane markings stay out of intersections; crosswalks sit at each approach.
    for (const road of [-7, 7]) {
        for (let p = -20; p <= 20; p += 2) {
            if (Math.abs(p - 7) > 3 && Math.abs(p + 7) > 3) {
                box(white, road, 0.045, p, 0.075, 0.015, 0.9);
                box(white, p, 0.045, road, 0.9, 0.015, 0.075);
            }
        }
        for (const crossing of [-7, 7]) {
            for (let stripe = -1.65; stripe <= 1.7; stripe += 0.48) {
                for (const sign of [-1, 1]) {
                    box(white, road + stripe, 0.05, crossing + sign * 2.8, 0.26, 0.02, 0.8);
                    box(white, crossing + sign * 2.8, 0.05, road + stripe, 0.8, 0.02, 0.26);
                }
            }
        }
    }

    function building(x: number, z: number, w: number, d: number, h: number, shade: string) {
        box(shade, x, h / 2 + 0.3, z, w, h, d);
        // Plinth, roof slab, parapets, rooftop access and air-conditioning units.
        box("#909b9d", x, 0.43, z, w + 0.2, 0.32, d + 0.2);
        box("#d8dbd6", x, h + 0.35, z, w + 0.12, 0.18, d + 0.12);
        box("#a4aeae", x, h + 0.58, z - d / 2, w, 0.45, 0.12);
        box("#a4aeae", x, h + 0.58, z + d / 2, w, 0.45, 0.12);
        box("#a4aeae", x - w / 2, h + 0.58, z, 0.12, 0.45, d);
        box("#a4aeae", x + w / 2, h + 0.58, z, 0.12, 0.45, d);
        box("#b5bdbc", x - w * 0.2, h + 0.8, z - d * 0.18, w * 0.35, 0.85, d * 0.28);
        for (const dz of [-0.55, 0.55]) {
            box("#778487", x + w * 0.22, h + 0.6, z + dz, 0.7, 0.3, 0.7);
            for (let j = -2; j <= 2; j++) box("#505d61", x + w * 0.22 + j * 0.1, h + 0.76, z + dz, 0.04, 0.02, 0.55);
        }
        // Windows on all four faces, recessed-looking frames through contrasting strips.
        for (let y = 1.3; y < h - 0.3; y += 1.15) {
            for (let dx = -w / 2 + 0.6; dx < w / 2 - 0.35; dx += 0.85) {
                for (const side of [-1, 1]) box(window, x + dx, y, z + side * (d / 2 + 0.014), 0.48, 0.64, 0.025);
            }
            for (let dz = -d / 2 + 0.6; dz < d / 2 - 0.35; dz += 0.85) {
                for (const side of [-1, 1]) box(window, x + side * (w / 2 + 0.014), y, z + dz, 0.025, 0.64, 0.48);
            }
        }
        box("#374a50", x, 0.99, z + d / 2 + 0.03, 0.8, 1.2, 0.04);
        box("#d9dcd7", x, 1.68, z + d / 2 + 0.3, 1.4, 0.14, 0.6);
    }

    const heights = [[5.2, 7.4, 4.1], [8.4, 11.4, 6.3], [3.6, 5.8, 4.7]];
    centers.forEach((x, ix) => centers.forEach((z, iz) => {
        if (ix === 2 && iz === 0) {
            // A small civic park breaks up the mass of the buildings.
            box("#758168", x, 0.28, z, 8.8, 0.1, 8.8);
            box("#cccfc4", x, 0.35, z, 1.25, 0.03, 8.8);
            box("#cccfc4", x, 0.35, z, 8.8, 0.03, 1.25);
            for (const dx of [-2.5, 2.5]) for (const dz of [-2.5, 2.5]) tree(x + dx, z + dz, 1.2);
        } else {
            building(x - 1.5, z - 0.6, 4.5, 5.3, heights[ix][iz], (ix + iz) % 2 ? "#bec7c7" : "#d7d9d2");
            building(x + 2.65, z + 1, 2.7, 3.8, heights[ix][iz] * 0.62, "#acb8ba");
        }
        for (const dz of [-3.8, 0, 3.8]) tree(x - 4.45, z + dz, 0.7);
        for (const dx of [-2.2, 1.3]) {
            box("#60645b", x + dx, 0.65, z + 4.45, 1.15, 0.18, 0.36);
            box("#485456", x + dx - 0.4, 0.43, z + 4.45, 0.1, 0.4, 0.3);
            box("#485456", x + dx + 0.4, 0.43, z + 4.45, 0.1, 0.4, 0.3);
        }
    }));

    function tree(x: number, z: number, scale: number) {
        box("#756e5d", x, 0.9, z, 0.14, 1.4, 0.14);
        box("#67765c", x, 1.65, z, scale, 1.2, scale);
        box("#7b876b", x + 0.08, 2.3, z, scale * 0.72, 0.45, scale * 0.72);
        box("#9ba493", x, 0.3, z, 0.6, 0.13, 0.6);
    }
    // Traffic lights and street lamps at the four intersections.
    for (const x of [-7, 7]) for (const z of [-7, 7]) for (const side of [-1, 1]) {
        const px = x + side * 2.4, pz = z + side * 2.4;
        box("#4f5c5f", px, 1.9, pz, 0.1, 3.5, 0.1);
        box("#4f5c5f", px - side * 0.4, 3.65, pz, 0.9, 0.1, 0.1);
        box("#e0e0ce", px - side * 0.75, 3.56, pz, 0.35, 0.08, 0.2);
    }
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const dummy = new THREE.Object3D();
    for (const [color, blocks] of batches) {
        const material = new THREE.MeshStandardMaterial({ color, roughness: 1, metalness: 0 });
        const mesh = new THREE.InstancedMesh(geometry, material, blocks.length);
        blocks.forEach((block, i) => {
            dummy.position.set(...block.position);
            dummy.scale.set(...block.size);
            dummy.rotation.set(0, block.rotation ?? 0, 0);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.computeBoundingSphere();
        city.add(mesh);
    }
    return city;
}

/** Dispose shared resources once, including instanced geometry. */
export function disposeScene(scene: THREE.Object3D) {
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
            geometries.add(object.geometry);
            const values = Array.isArray(object.material) ? object.material : [object.material];
            values.forEach(material => materials.add(material));
            if (object instanceof THREE.InstancedMesh) object.dispose();
        }
    });
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
}
