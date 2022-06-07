import { Collider } from "../Components/Collider";
import { Transform } from "../Components/Transform";
import { EntityManager } from "../Managers/EntityManager";
import { System } from "../Core/System";

export class RenderingSystem implements System {
    public requiredComponentTypes: Type<any>[] = [Transform];
    public entityManager: EntityManager;
    public ctx: CanvasRenderingContext2D;

    constructor(entityManager: EntityManager, ctx: CanvasRenderingContext2D) {
        this.entityManager = entityManager;
        this.ctx = ctx;
    }

    onUpdate(dt: number): void {
        // Clear canvas
        const canvas = this.ctx.canvas;
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        const requiredEntities = this.entityManager.getAllWithComponentsOfTypes(this.requiredComponentTypes);
        requiredEntities.forEach((entity) => {
            const transform = this.entityManager.getComponent(entity, Transform)!;
            const collider = this.entityManager.getComponent(entity, Collider);

            this.ctx.font = "10px sans-serif";
            this.ctx.fillStyle = this.ctx.strokeStyle = collider?.isColliding
                ? "#ff0000"
                : "#00ff00";
            
            // Draw collision boxes
            if (collider) {
                this.ctx.strokeRect(transform.position.x + collider.offset.x, transform.position.y + collider.offset.y, collider.width, collider.height);
            }

            // Draw names
            const name = this.entityManager.nameFor(entity);
            if (name) {
                this.ctx.fillText(name, transform.position.x, transform.position.y - 5, 100);
            }
        });
    }
}