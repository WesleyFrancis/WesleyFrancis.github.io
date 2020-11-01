import { DirectionalLight, Color, AmbientLight, Scene, PointLight } from "three";

function defLight(scene:Scene):void{
    let ambient:AmbientLight = new AmbientLight(new Color('#ffffff'),0.2);	
    scene.add( ambient );
    const light = new PointLight(new Color(0xffffff), 8);
    light.position.set( 1, 2, 1 );
    scene.add(light);
}

export {defLight};