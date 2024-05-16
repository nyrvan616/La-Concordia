import { Container, Texture, TilingSprite } from "pixi.js";
//import { IUpdateable } from "../utils/IUpdateable";
import { PlayerSpaceShip } from "../game/PlayerSpaceShip";
import { EnemySpaceShip } from "../game/EnemySpaceShip";
import { SceneManager } from "../utils/SceneManager";
import { SceneBase } from "../utils/SceneBase";
import { checkCollision } from "../utils/IHitbox";

export class SceneTest extends SceneBase {
    private world: Container;
    private background: TilingSprite;
    private playerSpaceShip: PlayerSpaceShip;
    private enemySpaceShip: EnemySpaceShip;

    constructor() {
        super();
        this.world = new Container();

        this.background = new TilingSprite(Texture.from('backgrounds/River/PNG/background.png'), SceneManager.WIDTH, SceneManager.HEIGHT);
        this.background.tileScale.set(4, 4);
        this.addChild(this.background);

        this.playerSpaceShip = new PlayerSpaceShip();
        this.playerSpaceShip.position.set(SceneManager.WIDTH/2, 1000);
        this.world.addChild(this.playerSpaceShip);

        this.enemySpaceShip = new EnemySpaceShip();
        this.enemySpaceShip.position.set(SceneManager.WIDTH/2, -1000);
        this.world.addChild(this.enemySpaceShip);

        this.addChild(this.world);
    }
    
    update(deltaTime: number, _deltaFrame?: number): void {
        this.playerSpaceShip.update(deltaTime);
        this.enemySpaceShip.update(deltaTime);

        this.world.position.y = -this.playerSpaceShip.position.y * this.worldTransform.a + SceneManager.HEIGHT / 1.15;
        this.background.tilePosition.y = this.world.position.y;

        const colision = checkCollision(this.playerSpaceShip, this.enemySpaceShip);
        if(colision){
            console.log("colision");
            //el playerSpaceShip pierde vida
            this.playerSpaceShip.HEALTH -= 10;
            //el playerSpaceShip se vuelve invulnerable por 3 segundos
            this.playerSpaceShip.isVulnerable = false;
            setTimeout(() => {
                console.log("vulnerable");
                this.playerSpaceShip.isVulnerable = true;
            }, 3000);


        }

    }

}