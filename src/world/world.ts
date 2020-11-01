import { createCamera} from './components/camera';
import { PerspectiveCamera, Renderer, Scene, WebGLRenderer } from 'three';
import {createCube } from './components/cube';
import { createScene } from './components/scene';
import { createGrid } from './components/grid';

import { Resizer } from './systems/Resizer';
import { createRenderer } from './systems/renderer';

import { InterfaceManager } from './utilities/InterfaceManager';
import { Navigator } from './utilities/Navigator';
import { webXR_Setup } from './utilities/webxr';
import { defLight } from './components/defaultLight';

export class World {
    protected camera:PerspectiveCamera;
    protected renderer:WebGLRenderer;
    protected scene:Scene;
    protected interfaceManager:InterfaceManager;
    protected resizer:Resizer;
    // 1. Create an instance of the World app
    constructor(container:HTMLElement) {
      
      this.camera = createCamera();
      this.scene = createScene();
      this.renderer = createRenderer();
      
      document.querySelector('#viewport').appendChild(this.renderer.domElement);
      this.renderer.domElement.setAttribute("id","screen");

      

      this.setUpDefaults();
      

      this.resizer = new Resizer(container, this.camera, this.renderer);
      
      this.renderer.setAnimationLoop(this.render.bind(this));
    }

    // 2. Render the scene
    render() {
      this.renderer.render( this.scene, this.camera);
    }
    setUpDefaults()
    {
      //* Setup interface layout
      this.interfaceManager = new InterfaceManager();

      //* Build Custom grid
      createGrid( 21, true, this.scene);

      //* Add default cube
      const cube = createCube();
      this.scene.add(cube);

      //* Add Controls 
      const controls = new Navigator(this.camera, this.renderer.domElement);

      //* Add vr Button
      webXR_Setup(this.renderer);

      //* Add Default Lights
      defLight(this.scene);
      
      window.addEventListener('resize',()=>{
        //* Resizer 
        this.resizer.onResize(this.renderer.domElement,this.camera,this.renderer);
      })
    }
  }