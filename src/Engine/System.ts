export default interface ISystem {
    processOneGameTick(previousFrameTime: number): void;
}