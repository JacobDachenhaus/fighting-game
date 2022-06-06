import { ISystem } from "../Core/System";
import { EntityManager } from "../Managers/EntityManager";

export class CollisionSystem implements ISystem {
    public entityManager: EntityManager;

    constructor(entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    public processOneGameTick(dt: number): void {
        // TODO
    }
}