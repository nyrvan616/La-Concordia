import { Container, Texture, TilingSprite } from "pixi.js";
import { Button } from "../utils/Button";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { SceneTest } from "./SceneTest";

export class MenuScene extends SceneBase {
    private world: Container;
    private background: TilingSprite;
    constructor() {
        super();
        
        this.world = new Container();
        this.world.position.set(0);
        
        this.background = new TilingSprite(Texture.from('UI/background/Window.png'),
        SceneManager.WIDTH,
        SceneManager.HEIGHT);
        this.background.position = this.world.position;

        const btn = new Button(
            Texture.from('buttonContinueDefault'),
            Texture.from('buttonContinueDown'),
            Texture.from('buttonContinueOver'),
            goToGame
        );
        btn.x = SceneManager.WIDTH/2;
        btn.y = SceneManager.HEIGHT/2;

        this.world.addChild(this.background);
        this.world.addChild(btn);
        this.addChild(this.world);

    
    }
    
    public update(): void {
    }

}

function goToGame(){
    SceneManager.changeScene(new SceneTest());
}
