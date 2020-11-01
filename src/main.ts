// import {App} from './Setup';
import {World} from './world/world';

function main():void{
    // get a reference to the container element
    // const ele = ;
    const world = new World(document.getElementById('#viewport'));

    world.render();
}
main();

