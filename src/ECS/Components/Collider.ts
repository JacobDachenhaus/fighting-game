import { Component } from "../Core/Component";

export interface TransformOptions {
    width: number;
    height: number;
    offset: Vec2;
    isColliding: boolean;
}

export class Collider extends Component {
    public width: number;
    public height: number;
    public offset: Vec2;
    public isColliding: boolean;

    constructor({ width, height, offset, isColliding }: TransformOptions) {
        super();
        this.width = width;
        this.height = height;
        this.offset = offset;
        this.isColliding = isColliding;
    }
}