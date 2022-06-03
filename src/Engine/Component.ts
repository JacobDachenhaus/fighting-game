import { ComponentType } from "./ComponentType";

export class Component {
    getComponentType(): ComponentType {
        return this.constructor.name;
    }
}