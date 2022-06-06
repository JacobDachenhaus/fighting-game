import { EntityManager } from "./ECS/Managers/EntityManager";
import { RenderingSystem } from "./ECS/Systems/RenderingSystem";
import { BoxCollider } from "./ECS/Components/BoxCollider";
import { Transform } from "./ECS/Components/Transform";
import { Renderable } from "./ECS/Components/Renderable";
import { Sprite } from "./ECS/Components/Sprite";
import { PhysicsSystem } from "./ECS/Systems/PhysicsSystem";
import { Moveable } from "./ECS/Components/Moveable";
import { Physics } from "./ECS/Components/Physics";

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
    const physicsSystem = new PhysicsSystem(entityManager);
    const renderingSystem = new RenderingSystem(entityManager, ctx);

    function setup() {
        const p1 = entityManager.createEntity("p1");

        entityManager.addComponent(p1, new Transform({
            x: 0,
            y: -400,
        }));

        const sprite = new Sprite({
            src: "/images/player.png"
        });

        entityManager.addComponent(p1, sprite);

        entityManager.addComponent(p1, new BoxCollider({
            width: 140,
            height: 188
        }));

        entityManager.addComponent(p1, new Physics({
            mass: 1,
            velocityX: 0,
            velocityY: 0,
            gravityScale: 0.01
        }));

        entityManager.addComponent(p1, new Moveable());
        entityManager.addComponent(p1, new Renderable());
    }

    function update(dt: number) {
        physicsSystem.processOneGameTick(dt);
    }

    function render(dt: number) {
        renderingSystem.processOneGameTick(dt);
    }

    const fps = 60;
    const interval = 1000 / fps;
    let prevFrameTime: number;

    function gameLoop(currFrameTime: number) {
        requestAnimationFrame(gameLoop);

        if (!prevFrameTime) { prevFrameTime = currFrameTime; }
        const dt = currFrameTime - prevFrameTime;

        // fps throttle
        if (dt >= interval) {
            update(dt);
            render(dt);
            prevFrameTime = currFrameTime;
        }
    }

    setup();
    requestAnimationFrame(gameLoop);
})();