import {LineBasicMaterial, Geometry, Vector3, Line, Scene} from 'three';

export function createGrid(numHorizontalGridLines:number ,highlight:boolean, scene:Scene):void {
    // Determine the size of a grid block (square)
    this.gridBlockSize = 10;//this.SCREEN_HEIGHT / numHorizontalGridLines;

    let material = new LineBasicMaterial({
        color: 0x00ff00,
        opacity: 0.2
    });
    //*Draw Horrizontal verticies
    let HgridLine = new Geometry();
    HgridLine.vertices.push(
        new Vector3(-10 , 0, -10),
        new Vector3(10 , 0, -10)
        
    )
    
    let VgridLine = new Geometry();
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
                material = new LineBasicMaterial({
                    color: 0xff0000,
                    opacity: 0.2
                });
            }
            else {
                material = new LineBasicMaterial({
                    color: 0x555555,
                    opacity: 0.2
                });
            }

            let Hline = new Line(HgridLine, material);
            Hline.position.z = c - 1;
            scene.add(Hline);

            if(highlight)
            {
                material = new LineBasicMaterial({
                    color: 0x0000ff,
                    opacity: 0.2
                });
            }
            else {
                material = new LineBasicMaterial({
                    color: 0x555555,
                    opacity: 0.2
                });
            }

            let Vline = new Line(VgridLine, material);
            Vline.position.x = c - 1;
            scene.add(Vline);
        }
        else{
            material = new LineBasicMaterial({
                color: 0x555555,
                opacity: 0.2
            });

            let Hline = new Line(HgridLine, material);
            Hline.position.z = c - 1;
            scene.add(Hline);

            let Vline = new Line(VgridLine, material);
            Vline.position.x = c - 1;
            scene.add(Vline);
        }

    }

}