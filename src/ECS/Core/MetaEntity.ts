import { EntityManager } from "../Managers/EntityManager";
import { Component } from "./Component";

/** Class representing an entity and its relationships */
export class MetaEntity {
    public entity: string;
    public entityManager: EntityManager;

    /** Creates a new `MetaEntity` instance */
    constructor(entity: string, entityManager: EntityManager) {
        this.entity = entity;
        this.entityManager = entityManager;
    }

    /**
     * Adds a component to the entity
     * @param component - The component to be added to the entity
     * @returns The `Component` that was added to the entity
     */
    public addComponent<T extends Component>(component: T): T {
        return this.entityManager.addComponent(this.entity, component);
    }

    /**
     * Removes a component from the entity
     * @param component - The component to be removed from the entity
     * @returns `true` if the component existed on the entity and has been
     *      removed, or `false` if the entity or component does not exist
     */
    public removeComponent<T extends Component>(component: T): boolean {
        return this.entityManager.removeComponent(this.entity, component);
    }
}