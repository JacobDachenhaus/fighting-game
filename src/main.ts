import { Collider } from "./ECS/Components/Collider";
import { PlayerInput } from "./ECS/Components/PlayerInput";
import { Movement } from "./ECS/Components/Movement";
import { Transform } from "./ECS/Components/Transform";
import { EntityManager } from "./ECS/Managers/EntityManager";
import { InputManager } from "./ECS/Managers/InputManager";
import { PlayerInputSystem } from "./ECS/Systems/PlayerInputSystem";
import { RenderingSystem } from "./ECS/Systems/RenderingSystem";
import { MovementSystem } from "./ECS/Systems/MovementSystem";
import { CollisionSystem } from "./ECS/Systems/CollisionSystem";

(function main() {
    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    document.body.appendChild(canvas);

    // Get context
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return; // not supported
    }

    // Translate to Cartesian coordinate system
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Init managers & systems
    const entityManager = new EntityManager();
    const inputManager = new InputManager();
    const playerInputSystem = new PlayerInputSystem(entityManager, inputManager);
    const movementSystem = new MovementSystem(entityManager);
    const collisionSystem = new CollisionSystem(entityManager);
    const renderingSystem = new RenderingSystem(entityManager, ctx);

    function setup() {
        const p1 = entityManager.createMetaEntity("p1");

        p1.addComponent(new Transform({
            position: {
                x: 0,
                y: 0
            }
        }));

        p1.addComponent(new Collider({
            width: 50,
            height: 100,
            offset: {
                x: 0,
                y: 0
            },
            isColliding: false
        }));

        p1.addComponent(new Movement({
            direction: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 1,
                y: 1
            }
        }));

        p1.addComponent(new PlayerInput({
            moveUp: "KeyW",
            moveLeft: "KeyA",
            moveDown: "KeyS",
            moveRight: "KeyD"
        }));

        const p2 = entityManager.createMetaEntity("p2");

        p2.addComponent(new Transform({
            position: {
                x: 200,
                y: 0
            }
        }));

        p2.addComponent(new Collider({
            width: 50,
            height: 100,
            offset: {
                x: 0,
                y: 0
            },
            isColliding: false
        }));

        p2.addComponent(new Movement({
            direction: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 1,
                y: 1
            }
        }));

        p2.addComponent(new PlayerInput({
            moveUp: "ArrowUp",
            moveLeft: "ArrowLeft",
            moveDown: "ArrowDown",
            moveRight: "ArrowRight"
        }));

        window.addEventListener("keydown", (event: KeyboardEvent) => inputManager.onKeyDown(event));
        window.addEventListener("keyup", (event: KeyboardEvent) => inputManager.onKeyUp(event));
    }

    function update(dt: number) {
        playerInputSystem.onUpdate(dt);
        movementSystem.onUpdate(dt);
        collisionSystem.onUpdate(dt);
        renderingSystem.onUpdate(dt);
    }

    const fps = -1;
    const interval = 1000 / fps;
    let prevFrameTime: number;

    function gameLoop(currFrameTime: number) {
        requestAnimationFrame(gameLoop);

        if (!prevFrameTime) { prevFrameTime = currFrameTime; }
        const dt = currFrameTime - prevFrameTime;

        // fps throttle
        if (dt >= interval) {
            update(dt);
            prevFrameTime = currFrameTime;
        }
    }

    setup();
    requestAnimationFrame(gameLoop);
})();