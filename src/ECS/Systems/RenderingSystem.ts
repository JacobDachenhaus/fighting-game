import { Transform } from "../Components/Transform";
import { Renderable } from "../Components/Renderable";
import { EntityManager } from "../Managers/EntityManager";
import { ISystem } from "../Core/System";
import { BoxCollider } from "../Components/BoxCollider";
import { Sprite } from "../Components/Sprite";

export enum Colors {
    BLACK = "#000",
    RED = "#ff0000",
    GREEN = "#00ff00",
    BLUE = "#0000ff"
}

export class RenderingSystem implements ISystem {
    public entityManager: EntityManager;
    public ctx: CanvasRenderingContext2D;

    constructor(entityManager: EntityManager, ctx: CanvasRenderingContext2D) {
        this.entityManager = entityManager;
        this.ctx = ctx;
    }

    public processOneGameTick(dt: number): void {
        const canvas = this.ctx.canvas;

        // Clear canvas
        this.ctx.fillStyle = Colors.BLACK;
        this.ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        const renderableEntities = this.entityManager.getAllEntitiesPosessingComponent(Renderable);
        renderableEntities.forEach((entity) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            const sprite = this.entityManager.getComponent(entity, Sprite);
            const boxCollider = this.entityManager.getComponent(entity, BoxCollider);

            this.ctx.drawImage(sprite.image, transform.x, transform.y);

            // Draw collision boxes
            this.ctx.strokeStyle = Colors.GREEN;
            this.ctx.strokeRect(transform.x, transform.y, boxCollider.width, boxCollider.height);

            // Draw labels
            const name = this.entityManager.nameFor(entity);
            if (name) {
                this.ctx.font = "11px sans-serif";
                this.ctx.fillStyle = Colors.GREEN;
                this.ctx.fillText(name, transform.x, transform.y, boxCollider.width);
            }
        });
    }
}