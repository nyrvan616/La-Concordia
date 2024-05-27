import { Graphics, Rectangle } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { PhysicsContainer } from "./PhysicsContainer";
import { StateAnimation } from "./StateAnimation";
import { Projectile } from "./Projectile";

export class PlayerSpaceShip extends PhysicsContainer {
    private static readonly MOVE_SPEED = 350;
    private static readonly PLAYER_WIDTH = 128;
    private static readonly PLAYER_HEIGHT = 128;

    private playerSpaceShip: StateAnimation;
    private playerSpaceShipEngineEffect: StateAnimation;
    private playerSpaceShipDamaged: StateAnimation;
    private hitBox: Graphics;
    public projectiles: Projectile[] = [];
    private isShooting: boolean = false;
    public HEALTH: number = 100;
    public isVulnerable: boolean = true;

    constructor() {
        super();
        this.playerSpaceShip = new StateAnimation();
        this.playerSpaceShip.addState('idle', [
            'spaceShips/friendly/Nairan/Designs - Base/PNGs/Nairan - Dreadnought - Base.png'
        ], 0.1, true, PlayerSpaceShip.PLAYER_WIDTH, PlayerSpaceShip.PLAYER_HEIGHT, { x: 0.5, y: 0.5 });

        this.playerSpaceShip.addState('invulnerable', [
            'spaceShips/friendly/Nairan/Destruction/PNGs/Nairan - Dreadnought -  Destruction.png~1/17.png',
            'spaceShips/friendly/Nairan/Weapons/PNGs/Nairan - Dreadnought - Weapons.png~1/19.png'
        ], 0.1, true, PlayerSpaceShip.PLAYER_WIDTH, PlayerSpaceShip.PLAYER_HEIGHT, { x: 0.5, y: 0.5 });

        this.playerSpaceShipEngineEffect = new StateAnimation();
        this.playerSpaceShipEngineEffect.addState('engineOn', [
            'spaceShips/friendly/Nairan/Engine Effects/PNGs/Nairan - Dreadnought - Engine.png~1/0.png',
            'spaceShips/friendly/Nairan/Engine Effects/PNGs/Nairan - Dreadnought - Engine.png~1/1.png',
            'spaceShips/friendly/Nairan/Engine Effects/PNGs/Nairan - Dreadnought - Engine.png~1/2.png',
            'spaceShips/friendly/Nairan/Engine Effects/PNGs/Nairan - Dreadnought - Engine.png~1/3.png',
            'spaceShips/friendly/Nairan/Engine Effects/PNGs/Nairan - Dreadnought - Engine.png~1/4.png',
            'spaceShips/friendly/Nairan/Engine Effects/PNGs/Nairan - Dreadnought - Engine.png~1/5.png',
            'spaceShips/friendly/Nairan/Engine Effects/PNGs/Nairan - Dreadnought - Engine.png~1/6.png',
            'spaceShips/friendly/Nairan/Engine Effects/PNGs/Nairan - Dreadnought - Engine.png~1/7.png'
        ], 0.1, true, PlayerSpaceShip.PLAYER_WIDTH, PlayerSpaceShip.PLAYER_HEIGHT, { x: 0.5, y: 0.4 });


        this.playerSpaceShipDamaged = new StateAnimation();
        this.playerSpaceShipDamaged.addState('damage', [
            'spaceShips/friendly/Nairan/Destruction/PNGs/Nairan - Dreadnought -  Destruction.png~1/09.png',
            'spaceShips/friendly/Nairan/Destruction/PNGs/Nairan - Dreadnought -  Destruction.png~1/10.png',
            'spaceShips/friendly/Nairan/Destruction/PNGs/Nairan - Dreadnought -  Destruction.png~1/11.png',

        ], 0.1, true, PlayerSpaceShip.PLAYER_WIDTH, PlayerSpaceShip.PLAYER_HEIGHT, { x: 0.5, y: 0.5 });


        this.hitBox = new Graphics();
        this.hitBox.beginFill(0xFF00FF, 0.3);
        this.hitBox.drawRect(0, 0, PlayerSpaceShip.PLAYER_WIDTH, PlayerSpaceShip.PLAYER_HEIGHT);
        this.hitBox.endFill();
        this.hitBox.position.x = this.playerSpaceShip.position.x - PlayerSpaceShip.PLAYER_WIDTH / 2;
        this.hitBox.position.y = this.playerSpaceShip.position.y - PlayerSpaceShip.PLAYER_HEIGHT / 2;


        this.addChild(this.hitBox);
        this.addChild(this.playerSpaceShip);
        this.addChild(this.playerSpaceShipDamaged);
        this.addChild(this.playerSpaceShipEngineEffect);

        this.playerSpaceShip.playState('idle', true);
        this.playerSpaceShipEngineEffect.playState('engineOn', true);
        this.playerSpaceShipDamaged.playState('damage', true);

        this.hitBox.visible = false;


        Keyboard.initialize();
        Keyboard.down.on("Space", () => this.handleShoot());
        Keyboard.up.on("Space", () => this.isShooting = false);
    }

    //Metodos
    public shoot() {
        const projectile = new Projectile();
        projectile.position.x = this.position.x;
        projectile.position.y = this.position.y - PlayerSpaceShip.PLAYER_HEIGHT / 2;
        this.parent.addChild(projectile);
        this.projectiles.push(projectile);
    }

    private handleShoot() {
        if (!this.isShooting) {
            this.shoot();
            this.isShooting = true;
        }
    }

    public selectAnimation(stateName: string, restartAnim: boolean) {
        this.playerSpaceShip.playState(stateName, restartAnim);
    }

    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.playerSpaceShip.update(deltaMS / (1000 / 60));
        this.playerSpaceShipEngineEffect.update(deltaMS / (1000 / 60));
        this.playerSpaceShipDamaged.update(deltaMS / (1000 / 60));

        for (const projectile of this.projectiles) {
            projectile.update(deltaMS);
        }

        this.speed.x = 0;
        this.speed.y = 0;

        //CONTROLS
        if (Keyboard.state.get("ArrowUp")) {
            this.speed.y = -PlayerSpaceShip.MOVE_SPEED;
        }
        if (Keyboard.state.get("ArrowRight")) {
            this.speed.x = PlayerSpaceShip.MOVE_SPEED;
        }
        if (Keyboard.state.get("ArrowLeft")) {
            this.speed.x = -PlayerSpaceShip.MOVE_SPEED;
        }

        if (this.speed.x !== 0 || this.speed.y !== 0) {
            this.playerSpaceShipEngineEffect.visible = true;
        } else {
            this.playerSpaceShipEngineEffect.visible = false;

        }

        if (this.isVulnerable == false) {
            this.playerSpaceShipDamaged.visible = true;
        } else {
            this.playerSpaceShipDamaged.visible = false;
        }
    }
    public getHitBox(): Rectangle {
        return this.hitBox.getBounds();
    }

    public shipCollisionDamage(){
        if(this.isVulnerable){
            this.HEALTH -= 25;
            this.isVulnerable = false;
            this.selectAnimation('invulnerable',  true);

            setTimeout(() => {
                this.isVulnerable = true;
                this.selectAnimation('idle',  true);
            }, 3000);
            }
    }
}
