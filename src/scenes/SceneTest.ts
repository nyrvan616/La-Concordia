import { Container, Texture, TilingSprite } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
//import { StateAnimation } from "../game/StateAnimation";
import { PlayerSpaceShip } from "../game/PlayerSpaceShip";
import { HEIGHT } from "..";
import { EnemySpaceShip } from "../game/EnemySpaceShip";

export class SceneTest extends Container implements IUpdateable {
    private world: Container;
    private background: TilingSprite;
    private playerSpaceShip: PlayerSpaceShip;
    private enemySpaceShip: EnemySpaceShip;

    constructor() {
        super();
        this.world = new Container();

        this.background = new TilingSprite(Texture.from('backgrounds/River/PNG/background.png'), 1920, 1080);
        this.background.tileScale.set(8, 8);
        this.addChild(this.background);

        this.playerSpaceShip = new PlayerSpaceShip();
        this.playerSpaceShip.position.set(1000, 1000);
        this.world.addChild(this.playerSpaceShip);

        this.enemySpaceShip = new EnemySpaceShip();
        this.enemySpaceShip.position.set(1000, -1000);
        this.world.addChild(this.enemySpaceShip);

        this.addChild(this.world);
    }
    
    update(deltaTime: number, _deltaFrame?: number): void {
        this.playerSpaceShip.update(deltaTime);
        this.enemySpaceShip.update(deltaTime);

        this.world.position.y = -this.playerSpaceShip.position.y * this.worldTransform.a + HEIGHT / 1.15;
        this.background.tilePosition.y = this.world.position.y;

    }

}