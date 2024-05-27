import { Graphics, Rectangle } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { StateAnimation } from "./StateAnimation";

export class EnemySpaceShip extends PhysicsContainer {
    private static readonly MOVE_SPEED = 250;
    private static readonly ENEMY_WIDTH = 128;
    private static readonly ENEMY_HEIGHT = 128;
    public HEALTH: number = 100;

    private enemySpaceShipEngineEffect: StateAnimation;
    private enemySpaceShipDamaged: StateAnimation;
    private hitBox: Graphics;
    private enemySpaceShip: StateAnimation;
    private isVulnerable: boolean = true;
    
    constructor() {
        super();
        this.enemySpaceShip = new StateAnimation();
        this.enemySpaceShip.addState('idle', [
            'spaceShips/enemies/Nautolan/Designs - Base/PNGs/Nautolan Ship - Dreadnought - Base.png'
        ], 0.1, true, EnemySpaceShip.ENEMY_WIDTH, EnemySpaceShip.ENEMY_HEIGHT, { x: 0.5, y: 0.5 });
        this.enemySpaceShip.addState('damage', [
            'spaceShips/enemies/Nautolan/Designs - Base/PNGs/Nautolan Ship - Dreadnought - Base.png',
            'spaceShips/enemies/Nautolan/Engine Effects/PNGs/Nautolan Ship - Dreadnought - destruction~1/3.png',
        ], 0.1, true, EnemySpaceShip.ENEMY_WIDTH, EnemySpaceShip.ENEMY_HEIGHT, { x: 0.5, y: 0.5 });
        this.enemySpaceShip.addState('destroyed', [
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/00.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/01.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/02.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/03.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/04.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/05.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/06.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/07.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/08.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/09.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/10.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/11.png',
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
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/08.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/09.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/10.png',
            'spaceShips/enemies/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png~1/11.png'
            
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

        if (this.isVulnerable == false) {
            this.enemySpaceShipDamaged.visible = true;
        } else {
            this.enemySpaceShipDamaged.visible = false;
        }
    }

    public getHitBox(): Rectangle{
        return this.hitBox.getBounds();
    }


public shipCollisionDamage(){
    if(this.isVulnerable){
        this.HEALTH -= 10;
        this.isVulnerable = false;
        this.selectAnimation('damage',  true);

        setTimeout(() => {
            this.isVulnerable = true;
            this.selectAnimation('idle',  true);
        }, 3000);
        }
}

public projectileCollisionDamage(damage: number){
    if(this.isVulnerable){
        this.HEALTH -= damage;
        this.isVulnerable = false;
        this.selectAnimation('damage',  true);

        setTimeout(() => {
            this.isVulnerable = true;
            this.selectAnimation('idle',  true);
        }, 500);
    }
}

}