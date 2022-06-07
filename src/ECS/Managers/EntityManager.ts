// http://entity-systems.wikidot.com/rdbms-with-code-in-systems
// http://entity-systems.wikidot.com/rdbms-beta
import { v4 as uuidv4 } from "uuid";
import { Component } from "../Core/Component";
import { MetaEntity } from "../Core/MetaEntity";

/** Class that manages the relationships between entities and components */
export class EntityManager {
    public allEntities: Set<string> = new Set();
    public humanReadableNames: Map<string, string> = new Map();
    public componentStores: Map<Type<any>, Map<string, Component>> = new Map();

    /**
     * Creates a new entity
     * @param name - The human-readable `name` for this entity
     * @returns The new entity
     */
    public createEntity(name?: string): string {
        const entity = uuidv4();

        if (name) {
            this.humanReadableNames.set(entity, name);
        }

        return this.allEntities.add(entity) && entity;
    }

    /**
     * Creates a new MetaEntity instance
     * @param name - The human-readable `name` for this entity
     * @returns The new `MetaEntity`
     */
    public createMetaEntity(name?: string): MetaEntity {
        return new MetaEntity(this.createEntity(name), this);
    }

    /**
     * Gets the human-readable name for a specified entity
     * @param entity The entity
     * @returns The `name` for the specified entity
     */
    public nameFor(entity: string): string | undefined {
        const name = this.humanReadableNames.get(entity);

        if (!name) {
            return undefined;
        }

        return name;
    }

    /**
     * Adds a component to an entity
     * @param entity - The entity
     * @param component - The component to be added to the entity
     * @returns The `Component` that was added to the entity
     */
    public addComponent<T extends Component>(entity: string, component: T): T {
        let store = this.componentStores.get(component.getClass());

        if (!store) {
            store = new Map();
            this.componentStores.set(component.getClass(), store);
        }

        store.set(entity, component);
        return component;
    }

    /**
     * Removes a component from an entity
     * @param entity - The entity
     * @param component - The component to be removed from the entity
     * @returns `true` if the component existed on the entity and has been
     *      removed, or `false` if the entity or component does not exist
     */
    public removeComponent<T extends Component>(entity: string, component: T): boolean {
        const store = this.componentStores.get(component.getClass());

        if (!store) {
            return false; // No components of this type have been stored
        }

        return store.delete(entity);
    }

    /**
     * Checks if an entity has a component of the specified type
     * @param entity - The entity
     * @param type - The component type to check for
     * @returns `true` if the component existed on the entity, or `false` if the
     *      entity or component does not exist
     */
    public hasComponentType<T extends Component>(entity: string, type: Type<T>): boolean {
        const store = this.componentStores.get(type);

        if (!store) {
            return false; // No components of this type have been stored
        }

        return store.has(entity);
    }

    /**
     * Checks if an entity has components of the specified types
     * @param entity - The entity
     * @param types - The component types to check for
     * @returns `true` if the components existed on the entity, or `false` if the
     *      entity or components do not exist
     */
    public hasComponentTypes(entity: string, types: Type<any>[]): boolean {
        if (types.length === 0) {
            return true; // No types provided, defaults to `true`
        }

        return types.every((type) => {
            return this.hasComponentType(entity, type);
        });
    }

    /**
     * Gets all entities with a component of the specified type
     * @param type - The component type
     * @returns An `Array` of entities with a component of the specified type
     */
    public getAllWithComponentType<T extends Component>(type: Type<T>): string[] {
        const store = this.componentStores.get(type);

        if (!store) {
            return []; // No components of this type have been stored
        }
        
        return Array.from(store.keys());
    }

    /**
     * Gets all entities with components of the specified types
     * @param types - The component types
     * @returns An `Array` of entities with components of the specified types
     */
    public getAllWithComponentsOfTypes(types: Type<any>[]): string[] {
        const arr = Array.from(this.allEntities);
        
        if (types.length === 0) {
            return arr; // No types provided, defaults to an `Array` containing all entities
        }

        return arr.filter((entity) => {
            return this.hasComponentTypes(entity, types);
        });
    }

    /**
     * Gets the component of a specified type from an entity
     * @param entity - The entity
     * @param type - The component type
     * @returns The `Component` of the specified type, or `undefined` if it does
     *      not exist
     */
    public getComponent<T extends Component>(entity: string, type: Type<T>): T | undefined {
        const store = this.componentStores.get(type);

        if (!store) {
            return undefined;
        }

        const component = store.get(entity);

        if (!component) {
            return undefined;
        }

        return component as T;
    }
}