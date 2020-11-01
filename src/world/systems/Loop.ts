import { Clock, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

class Loop {
    camera:PerspectiveCamera;
    scene:Scene;
    renderer:WebGLRenderer;
    updatables:Object3D[];
    constructor(camera:PerspectiveCamera, scene:Scene, renderer:WebGLRenderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
    }

  start() {
      this.renderer.setAnimationLoop(()=>{
        this.tick();
        this.renderer.render(this.scene,this.camera);
        
      })
  }
  
  stop() {
      this.renderer.setAnimationLoop(null);
  }

  tick() {
    // Code to update animationS will go here;
    // somewhere in the Loop class:
    // each object sould have a ick function attached

    const clock = new Clock();
    const delta = clock.getDelta();

    
  }
}

export { Loop }