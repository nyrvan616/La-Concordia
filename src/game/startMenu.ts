import { Container } from "pixi.js";
// import { Button } from "../utils/Button";
import { SceneBase } from "../utils/SceneBase";
import { StateAnimation } from "./StateAnimation";
import { SceneManager } from "../utils/SceneManager";

export class startMenu extends SceneBase {
    private world: Container;
    private background: StateAnimation;

    constructor() {
        super();

        this.world = new Container();
        this.world.position.set(0);

        this.background = new StateAnimation();
        this.background.addState('background', [
        'UI/background/Window.png'
        ], 0, true, SceneManager.WIDTH, SceneManager.HEIGHT, {x: 0.5, y: 0.5});
        this.background.position = this.world.position;
    }

    public update(){
        
    }
}