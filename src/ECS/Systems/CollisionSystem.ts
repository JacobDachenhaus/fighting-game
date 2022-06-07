import { Collider } from "../Components/Collider";
import { Transform } from "../Components/Transform";
import { EntityManager } from "../Managers/EntityManager";
import { System } from "../Core/System";

export interface Rect {
    xMin: number,
    yMin: number,
    xMax: number,
    yMax: number
}

export class CollisionSystem implements System {
    public requiredComponentTypes: Type<any>[] = [Collider, Transform];
    public entityManager: EntityManager;

    constructor(entityManager: EntityManager) {
        this.entityManager = entityManager;
    }

    public onUpdate(dt: number): void {
        const requiredEntities = this.entityManager.getAllWithComponentsOfTypes(this.requiredComponentTypes);

        requiredEntities.forEach((entity, index, arr) => {
            const collider = this.entityManager.getComponent(entity, Collider)!;
            const testAgainst = arr.filter((v) => v !== entity);

            if (this.testCollisions(entity, testAgainst)) {
                collider.isColliding = true;
            } else {
                collider.isColliding = false;
            }
        });
    }

    public testCollisions(entity: string, testAgainst: string[]): boolean {
        const a = this.getRect(entity);

        return testAgainst.every((testEntity) => {
            const b = this.getRect(testEntity);
            return this.aabb(a, b);
        });
    }

    public getRect(entity: string): Rect {
        const transform = this.entityManager.getComponent(entity, Transform)!;
        const collider = this.entityManager.getComponent(entity, Collider)!;

        return {
            xMin: transform.position.x,
            xMax: transform.position.x + collider.width,
            yMin: transform.position.y,
            yMax: transform.position.y + collider.height
        };
    }

    public aabb(a: Rect, b: Rect): boolean {
        return a.xMin < b.xMax
            && a.xMax > b.xMin
            && a.yMin < b.yMax
            && a.yMax > b.yMin;
    }
}