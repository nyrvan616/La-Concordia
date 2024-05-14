import { Application, Ticker } from "pixi.js";
import { Keyboard } from "./Keyboard";
import { SceneBase } from "./SceneBase";
import { Group } from "tweedle.js";

export namespace SceneManager {
    export const WIDTH = 1920;
    export const HEIGHT = 1080;
    let currentScene: SceneBase;
    let app: Application;

    export function initialize() {
        if (app != undefined) {
            console.log("SceneManager already initialized");
            return;
        }

        app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x6495ed,
            width: WIDTH,
            height: HEIGHT
        });

        Keyboard.initialize();

        window.addEventListener("resize", () => {
            //Calcular valores de Escala
            const scaleX = window.innerWidth / app.screen.width;
            const scaleY = window.innerHeight / app.screen.height;
            const scale = Math.min(scaleX, scaleY);

            //Calcular Tamaño del juego
            const gameWidth = Math.round(app.screen.width * scale);
            const gameHeight = Math.round(app.screen.height * scale);

            //Calcular el margen del juego
            const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
            const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

            //Tamaño Pantalla (Responsive) 
            app.view.style.width = gameWidth + "px";
            app.view.style.height = gameHeight + "px";

            //Agregar margenes
            app.view.style.marginLeft = marginHorizontal.toString() + "px";
            app.view.style.marginRight = marginHorizontal.toString() + "px";

            app.view.style.marginTop = marginVertical.toString() + "px";
            app.view.style.marginBottom = marginVertical.toString() + "px";

        });
        window.dispatchEvent(new Event("resize"));

        Ticker.shared.add(update);
    }

    export function changeScene(newScene: SceneBase) {
        if (currentScene) {
            currentScene.destroy();
        }
        currentScene = newScene;
        app.stage.addChild(currentScene);

    }

    function update(deltaFrame: number) {
        Group.shared.update();
        currentScene?.update(Ticker.shared.elapsedMS, deltaFrame);
    }
}