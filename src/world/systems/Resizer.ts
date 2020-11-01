import { PerspectiveCamera, WebGLRenderer } from "three";
import { InterfaceManager } from '../utilities/InterfaceManager';

export class Resizer {
    
    constructor(container:HTMLElement, camera:PerspectiveCamera, renderer:WebGLRenderer){
        this._setDefaults(container, camera, renderer )
    }
    private _setDefaults(container:HTMLElement, camera:PerspectiveCamera, renderer:WebGLRenderer):void{
        let Ncontainer:HTMLElement = document.querySelector("#viewport");
        // Set the camera's aspect ratio
        camera.aspect = Ncontainer.offsetWidth / Ncontainer.offsetHeight;
        // update the camera's frustum
        camera.updateProjectionMatrix();
        // update the size of the renderer AND the canvas
        renderer.setSize(Ncontainer.offsetWidth, Ncontainer.offsetHeight);
    
        // set the pixel ratio (for mobile devices)
        renderer.setPixelRatio(window.devicePixelRatio);
    }
    onResize(container:HTMLElement, camera:PerspectiveCamera, renderer:WebGLRenderer):void {
        const ui = new InterfaceManager('default');
        let Ncontainer:HTMLElement = document.querySelector("#viewport");
        this._setDefaults( Ncontainer, camera, renderer )
    }
}