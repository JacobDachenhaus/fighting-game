import { Component } from "../Core/Component";

export interface ISpriteData {
    src: string;
}

export class Sprite extends Component {
    public image: HTMLImageElement;

    constructor(data: ISpriteData) {
        super();
        this.image = new Image();
        this.image.src = data.src;
    }
}