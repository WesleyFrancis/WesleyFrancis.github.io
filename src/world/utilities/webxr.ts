import { WebGLRenderer } from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton";

function webXR_Setup(renderer:WebGLRenderer){
    renderer.xr.enabled = true; 
    document.body.appendChild( VRButton.createButton( renderer ) );
}

export {webXR_Setup};