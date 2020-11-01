import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Navigator{
    constructor(camera:PerspectiveCamera, canvas:HTMLElement){
        this._defaultNav(camera,canvas);
    }
    private _defaultNav(camera:PerspectiveCamera,canvas:HTMLElement){
        const controls = new OrbitControls(camera,document.querySelector("#screen"));

    }
}