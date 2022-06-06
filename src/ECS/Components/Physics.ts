import { Component } from "../Core/Component";

export interface IPhysicsData {
    mass: number;
    velocityX: number;
    velocityY: number;
    gravityScale: number;
}

export class Physics extends Component {
    public mass: number;
    public velocityX: number;
    public velocityY: number;
    public gravityScale: number;

    constructor(data: IPhysicsData) {
        super();
        this.mass = data.mass;
        this.velocityX = data.velocityX;
        this.velocityY = data.velocityY;
        this.gravityScale = data.gravityScale;
    }
}