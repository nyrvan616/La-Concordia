import { Container, TextStyle, Texture, TilingSprite, Text } from "pixi.js";
import { Button } from "../utils/Button";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { Level1 } from "./Level1";

export class StartMenuScene extends SceneBase {
    private WIDTH = SceneManager.WIDTH;
    private HEIGHT = SceneManager.HEIGHT;
    private world: Container;
    private startMenuBackground: TilingSprite;
    private startGameSection: Container;
    private startGameBTN: Button;
    private startGameTextBox: TilingSprite;

    constructor() {
        super();

        this.world = new Container();
        this.world.position.set(0);

        //Background
        this.startMenuBackground = new TilingSprite(
            Texture.from('UI/background/Window.png'),
            this.WIDTH,
            this.HEIGHT
        );
        this.startMenuBackground.position = this.world.position;

        //START GAME BUTTON
        this.startGameSection = new Container();
        this.startGameSection.x = this.startMenuBackground.width / 4;
        this.startGameSection.y = this.startMenuBackground.height / 4;

        this.startGameTextBox = new TilingSprite(
            Texture.from('UI/textBox/Table_02.png'),
            321,
            100
        );
        this.startGameTextBox.scale.set(2);
        this.startGameTextBox.anchor.set(0.5);
        this.startGameTextBox.position = this.startGameSection.position;

        this.startGameBTN = new Button(
            Texture.from('UI/buttons/Inactive/Play_BTN.png'),
            Texture.from('UI/buttons/Active/Play_BTN.png'),
            Texture.from('UI/buttons/Active/Play_BTN.png'),
            goToGame
        );
        this.startGameBTN.pivot.set(0.5);
        this.startGameBTN.position.set(this.startGameTextBox.position.x / 8, this.startGameTextBox.y);
        this.startGameBTN.width = this.startGameTextBox.height * 1.2;
        this.startGameBTN.height = this.startGameTextBox.height * 1.2;

        const textStyle = new TextStyle({
            fill: "#ffffff",
            fontFamily: "Block Stock",
            fontSize: 70
        });

        const startGameText = new Text("Start", textStyle);

        startGameText.anchor.set(0.5);
        startGameText.position.x = this.startGameBTN.x + startGameText.width / 2 + this.startGameBTN.width * 0.75;
        startGameText.position.y = this.startGameBTN.y;

        this.startGameSection.addChild(this.startGameSection, this.startGameTextBox, this.startGameBTN, startGameText)
        this.world.addChild(this.startMenuBackground, this.startGameSection);
        this.addChild(this.world);
    }

    public update(): void {
    }

}

function goToGame() {
    SceneManager.changeScene(new Level1());
}
