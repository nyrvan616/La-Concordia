import { AnimatedSprite, Container, Texture } from "pixi.js";

export class StateAnimation extends Container
{
    private states: Map<string, AnimatedSprite> = new Map();
    private animContainer: Container = new Container();

    constructor() {
        super();
        this.addChild(this.animContainer);
    }

    public addState(stateName: string, frames: Texture[] | string[], animationSpeed: number, loop: boolean, width?: number, height?: number, anchor?: {x: number, y: number}) {
        const texArray:Texture[] = [];
        for (const tex of frames) {
            if (typeof tex == 'string') {
                texArray.push(Texture.from(tex));
            } else {
                texArray.push(tex);
            }
        }

        const tempAnim: AnimatedSprite = new AnimatedSprite(texArray);
        tempAnim.animationSpeed = animationSpeed;
        tempAnim.loop = loop;
        tempAnim.play();
        if (width) {
            tempAnim.width = width;
        };
        if (height) {
            tempAnim.height = height;
        };
        if (anchor) {
            tempAnim.anchor.set(anchor.x, anchor.y);
        };
        this.states.set(stateName, tempAnim);
    }

    public playState(stateName: string, restartAnim:boolean) {
        this.animContainer.removeChildren();
        const currentState = this.states.get(stateName);
        if (currentState) {
            this.animContainer.addChild(currentState);
            if (restartAnim) {
                currentState.gotoAndPlay(0);
            }
        } else {
            console.error(`State ${stateName} not found`);
        }
    }

    

    public update (frames:number){
        for (const state of this.states.values()) {
            state.update(frames);
        }
    }
}
