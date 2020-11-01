import { DirectionalLight, Color, AmbientLight, Scene } from "three";

function defLight(scene:Scene):void{
    let ambient:AmbientLight = new AmbientLight(new Color('#ffffff'),0.2);	
    scene.add( ambient );
    const light = new DirectionalLight(new Color(0xffffff), 8);
    light.position.set( 10, 10, 10 );
    scene.add(light);
}

export {defLight};