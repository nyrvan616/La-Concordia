import { Graphics, Rectangle } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { StateAnimation } from "./StateAnimation";


export class EnemySpaceShip extends PhysicsContainer {
    private static readonly MOVE_SPEED = 350;
    private static readonly ENEMY_WIDTH = 150;
    private static readonly ENEMY_HEIGHT = 150;
    private enemySpaceShip: StateAnimation;
    private hitBox: Graphics;


    constructor() {
        super();

        this.enemySpaceShip = new StateAnimation();

        this.enemySpaceShip.addState('idle', [
            'spaceShips/enemies/Nautolan/Designs - Base/PNGs/Nautolan Ship - Dreadnought - Base.png'
        ], 0.1, true, EnemySpaceShip.ENEMY_WIDTH, EnemySpaceShip.ENEMY_HEIGHT, { x: 0.5, y: 0.5 });
        this.enemySpaceShip.rotation = Math.PI;

        this.hitBox = new Graphics();
        this.hitBox.beginFill(0xFF00FF, 0.3);
        this.hitBox.drawRect(0, 0, EnemySpaceShip.ENEMY_WIDTH, EnemySpaceShip.ENEMY_HEIGHT);
        this.hitBox.endFill();
        this.hitBox.position.x = this.enemySpaceShip.position.x - EnemySpaceShip.ENEMY_WIDTH / 2;
        this.hitBox.position.y = this.enemySpaceShip.position.y - EnemySpaceShip.ENEMY_HEIGHT / 2;

        this.addChild(this.hitBox);
        this.addChild(this.enemySpaceShip);
        this.enemySpaceShip.playState('idle', true);
    }

    public override update(deltaMS: number) {

        super.update(deltaMS / 1000);
        this.enemySpaceShip.update(deltaMS / (1000 / 60));

        this.speed.x = 0;
        this.speed.y = EnemySpaceShip.MOVE_SPEED;
    }

    public getHitBox(): Rectangle{
        return this.hitBox.getBounds();
    }

}