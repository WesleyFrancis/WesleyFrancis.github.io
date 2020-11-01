import { BoxBufferGeometry, Mesh, MeshStandardMaterial, Color, TextureLoader } from 'three';

function createCube():Mesh {
    // create geometry
    const geometry = new BoxBufferGeometry(3,1,3,20,20,20);

    const textureloader = new TextureLoader()

    const texture = textureloader.load( './textures/harshbricks-albedo.png');
    const ambient = textureloader.load( './textures/harshbricks-ao2.png');
    const normal = textureloader.load( './textures/harshbricks-normal.png');
    const roughness = textureloader.load( './textures/harshbricks-normal.png');
    const height = textureloader.load( './textures/harshbricks-height5-16.png');
    const metalness = textureloader.load( './textures/metalness.png');
    // create a default mat

    const material = new MeshStandardMaterial({map: texture, metalnessMap:metalness, displacementMap:height,displacementScale:.05, aoMapIntensity:0.001 ,aoMap:ambient,  normalMap:normal, roughnessMap:roughness, roughness:0.5});

    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material);

    cube.position.set(0, -0.5, 0);
    return cube;
}

export { createCube };