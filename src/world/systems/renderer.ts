import { WebGLRenderer } from 'three';

function createRenderer():WebGLRenderer {
    const renderer = new WebGLRenderer({ antialias: true });

    //* Turn on physically correct lightening model
    renderer.physicallyCorrectLights = true;
    return renderer;
}

export { createRenderer };