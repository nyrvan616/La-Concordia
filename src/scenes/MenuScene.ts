import { Texture } from "pixi.js";
import { Button } from "../utils/Button";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { SceneTest } from "./SceneTest";

export class MenuScene extends SceneBase {

    constructor() {
        super();
        const btn = new Button(
            Texture.from('buttonContinueDefault'),
            Texture.from('buttonContinueDown'),
            Texture.from('buttonContinueOver'),
            goToGame
        );
        this.x = SceneManager.WIDTH/2;
        this.y = SceneManager.HEIGHT/2;
        this.addChild(btn);

    
    }
    
    public update(): void {
    }

}

function goToGame(){
    SceneManager.changeScene(new SceneTest());
}
