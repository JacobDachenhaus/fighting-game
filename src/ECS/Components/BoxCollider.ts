import { Component } from "../Core/Component";

export interface IBoxColliderData {
    width: number;
    height: number;
}

export class BoxCollider extends Component {
    public width: number;
    public height: number;

    constructor(data: IBoxColliderData) {
        super();
        this.width = data.width;
        this.height = data.height;
    }
}