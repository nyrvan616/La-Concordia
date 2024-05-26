import { Graphics, Rectangle } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { StateAnimation } from "./StateAnimation";


export class Projectile extends PhysicsContainer {
    private static readonly MOVE_SPEED = 500;
    private static readonly WIDTH = 9;
    private static readonly HEIGHT = 16;
    public damage = 25;

    private projectile: StateAnimation;
    private hitBox: Graphics;


    constructor() {
        super();

        this.projectile = new StateAnimation();
        this.projectile.addState('projectile', [
            'spaceShips/friendly/Nairan/Weapon Effects - Projectiles/PNGs/Nairan - Rocket.png~1/0.png',
            'spaceShips/friendly/Nairan/Weapon Effects - Projectiles/PNGs/Nairan - Rocket.png~1/1.png',
            'spaceShips/friendly/Nairan/Weapon Effects - Projectiles/PNGs/Nairan - Rocket.png~1/2.png',
            'spaceShips/friendly/Nairan/Weapon Effects - Projectiles/PNGs/Nairan - Rocket.png~1/3.png'
        ], 0.1, true, Projectile.WIDTH, Projectile.HEIGHT, { x: 0.5, y: 0.5 });
        this.projectile.scale.set(3);

        this.hitBox = new Graphics();
        this.hitBox.beginFill(0xFFFF00, 0.3);
        this.hitBox.drawRect(0, 0, Projectile.WIDTH, Projectile.HEIGHT);
        this.hitBox.endFill();
        this.hitBox.position.x = this.projectile.position.x - Projectile.WIDTH / 2;
        this.hitBox.position.y = this.projectile.position.y - Projectile.HEIGHT / 2;


    

        this.addChild(this.hitBox);
        this.addChild(this.projectile);
        this.projectile.playState('projectile', true);
    }

    public override update(deltaMS: number) {

        super.update(deltaMS / 1000);
        this.projectile.update(deltaMS / (1000 / 60));

        this.speed.y -= Projectile.MOVE_SPEED * (deltaMS / 1000);
    }

    public getHitBox(): Rectangle {
        return this.hitBox.getBounds();
    }

}