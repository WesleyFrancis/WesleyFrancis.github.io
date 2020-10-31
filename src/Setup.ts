import * as THREE from 'three';
import {MathUtils} from 'three/src/math/MathUtils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import {
        BoxBufferGeometry, 
        Camera, 
        DirectionalLight, 
        Material, 
        Mesh,
        MeshStandardMaterial,
        Scene,Color, Vector3, 
        WebGLRenderer,
        PerspectiveCamera } from 'three';
import {TransformControls} from 'three/examples/jsm/controls/TransformControls';

export class App{
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    protected camera:Camera;
    protected scene:Scene;
    protected renderer:WebGLRenderer;
    protected defaultMesh:Mesh;
    protected gridBlockSize:number;
	protected viewport:HTMLElement;
	protected sceneList:number[];
	protected orbit:OrbitControls;
	constructor(){
        this._init();
	}	
    
	_init():void{
        this._SetupLayout(); //@ setup screen layout on load
        this.viewport = document.querySelector("#viewport");
        let canvasPort = document.querySelector("#viewport > canvas")
        //@ Set camera controls 
		const fov = 90;
		const aspect = this.viewport.offsetWidth/this.viewport.offsetHeight;  // the canvas default
		const near = 0.1;
		const far = 100;
		this.camera = new PerspectiveCamera(fov, aspect, near, far);
		this.camera.position.set(0,4,4);
        this.camera.rotation.y = MathUtils.degToRad(200);
        // @ Create default scenes
		this.scene = new Scene();
		this.scene.background = new Color(0x222222);
        
        //@ initiate the renderer
        this.renderer = new WebGLRenderer ({antialias:true});
		this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.viewport.offsetWidth,this.viewport.offsetHeight);
        //@ add the renderer to the viewport
		this.viewport.appendChild(this.renderer.domElement);
        
       this.renderer.xr.enabled = true; 
    //    document.querySelector("#viewport > canvas")
       document.body.appendChild( VRButton.createButton( this.renderer ) );
       
       
         this.renderer.setAnimationLoop(this._render.bind(this));
        
        // this.renderer.setAnimationLoop( function () {

        //     this.renderer.render( this.scene, this.camera );
        
        // } );

		this.drawGrid(21,true)
     	this._buildBox(new Vector3(-1,0,1));
         this._addControls(); //@ anything that requires render.dom must call after the Render.dom is created.
		this._addLight();
		
		window.addEventListener('resize', this._resize.bind(this) );
		window.addEventListener("DOMContentLoaded",()=>{
            let vbutton:HTMLElement = document.querySelector("#viewport > canvas > #VRButton");
            vbutton.style.position='relative';
            vbutton.style.bottom='300px';
        })
    }
	private _buildBox(location?:Vector3):void
	{
		const geometry:BoxBufferGeometry = new BoxBufferGeometry();
        const material:Material = new MeshStandardMaterial({color: new THREE.Color( 0Xaaee32 ) })
        
		this.defaultMesh = new Mesh (geometry,material);
        this.defaultMesh.translateX(location.x);
        this.defaultMesh.translateY(location.y);
		this.defaultMesh.translateZ(location.x);
		this.scene.add(this.defaultMesh);
		
		const controls:TransformControls = new TransformControls(this.camera,this.renderer.domElement);
        this.scene.add(controls);
        
		controls.addEventListener( 'mouseDown', ( event ) =>{
			//alert("down")
			this._disableCont(true);

		} );
		
		controls.addEventListener( 'mouseUp', ( event ) =>{
			//alert("Up")
			this._disableCont(false);

		} );

    // assuming you add "myObj" to your scene...
    controls.attach(this.defaultMesh);

	}
	private _disableCont(state:boolean):void{
		this.orbit.enabled = !state;
	}
	private _addLight(){
		let light:DirectionalLight = new DirectionalLight( 0xffffff, 1 );
		light.position.set( 1, 1, 1 );
		this.scene.add( light );
	}
	private _SetupLayout(){
		let max_height = window.innerHeight;
		let max_width = window.innerWidth;

		let viewport:HTMLElement = document.querySelector("#viewport");
		let application:HTMLElement = document.querySelector('#application');
		let effects:HTMLElement = document.querySelector('#effects');
		let topWindows:HTMLElement = document.querySelector('#topWindows');
		let properties:HTMLElement = document.querySelector('#properties');
		let bottomWindows:HTMLElement = document.querySelector('#bottomWindows');

		application.style.width=`${max_width}px`;
		application.style.height=`${max_height}px`;

		topWindows.style.height = `${(75/100)*max_height}px`;
		topWindows.style.width = `${(100/100)*max_width}px`;

		bottomWindows.style.height = `${(25/100)*max_height-4}px`; //4 is the border width of the black separater
		bottomWindows.style.width = `${(100/100)*max_width}px`;

		effects.style.height = `${(100/100)*topWindows.offsetHeight}px`;
		effects.style.width = `${(20/100)*max_width}px`;

		viewport.style.height = `${(100/100)*topWindows.offsetHeight}px`;
		viewport.style.width = `${(60/100)*max_width}px`;

		properties.style.height = `${(100/100)*topWindows.offsetHeight}px`;
		properties.style.width = `${(20/100)*max_width}px`;
	}
	private _addControls()
	{
		this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
	}
	private drawGrid(numHorizontalGridLines:number ,highlight:boolean){
        // Determine the size of a grid block (square)
        this.gridBlockSize = 10;//this.SCREEN_HEIGHT / numHorizontalGridLines;

		let material = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            opacity: 0.2
        });
		//*Draw Horrizontal verticies
		let HgridLine = new THREE.Geometry();
		HgridLine.vertices.push(
			new Vector3(-10 , 0, -10),
			new Vector3(10 , 0, -10)
			
		)
		
		let VgridLine = new THREE.Geometry();
		VgridLine.vertices.push(
			new Vector3(-10 , 0, 10),
			new Vector3(-10 , 0, -10)
		)

		for (let c = 1; c <= numHorizontalGridLines; c++)
		{
			if( c == 11)
			{
				if(highlight)
				{
					material = new THREE.LineBasicMaterial({
						color: 0xff0000,
						opacity: 0.2
					});
				}
				else {
					material = new THREE.LineBasicMaterial({
						color: 0x555555,
						opacity: 0.2
					});
				}
	
				let Hline = new THREE.Line(HgridLine, material);
				Hline.position.z = c - 1;
				this.scene.add(Hline);

				if(highlight)
				{
					material = new THREE.LineBasicMaterial({
						color: 0x0000ff,
						opacity: 0.2
					});
				}
				else {
					material = new THREE.LineBasicMaterial({
						color: 0x555555,
						opacity: 0.2
					});
				}
	
				let Vline = new THREE.Line(VgridLine, material);
				Vline.position.x = c - 1;
				this.scene.add(Vline);
			}
			else{
				material = new THREE.LineBasicMaterial({
					color: 0x555555,
					opacity: 0.2
				});
	
				let Hline = new THREE.Line(HgridLine, material);
				Hline.position.z = c - 1;
				this.scene.add(Hline);
	
				let Vline = new THREE.Line(VgridLine, material);
				Vline.position.x = c - 1;
				this.scene.add(Vline);
			}

        }

    }
    private _resize(){
		const vPort:HTMLElement = document.querySelector('#viewport');

		this.renderer.setSize(vPort.offsetWidth,vPort.offsetHeight);

	 this._render();


	}
	private _render( ) {

		this.renderer.render(this.scene,this.camera)
		
	}
	
}