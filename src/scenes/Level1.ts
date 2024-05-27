import { Text, Container, Texture, TilingSprite, TextStyle } from "pixi.js";
import { PlayerSpaceShip } from "../game/PlayerSpaceShip";
import { EnemySpaceShip } from "../game/EnemySpaceShip";
import { SceneManager } from "../utils/SceneManager";
import { SceneBase } from "../utils/SceneBase";
import { checkCollision } from "../utils/IHitbox";
import { DefeatScene } from "./DefeatScene";
import { VictoryScene } from "./VictoryScene";

export class Level1 extends SceneBase {
    private world: Container;
    private background: TilingSprite;
    private playerSpaceShip: PlayerSpaceShip;
    private enemySpaceShips: EnemySpaceShip[];
    private timePassed: number = 0;
    private playerHealthText: Text;
    public isVulnerable: boolean = true;
    public destroyedSpaceShips: number = 0;
    public destroyedSpaceShipsText: Text;

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
            fontSize: 35
        });

        this.playerHealthText = new Text("Player HEALTH: " + this.playerSpaceShip.HEALTH , textStyle);
        this.world.addChild(this.playerHealthText);

        this.destroyedSpaceShipsText = new Text("Destroyed Spaceships: " + this.destroyedSpaceShips + "/10", textStyle);
        this.world.addChild(this.destroyedSpaceShipsText);

    }
    
    update(deltaTime: number, _deltaFrame?: number): void {
        this.timePassed += deltaTime;

        if (this.timePassed > 3000){
            this.timePassed = 0;
            const enemySpaceShip = new EnemySpaceShip();
            enemySpaceShip.position.set(Math.random()*SceneManager.WIDTH, this.playerSpaceShip.position.y - 1800);
            this.world.addChild(enemySpaceShip);
            this.enemySpaceShips.push(enemySpaceShip);
        }

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
        this.playerHealthText.position.y = this.playerSpaceShip.position.y - 1200;
        this.destroyedSpaceShipsText.position.y = this.playerSpaceShip.position.y - 1100;

        if (enemySpaceShip.getHitBox().top > SceneManager.HEIGHT){
            enemySpaceShip.destroy();
        }

        if (enemySpaceShip.HEALTH <= 0){
            enemySpaceShip.destroy();
            this.destroyedSpaceShips += 1;
        }
    }
    if (this.destroyedSpaceShips >= 10){
        const victoryScene = new VictoryScene();
        SceneManager.changeScene(victoryScene);
    }

    if (this.playerSpaceShip.HEALTH <= 0){
        const defeatScene = new DefeatScene();
        SceneManager.changeScene(defeatScene);
    }

    this.enemySpaceShips = this.enemySpaceShips.filter((elem) => !elem.destroyed);

    this.playerHealthText.text = "Player HEALTH: " + this.playerSpaceShip.HEALTH;
    this.destroyedSpaceShipsText.text = "Destroyed Spaceships: " + this.destroyedSpaceShips + "/10"

        if (this.playerSpaceShip.x + this.playerSpaceShip.width/4 > SceneManager.WIDTH){
            this.playerSpaceShip.x = SceneManager.WIDTH - this.playerSpaceShip.width/4;
        }

        if (this.playerSpaceShip.x - this.playerSpaceShip.width/4 < 0){
          this.playerSpaceShip.x = this.playerSpaceShip.width/4;
        }
    }

}