import { BoxBufferGeometry, Mesh, MeshStandardMaterial, Color } from 'three';

function createCube():Mesh {
    // create geometry
    const geometry = new BoxBufferGeometry(2,2,2);

    // create a default mat
    const material = new MeshStandardMaterial({color: new Color( 0xffffff ) });

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);
    cube.rotation.set(-0.5, 10, 0.8);
    return cube;
}

export { createCube };