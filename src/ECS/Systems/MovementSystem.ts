import { Movement } from "../Components/Movement";
import { Transform } from "../Components/Transform";
import { EntityManager } from "../Managers/EntityManager";
import { System } from "../Core/System";

export class MovementSystem implements System {
    public requiredComponentTypes: Type<any>[] = [Movement, Transform];
    public entityManager: EntityManager;

    constructor(entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    onUpdate(dt: number): void {
        const requiredEntities = this.entityManager.getAllWithComponentsOfTypes(this.requiredComponentTypes);
        requiredEntities.forEach((entity) => {
            const movement = this.entityManager.getComponent(entity, Movement)!;
            const transform = this.entityManager.getComponent(entity, Transform)!;

            transform.position.x += (movement.velocity.x * movement.direction.x / 2) * dt;
            transform.position.y += (movement.velocity.y * movement.direction.y / 2) * dt;
        });
    }
}