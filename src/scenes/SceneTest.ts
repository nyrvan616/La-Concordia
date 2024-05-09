import { Container, Texture, TilingSprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
//import { StateAnimation } from "../game/StateAnimation";
import { PlayerSpaceShip } from "../game/PlayerSpaceShip";
import { HEIGHT } from "..";

export class SceneTest extends Container implements IUpdateable {
    private world: Container;
    private playerSpaceShip: PlayerSpaceShip;
    private background: TilingSprite;

    constructor() {
        super();
        this.world = new Container();

        this.background = new TilingSprite(Texture.from('backgrounds/River/PNG/background.png'), 1920, 1080);
        this.background.tileScale.set(8, 8);
        this.addChild(this.background);

        this.playerSpaceShip = new PlayerSpaceShip();
        this.playerSpaceShip.position.set(1000, 1000);
        this.world.addChild(this.playerSpaceShip);
        this.addChild(this.world);
    }
    
    update(deltaTime: number, _deltaFrame?: number): void {
        this.playerSpaceShip.update(deltaTime);

        this.world.position.y = -this.playerSpaceShip.position.y * this.worldTransform.a + HEIGHT / 1.15;
        this.background.tilePosition.y = this.world.position.y;

    }

}