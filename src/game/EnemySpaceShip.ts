import { Graphics, ObservablePoint, Rectangle } from "pixi.js";
// import { Keyboard } from "../utils/Keyboard";
import { PhysicsContainer } from "./PhysicsContainer";
import { StateAnimation } from "./StateAnimation";
// import { Projectile } from "./Projectile";


export class EnemySpaceShip extends PhysicsContainer {
    private static readonly MOVE_SPEED = 350;
    private static readonly ENEMY_WIDTH = 128;
    private static readonly ENEMY_HEIGHT = 128;
    public HEALTH = 100;

    private enemySpaceShipEngineEffect: StateAnimation;
    private enemySpaceShipDamaged: StateAnimation;
    private hitBox: Graphics;
    private enemySpaceShip: StateAnimation;
    // private projectiles: Projectile[] = [];
    // private isShooting: boolean = false;
    
    constructor() {
        super();
        this.enemySpaceShip = new StateAnimation();
        this.enemySpaceShip.addState('idle', [
            'spaceShips/enemies/Nautolan/Designs - Base/PNGs/Nautolan Ship - Dreadnought - Base.png'
        ], 0.1, true, EnemySpaceShip.ENEMY_WIDTH, EnemySpaceShip.ENEMY_HEIGHT, { x: 0.5, y: 0.5 });
        

        this.enemySpaceShip.rotation = Math.PI;
        
        this.enemySpaceShipEngineEffect = new StateAnimation();
        this.enemySpaceShipEngineEffect.addState('engineOn', [
            'spaceShips/enemies/Nautolan/Engine Effects/PNGs/Nautolan Ship - Dreadnought - Engine Effect.png~1/4.png',
            'spaceShips/enemies/Nautolan/Engine Effects/PNGs/Nautolan Ship - Dreadnought - Engine Effect.png~1/5.png',
            'spaceShips/enemies/Nautolan/Engine Effects/PNGs/Nautolan Ship - Dreadnought - Engine Effect.png~1/6.png',
            'spaceShips/enemies/Nautolan/Engine Effects/PNGs/Nautolan Ship - Dreadnought - Engine Effect.png~1/7.png',
        ], 0.1, true, EnemySpaceShip.ENEMY_WIDTH, EnemySpaceShip.ENEMY_HEIGHT, { x: 0.5, y: 0.4 });
        this.enemySpaceShipEngineEffect.rotation = Math.PI;

        this.enemySpaceShipDamaged = new StateAnimation();
        this.enemySpaceShipDamaged.addState('damage', [
            'spaceShips/enemies/Nautolan/Designs - Base/PNGs/Nautolan Ship - Dreadnought - Base.png',
            'spaceShips/enemies/Nautolan/Engine Effects/PNGs/Nautolan Ship - Dreadnought - destruction~1/3.png',
        ], 0.1, true, EnemySpaceShip.ENEMY_WIDTH, EnemySpaceShip.ENEMY_HEIGHT, { x: 0.5, y: 0.5 });
        this.enemySpaceShipDamaged.rotation = Math.PI;


        this.hitBox = new Graphics();
        this.hitBox.beginFill(0xFF00FF, 0.3);
        this.hitBox.drawRect(0, 0, EnemySpaceShip.ENEMY_WIDTH, EnemySpaceShip.ENEMY_HEIGHT);
        this.hitBox.endFill();
        this.hitBox.position.x = this.enemySpaceShip.position.x - EnemySpaceShip.ENEMY_WIDTH / 2;
        this.hitBox.position.y = this.enemySpaceShip.position.y - EnemySpaceShip.ENEMY_HEIGHT / 2;
    

        this.addChild(this.hitBox);
        this.addChild(this.enemySpaceShip);
        this.addChild(this.enemySpaceShipDamaged);
        this.addChild(this.enemySpaceShipEngineEffect);

        this.enemySpaceShip.playState('idle', true);
        this.enemySpaceShipEngineEffect.playState('engineOn', true);
        this.enemySpaceShipDamaged.playState('damage', true);


        // this.enemySpaceShipDamaged.visible = false;
        this.enemySpaceShipEngineEffect.visible = true;

        this.hitBox.visible = false;
    }

    public selectAnimation(stateName: string, restartAnim:boolean){
        this.enemySpaceShip.playState(stateName, restartAnim);
    }
    
    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.enemySpaceShip.update(deltaMS / (1000 / 60));
        this.enemySpaceShipEngineEffect.update(deltaMS / (1000 / 60));
        this.enemySpaceShipDamaged.update(deltaMS / (1000 / 60));

        this.speed.x = 0;
        
        this.speed.y = EnemySpaceShip.MOVE_SPEED;
        if (this.speed.x !== 0 || this.speed.y !== 0) {
            this.enemySpaceShipEngineEffect.visible = true;
        } else {
            this.enemySpaceShipEngineEffect.visible = false;
    
        }

        if (this.HEALTH = 0){
            this.enemySpaceShip.destroy();
            this.enemySpaceShipDamaged.destroy();
            this.enemySpaceShipEngineEffect.destroy();
        }
    }

    public getHitBox(): Rectangle{
        return this.hitBox.getBounds();
    }

     public colisionDamage(overlap: Rectangle, objects: ObservablePoint<any>) {
        if (overlap.width < overlap.height){
            if (this.x > objects.x){
                this.HEALTH -= 10;
                this.enemySpaceShipDamaged.visible = true;
            } else if (this.x < objects.x){
                this.HEALTH -= 10;
                console.log('Enemy Health', this.HEALTH);
                this.enemySpaceShipDamaged.playState('damage', true);
                this.enemySpaceShipDamaged.visible = true;
            }
        
        } else {
            if (this.y > objects.y){
                this.HEALTH -= 10;
                this.enemySpaceShipDamaged.playState('damage', true);
            } else if (this.y < objects.y){
                this.HEALTH -= 10;
                console.log('Enemy Health: ', this.HEALTH);
        }
    }
}

}