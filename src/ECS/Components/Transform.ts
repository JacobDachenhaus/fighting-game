import { Component } from "../Core/Component";

export interface TransformOptions {
    position: Vec2;
}

export class Transform extends Component {
    public position: Vec2;

    constructor({ position }: TransformOptions) {
        super();
        this.position = position;
    }
}