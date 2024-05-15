import { Rectangle } from "pixi.js";

export interface IHitbox {
    getHitbox():Rectangle;
}

export function checkCollision(objA:IHitbox, objB:IHitbox):Rectangle | null {
    const rA = objA.getHitbox();
    const rB = objB.getHitbox();

    const rightMostLeft = rA.left < rB.left ? rB.left : rA.left;
    const leftMostRight = rA.right > rB.right ? rB.right : rA.right;
    const bottomMostTop = rA.top < rB.top ? rB.top : rA.top;
    const topMostBottom = rA.bottom > rB.bottom ? rB.bottom : rA.bottom;

    //"makes sense" significa que izquierda es izquierda y derecha es derecha
    const makesSenseHorizontal = rightMostLeft < leftMostRight;
    const makesSenseVertical = bottomMostTop < topMostBottom;
    if (makesSenseHorizontal && makesSenseVertical){
        const retval = new Rectangle();
        retval.x = rightMostLeft;
        retval.y = bottomMostTop;
        retval.width = leftMostRight - rightMostLeft;
        retval.height = topMostBottom - bottomMostTop;
        return retval;
    } else {
        return null;
    }
}