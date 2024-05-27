import { Container, Sprite, Texture } from "pixi.js";

export class Button extends Container {
    private def: Texture;
    private down: Texture;
    private over: Texture;
    private callback: Function;
    private spr: Sprite;

    constructor(def: Texture, down: Texture, over: Texture, callback: Function) {
        super();

        this.def = def;
        this.down = down;
        this.over = over;
        this.callback = callback;

        this.spr = Sprite.from(def);
        this.spr.anchor.set(0.5);
        this.addChild(this.spr);

        this.spr.interactive = true;
        this.spr.on("mousedown", this.onMouseDown, this);
        this.spr.on("mouseup", this.onMouseUp, this);
        this.spr.on("mouseover", this.onMouseOver, this);
        this.spr.on("mouseout", this.onMouseOut, this);

    }

    private onMouseDown() {
        this.spr.texture = this.down;
    };

    private onMouseUp() {
        this.callback();
        this.spr.texture = this.over;
    };

    private onMouseOver() {
        this.spr.texture = this.over;
    };

    private onMouseOut() {
        this.spr.texture = this.def;
    };
}