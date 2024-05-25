import {  Loader } from 'pixi.js';
import { assets } from './assets';
import { SceneManager } from './utils/SceneManager';
import { SceneStartMenu } from './scenes/sceneStartMenu';
import { WebfontLoaderPlugin } from 'pixi-webfont-loader';

Loader.registerPlugin(WebfontLoaderPlugin);


Loader.shared.add(assets);

Loader.shared.onComplete.add(() => {

	const myScene = new SceneStartMenu();

	SceneManager.initialize();

	SceneManager.changeScene(myScene);
});

Loader.shared.load();