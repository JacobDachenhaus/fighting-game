import { Class } from "./Class";

export class Component {
    getClass(): Class<this> {
        return this.constructor as Class<this>;
    }
}