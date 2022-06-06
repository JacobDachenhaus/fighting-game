import { Component } from "../Core/Component";

export interface ITransformData {
    x: number;
    y: number;
}

export class Transform extends Component {
    public x: number;
    public y: number;

    constructor(data: ITransformData) {
        super();
        this.x = data.x;
        this.y = data.y;
    }
}