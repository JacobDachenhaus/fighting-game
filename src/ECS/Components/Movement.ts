import { Component } from "../Core/Component";

export interface MovementOptions {
    direction: Vec2;
    velocity: Vec2;
}

export class Movement extends Component {
    public direction: Vec2;
    public velocity: Vec2;

    constructor({ direction, velocity }: MovementOptions) {
        super();
        this.direction = direction;
        this.velocity = velocity;
    }
}