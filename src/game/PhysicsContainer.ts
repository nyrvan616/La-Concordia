import { Container, Point } from 'pixi.js';

export class PhysicsContainer extends Container {
    public speed: Point = new Point;
    public acceleration: Point = new Point;

    public update(deltaSeconds: number) {
        this.position.x += this.speed.x * deltaSeconds;
        this.position.y += this.speed.y * deltaSeconds;
    };
}