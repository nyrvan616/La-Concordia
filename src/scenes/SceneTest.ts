import { Text, Container, Texture, TilingSprite, TextStyle } from "pixi.js";
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
    private timePassed: number = 0;
    private textPlayerHealth: Text;

    constructor() {
        super();
        this.world = new Container();

        this.background = new TilingSprite(
            Texture.from('backgrounds/River/PNG/background.png'),
            SceneManager.WIDTH,
            SceneManager.HEIGHT);

        this.background.tileScale.set(3.9, 3.52);
        this.addChild(this.background);

        this.playerSpaceShip = new PlayerSpaceShip();
        this.playerSpaceShip.position.set(SceneManager.WIDTH/2, 1000);
        this.world.addChild(this.playerSpaceShip);

        this.enemySpaceShip = new EnemySpaceShip();
        this.enemySpaceShip.position.set(SceneManager.WIDTH/2, -1000);
        this.world.addChild(this.enemySpaceShip);

        this.addChild(this.world);

        const textStyle = new TextStyle({
            fill: "#ffffff",
            fontFamily: "Block Stock",
            fontSize: 70
        });

        this.textPlayerHealth = new Text("HEALTH: " + this.playerSpaceShip.HEALTH , textStyle);
        this. textPlayerHealth.y = 200;
        this.world.addChild(this.textPlayerHealth);
    }
    
    update(deltaTime: number, _deltaFrame?: number): void {
        this.timePassed += deltaTime;

        if (deltaTime)

        this.playerSpaceShip.update(deltaTime);
        this.enemySpaceShip.update(deltaTime);

        this.world.position.y = -this.playerSpaceShip.position.y * this.worldTransform.a + SceneManager.HEIGHT / 1.15;
        this.background.tilePosition.y = this.world.position.y;

        const colision = checkCollision(this.playerSpaceShip, this.enemySpaceShip);
        if(colision ){
            if(this.playerSpaceShip.isVulnerable){
            this.playerSpaceShip.HEALTH -= 10;
            }
            this.enemySpaceShip.HEALTH -= 10;
            this.playerSpaceShip.isVulnerable = false;
            this.playerSpaceShip.selectAnimation('invulnerable',  true);
            this.enemySpaceShip .selectAnimation('damage', true);

            setTimeout(() => {
                this.playerSpaceShip.isVulnerable = true;
                this.playerSpaceShip.selectAnimation('idle',  true);
                this.enemySpaceShip.selectAnimation('idle',  true);
            }, 3000);
        }

        this.textPlayerHealth.text = "HEALTH: " + this.playerSpaceShip.HEALTH

    }

}