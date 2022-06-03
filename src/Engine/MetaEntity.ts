import { Entity } from "./Entity";
import { EntityManager } from "./EntityManager";

export class MetaEntity {
    public entity: Entity;
    public entityManager: EntityManager;

    constructor(entity: Entity, entityManager: EntityManager) {
        this.entity = entity;
        this.entityManager = entityManager;
    }
}