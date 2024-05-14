import {  Loader } from 'pixi.js';
import { assets } from './assets';
import { MenuScene } from './scenes/MenuScene';
import { SceneManager } from './utils/SceneManager';

Loader.shared.add(assets);

Loader.shared.onComplete.add(() => {

	//const myScene = new SceneTest();
	const myScene = new MenuScene();

	SceneManager.initialize();

	SceneManager.changeScene(myScene);
});

Loader.shared.load();