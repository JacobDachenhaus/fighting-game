import { Position } from "./Engine/Components/Position";
import { EntityManager } from "./Engine/EntityManager";

const entityManager = new EntityManager();

const player = entityManager.createEntity();
entityManager.addComponent(player, new Position(0, 0));

const result = entityManager.getAllComponentsOnEntity(player);
result.forEach((component) => {
    console.log(component);
});