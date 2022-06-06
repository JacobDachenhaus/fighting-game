// http://entity-systems.wikidot.com/rdbms-with-code-in-systems
// http://entity-systems.wikidot.com/rdbms-beta
import { v4 as uuidv4 } from "uuid";
import { Class } from "../Core/Class";
import { Component } from "../Core/Component";

export class EntityManager {
    public frozen: boolean;
    public allEntities: Set<string>;
    public entityHumanReadableNames: Map<string, string>;
    public componentStores: Map<Class<any>, Map<string, Component>>;

    constructor() {
        this.frozen = false;
        this.allEntities = new Set();
        this.entityHumanReadableNames = new Map();
        this.componentStores = new Map();
    }

    public getComponent<T extends Component>(entity: string, componentType: Class<T>): T {
        const store = this.componentStores.get(componentType);

        if (!store) {
            throw new Error();
        }

        const result = store.get(entity);

        if (!result) {
            throw new Error();
        }

        return result as T;
    }

    public removeComponent<T extends Component>(entity: string, component: T): void {
        if (this.frozen) {
            throw new Error();
        }

        const store = this.componentStores.get(component.getClass());

        if (!store) {
            throw new Error();
        }

        const result = store.delete(entity);

        if (!result) {
            throw new Error();
        }
    }

    public hasComponent<T extends Component>(entity: string, component: T): boolean {
        const store = this.componentStores.get(component.getClass());

        if (!store) {
            return false;
        }

        return store.has(entity);
    }

    public getAllComponentsOnEntity(entity: string): Component[] {
        const components: Component[] = [];

        for (const store of this.componentStores.values()) {
            const component = store.get(entity);

            if (component) {
                components.push(component);
            }
        }

        return components;
    }

    public getAllComponentsOfType<T extends Component>(componentType: Class<T>): T[] {
        const store = this.componentStores.get(componentType);

        if (!store) {
            return [];
        }

        return Array.from(store.values()) as T[];
    }

    public getAllEntitiesPosessingComponent<T extends Component>(componentType: Class<T>): string[] {
        const store = this.componentStores.get(componentType);

        if (!store) {
            return [];
        }

        return Array.from(store.keys());
    }

    public addComponent<T extends Component>(entity: string, component: T): void {
        if (this.frozen) {
            throw new Error();
        }

        let store = this.componentStores.get(component.getClass());

        if (!store) {
            store = new Map();
            this.componentStores.set(component.getClass(), store);
        }

        store.set(entity, component);
    }

    public createEntity(name?: string): string {
        if (this.frozen) {
            throw new Error();
        }

        const entity: string = uuidv4();
        this.allEntities.add(entity);

        if (name) {
            this.entityHumanReadableNames.set(entity, name);
        }

        return entity;
    }

    public setEntityName(entity: string, name: string): void {
        this.entityHumanReadableNames.set(entity, name);
    }

    public nameFor(entity: string): string {
        const name = this.entityHumanReadableNames.get(entity);

        if (!name) {
            throw new Error();
        }

        return name;
    }

    public killEntity(entity: string): void {
        if (this.frozen) {
            throw new Error();
        }

        for (const componentStore of this.componentStores.values()) {
            componentStore.delete(entity);
        }

        this.allEntities.delete(entity);
    }

    public freeze(): void {
        this.frozen = true;
    }

    public unFreeze(): void {
        this.frozen = false;
    }
}