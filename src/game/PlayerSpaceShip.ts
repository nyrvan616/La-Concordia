import { Graphics } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { PhysicsContainer } from "./PhysicsContainer";
import { StateAnimation } from "./StateAnimation";


export class PlayerSpaceShip extends PhysicsContainer {
    private static readonly MOVE_SPEED = 350;
    private static readonly PLAYER_WIDTH = 128;
    private static readonly PLAYER_HEIGHT = 128;
    private playerSpaceShip: StateAnimation;
    private playerSpaceShipEngineEffect: StateAnimation;
    private hitBox: Graphics;


    constructor() {
        super();

        this.playerSpaceShip = new StateAnimation();
        this.playerSpaceShip.addState('idle', [
            'spaceShips/friendly/Nairan/Designs - Base/PNGs/Nairan - Dreadnought - Base.png'
        ], 0.1, true, PlayerSpaceShip.PLAYER_WIDTH, PlayerSpaceShip.PLAYER_HEIGHT, { x: 0.5, y: 0.5 });
        this.hitBox = new Graphics();
        this.hitBox.beginFill(0xFF00FF, 0.3);
        this.hitBox.drawRect(0, 0, PlayerSpaceShip.PLAYER_WIDTH, PlayerSpaceShip.PLAYER_HEIGHT);
        this.hitBox.endFill();
        this.hitBox.position.x = this.playerSpaceShip.position.x - PlayerSpaceShip.PLAYER_WIDTH / 2;
        this.hitBox.position.y = this.playerSpaceShip.position.y - PlayerSpaceShip.PLAYER_HEIGHT / 2;

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

        this.addChild(this.playerSpaceShipEngineEffect);
    

        this.addChild(this.hitBox);
        this.addChild(this.playerSpaceShip);
        this.playerSpaceShip.playState('idle', true);
        this.playerSpaceShipEngineEffect.playState('engineOn', true);
    }

    public override update(deltaMS: number) {

        super.update(deltaMS / 1000);
        this.playerSpaceShip.update(deltaMS / (1000 / 60));
        this.playerSpaceShipEngineEffect.update(deltaMS / (1000 / 60));

        this.speed.x = 0;
        this.speed.y = 0;

        switch (true) {
            case Keyboard.state.get("ArrowUp"):
                this.speed.y = -PlayerSpaceShip.MOVE_SPEED;
                break;
            case Keyboard.state.get("ArrowDown"):
                this.speed.y = PlayerSpaceShip.MOVE_SPEED;
                break;
            case Keyboard.state.get("ArrowRight"):
                this.speed.x = PlayerSpaceShip.MOVE_SPEED;
                break;
            case Keyboard.state.get("ArrowLeft"):
                this.speed.x = -PlayerSpaceShip.MOVE_SPEED;
                break;
            default:
                this.speed.x = 0;
        }

        if (this.speed.x !== 0 || this.speed.y !== 0) {
            this.playerSpaceShipEngineEffect.visible = true;
        } else {
            console.log("Velocidad = 0, la animacion se detiene", this.speed);
            this.playerSpaceShipEngineEffect.visible = false;

        }
    }

}