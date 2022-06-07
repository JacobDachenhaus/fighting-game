import { Component } from "../Core/Component";

export interface PlayerInputOptions {
    moveUp: string;
    moveDown: string;
    moveLeft: string;
    moveRight: string;
}

export class PlayerInput extends Component {
    public moveUp: string;
    public moveDown: string;
    public moveLeft: string;
    public moveRight: string;

    constructor({ moveUp, moveDown, moveLeft, moveRight }: PlayerInputOptions) {
        super();
        this.moveUp = moveUp;
        this.moveDown = moveDown;
        this.moveLeft = moveLeft;
        this.moveRight = moveRight;
    }
}