// http://entity-systems.wikidot.com/rdbms-with-code-in-systems
// http://entity-systems.wikidot.com/rdbms-beta
import { v4 as uuidv4 } from "uuid";
import { Component } from "./Component";
import { ComponentType } from "./ComponentType";
import { Entity } from "./Entity";

export class EntityManager {
    public frozen: boolean;
    public allEntities: Set<Entity>;
    public componentStores: Map<ComponentType, Map<Entity, Component>>;

    constructor() {
        this.frozen = false;
        this.allEntities = new Set();
        this.componentStores = new Map();
    }

    public getComponent(entity: Entity, componentType: ComponentType): Component {
        const store = this.componentStores.get(componentType);

        if (!store) {
            throw new Error();
        }

        const result = store.get(entity);

        if (!result) {
            throw new Error();
        }

        return result;
    }

    public removeComponent(entity: Entity, component: Component): void {
        if (this.frozen) {
            throw new Error();
        }

        const store = this.componentStores.get(component.getComponentType());

        if (!store) {
            throw new Error();
        }

        const result = store.delete(entity);

        if (!result) {
            throw new Error();
        }
    }

    public hasComponent(entity: Entity, component: Component): boolean {
        const store = this.componentStores.get(component.getComponentType());

        if (!store) {
            return false;
        }

        return store.has(entity);
    }

    public getAllComponentsOnEntity(entity: Entity): Component[] {
        const components: Component[] = [];

        for (const store of this.componentStores.values()) {
            const component = store.get(entity);

            if (component) {
                components.push(component);
            }
        }

        return components;
    }

    public getAllComponentsOfType(componentType: ComponentType): Component[] {
        const store = this.componentStores.get(componentType);

        if (!store) {
            return [];
        }

        return Array.from(store.values());
    }

    public getAllEntitiesPosessingComponent(componentType: ComponentType): Entity[] {
        const store = this.componentStores.get(componentType);

        if (!store) {
            return [];
        }

        return Array.from(store.keys());
    }

    public addComponent(entity: Entity, component: Component): void {
        if (this.frozen) {
            throw new Error();
        }

        let store = this.componentStores.get(component.getComponentType());

        if (!store) {
            store = new Map();
            this.componentStores.set(component.getComponentType(), store);
        }

        store.set(entity, component);
    }

    public createEntity(): Entity {
        if (this.frozen) {
            throw new Error();
        }

        const uuid: string = uuidv4();
        this.allEntities.add(uuid);

        return uuid;
    }

    public killEntity(entity: Entity): void {
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