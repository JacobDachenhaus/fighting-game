import { Moveable } from "../Components/Moveable";
import { Physics } from "../Components/Physics";
import { Transform } from "../Components/Transform";
import { ISystem } from "../Core/System";
import { EntityManager } from "../Managers/EntityManager";

export class PhysicsSystem implements ISystem {
    public entityManager: EntityManager;
    public gravity: number;

    constructor(entityManager: EntityManager) {
        this.entityManager = entityManager;
        this.gravity = 10;
    }

    public processOneGameTick(dt: number): void {
        const moveableEntities = this.entityManager.getAllEntitiesPosessingComponent(Moveable);
        moveableEntities.forEach((entity) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            const physics = this.entityManager.getComponent(entity, Physics);

            transform.x += physics.mass * physics.velocityX * dt;
            transform.y += physics.mass * (physics.velocityY + this.gravity * physics.gravityScale) * dt;
        });
    }
}