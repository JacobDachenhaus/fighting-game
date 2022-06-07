import { PlayerInput } from "../Components/PlayerInput";
import { Movement } from "../Components/Movement";
import { EntityManager } from "../Managers/EntityManager";
import { InputManager } from "../Managers/InputManager";
import { System } from "../Core/System";

export class PlayerInputSystem implements System {
    public requiredComponentTypes: Type<any>[] = [PlayerInput, Movement];
    public entityManager: EntityManager;
    public inputManager: InputManager;

    constructor(entityManager: EntityManager, inputManager: InputManager) {
        this.entityManager = entityManager;
        this.inputManager = inputManager;
    }

    onUpdate(dt: number): void {
        const requiredEntities = this.entityManager.getAllWithComponentsOfTypes(this.requiredComponentTypes);
        requiredEntities.forEach((entity) => {
            const playerInput = this.entityManager.getComponent(entity, PlayerInput)!;
            const movement = this.entityManager.getComponent(entity, Movement)!;

            if (this.inputManager.isPressed(playerInput.moveLeft)
                && !this.inputManager.isPressed(playerInput.moveRight)) {
                movement.direction.x = -1;
            } else if (this.inputManager.isPressed(playerInput.moveRight)
                && !this.inputManager.isPressed(playerInput.moveLeft)) {
                movement.direction.x = 1;
            } else {
                movement.direction.x = 0;
            }

            if (this.inputManager.isPressed(playerInput.moveUp)
                && !this.inputManager.isPressed(playerInput.moveDown)) {
                movement.direction.y = -1;
            } else if (this.inputManager.isPressed(playerInput.moveDown)
                && !this.inputManager.isPressed(playerInput.moveUp)) {
                movement.direction.y = 1;
            } else {
                movement.direction.y = 0;
            }
        });
    }
}