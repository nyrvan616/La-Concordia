import { Container, TextStyle, Texture, TilingSprite, Text } from "pixi.js";
import { Button } from "../utils/Button";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { Level1 } from "./Level1";

export class VictoryScene extends SceneBase {
    private WIDTH = SceneManager.WIDTH;
    private HEIGHT = SceneManager.HEIGHT;
    private world: Container;
    private victoryMenuBackground: TilingSprite;
    private restartGameSection: Container;
    private restartGameBTN: Button;
    private restartGameTextBox: TilingSprite;

    constructor() {
        super();
        
        this.world = new Container();
        this.world.position.set(0);

        //Background
        this.victoryMenuBackground = new TilingSprite(
            Texture.from('UI/background/Window.png'),
            this.WIDTH,
            this.HEIGHT
        );
        this.victoryMenuBackground.position = this.world.position;

        //START GAME BUTTON
        this.restartGameSection = new Container();
        this.restartGameSection.x = this.victoryMenuBackground.width/4;
        this.restartGameSection.y = this.victoryMenuBackground.height/4;

        this.restartGameTextBox = new TilingSprite(
            Texture.from('UI/textBox/Table_02.png'),
            321,
            100
        );
        this.restartGameTextBox.scale.set(2);
        this.restartGameTextBox.anchor.set(0.5);
        this.restartGameTextBox.position = this.restartGameSection.position;
        
        this.restartGameBTN = new Button(
            Texture.from('UI/buttons/Inactive/Ok_BTN.png'),
            Texture.from('UI/buttons/Active/Ok_BTN.png'),
            Texture.from('UI/buttons/Active/Ok_BTN.png'),
            goToGame
        );
        this.restartGameBTN.pivot.set(0.5);
        this.restartGameBTN.position.set(this.restartGameTextBox.position.x/8, this.restartGameTextBox.y);
        this.restartGameBTN.width =  this.restartGameTextBox.height * 1.2;
        this.restartGameBTN.height = this.restartGameTextBox.height * 1.2;

        const textStyle = new TextStyle({
            fill: "#ffffff",
            fontFamily: "Block Stock",
            fontSize: 60
        });

        const restartGameText = new Text("Retry?", textStyle);
        
        restartGameText.anchor.set(0.5);
        restartGameText.position.x = this.restartGameBTN.x + restartGameText.width/2 + this.restartGameBTN.width * 0.75;
        restartGameText.position.y = this.restartGameBTN.y;

        const defeatText = new Text("You Win!", textStyle);
        defeatText.anchor.set(0.5);
        defeatText.position.x = SceneManager.WIDTH/4;
        defeatText.position.y = restartGameText.y - 150;

        this.restartGameSection.addChild(defeatText, this.restartGameSection, this.restartGameTextBox, this.restartGameBTN, restartGameText)
        this.world.addChild(this.victoryMenuBackground, this.restartGameSection);
        this.addChild(this.world);    
    }
    
    public update(): void {
    }

}

function goToGame(){
    SceneManager.changeScene(new Level1());
}
