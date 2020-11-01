export class InterfaceManager {

    protected viewport:HTMLElement;
    protected application:HTMLElement;
    protected effects:HTMLElement;
    protected topWindows:HTMLElement;
    protected properties:HTMLElement;
    protected bottomWindows:HTMLElement;
    protected timeLine:HTMLElement;
    protected max_height:number = window.innerHeight;
    protected max_width:number = window.innerWidth;
    protected canvScrn:HTMLElement;
    constructor(layout?:String){
        this._setDefaultlayout();
    }
    private _setDefaultlayout():void{
        this.viewport = document.querySelector("#viewport");
        this.application = document.querySelector('#application');
        this.effects = document.querySelector('#effects');
        this.topWindows = document.querySelector('#topWindows');
        this.properties = document.querySelector('#properties');
        this.bottomWindows = document.querySelector('#bottomWindows');
        this.timeLine = document.querySelector('#timeline');
        this.canvScrn = document.querySelector("#screen");

        this.application.style.width=`${this.max_width}px`;
        this.application.style.height=`${this.max_height}px`;

        this.topWindows.style.height = `${(75/100)*this.max_height}px`;
        this.topWindows.style.width = `${(100/100)*this.max_width}px`;

        this.bottomWindows.style.height = `${(25/100)*this.max_height-4}px`; //4 is the border width of the black separater
        this.bottomWindows.style.width = `${(100/100)*this.max_width}px`;

        this.timeLine.style.width = `${(100/100)*this.max_width}px`;
        this.timeLine.style.height = `${(25/100)*this.max_height-4}px`;
        this.timeLine.style.background = "#222222";

        this.canvScrn.style.width = `${(60/100)*this.max_width}px`;
        this.canvScrn.style.height = `${(100/100)*this.topWindows.offsetHeight}px`;

        this.effects.style.height = `${(100/100)*this.topWindows.offsetHeight}px`;
        this.effects.style.width = `${(20/100)*this.max_width}px`;

        this.viewport.style.height = `${(100/100)*this.topWindows.offsetHeight}px`;
        this.viewport.style.width = `${(60/100)*this.max_width}px`;

        this.properties.style.height = `${(100/100)*this.topWindows.offsetHeight}px`;
        this.properties.style.width = `${(20/100)*this.max_width}px`;
    }
}