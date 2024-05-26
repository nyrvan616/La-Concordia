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
    private enemySpaceShips: EnemySpaceShip[];
    // private enemySpaceShip: EnemySpaceShip;
    private timePassed: number = 0;
    private textPlayerHealth: Text;
    // private textEnemyHealth: Text;
    public isVulnerable: boolean = true;

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

        this.enemySpaceShips = [];

        let enemySpaceShip = new EnemySpaceShip();
        enemySpaceShip.position.set(SceneManager.WIDTH/2, -1000);
        this.world.addChild(enemySpaceShip);
        this.enemySpaceShips.push(enemySpaceShip);

        this.addChild(this.world);

        const textStyle = new TextStyle({
            fill: "#ffffff",
            fontFamily: "Block Stock",
            fontSize: 50
        });

        this.textPlayerHealth = new Text("Player HEALTH: " + this.playerSpaceShip.HEALTH , textStyle);
        this. textPlayerHealth.y = 200;
        this.world.addChild(this.textPlayerHealth);

        // this.textEnemyHealth = new Text("Enemy HEALTH: " + this.enemySpaceShip.HEALTH , textStyle);
        // this. textPlayerHealth.y = 200;
        // this.world.addChild(this.textEnemyHealth);
    }
    
    update(deltaTime: number, _deltaFrame?: number): void {
        this.timePassed += deltaTime;

        this.playerSpaceShip.update(deltaTime);

        for (let enemySpaceShip of this.enemySpaceShips){
        enemySpaceShip.update(deltaTime);
        const spaceShipCollision = checkCollision(this.playerSpaceShip, enemySpaceShip);
        if(spaceShipCollision){
            this.playerSpaceShip.shipCollisionDamage();
            enemySpaceShip.shipCollisionDamage();
        }
        for (const projectile of this.playerSpaceShip.projectiles){
        const projectileCollision = checkCollision(enemySpaceShip, projectile);
        if (projectileCollision){
            enemySpaceShip.projectileCollisionDamage(projectile.damage)
        }
        }

        this.world.position.y = -this.playerSpaceShip.position.y * this.worldTransform.a + SceneManager.HEIGHT / 1.15;
        this.background.tilePosition.y = this.world.position.y;
        this.textPlayerHealth.position.y = this.playerSpaceShip.position.y - 1200;
        // this.textEnemyHealth.position.y = this.playerSpaceShip.position.y - 1100;


        this.textPlayerHealth.text = "Player HEALTH: " + this.playerSpaceShip.HEALTH;
        // this.textEnemyHealth.text = "Enemy HEALTH: " + this.enemySpaceShip.HEALTH;

        }

    }

}