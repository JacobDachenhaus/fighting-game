import { EntityManager } from "../Managers/EntityManager";

/** Interface representing a system */
export interface System {
    /** An `Array` of component types required to perform updates */
    requiredComponentTypes: Type<any>[];

    /** The `EntityManager` tied to this system */
    entityManager: EntityManager;

    /**
     * Performs updates for the system
     * @param dt The time between now and the last update
     */
    onUpdate(dt: number): void;
}