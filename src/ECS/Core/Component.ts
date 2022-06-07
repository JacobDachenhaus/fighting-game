/**
 * Class used for checking types and inheritance of `Component` children
 * @abstract
 **/
export abstract class Component {
    public getClass(): Type<this> {
        return this.constructor as Type<this>;
    }
}