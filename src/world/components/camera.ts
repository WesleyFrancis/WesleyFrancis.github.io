import { MathUtils, PerspectiveCamera } from 'three';

    let fov = 90; // fov = Field Of View
    let aspectRato = 1; // aspect ratio (dummy value)
    let nearClip = 0.1; // near clipping plane
    let farClip = 1000; // far clipping plane

    function createCamera():PerspectiveCamera {
        const camera = new PerspectiveCamera( fov,aspectRato,nearClip,farClip );
        
        camera.position.set( 0,4,6 );
        camera.rotation.y = MathUtils.degToRad(0);
        return camera;
    }

export { createCamera };

