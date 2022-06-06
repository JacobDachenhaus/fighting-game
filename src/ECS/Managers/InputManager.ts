export class InputManager {
    public keyMap: Map<string, boolean>;

    constructor() {
        this.keyMap = new Map();
    }

    public startListening() {
        window.addEventListener("keydown", (ev: KeyboardEvent) => {
            this.keyMap.set(ev.key, true);
        });

        window.addEventListener("keyup", (ev: KeyboardEvent) => {
            this.keyMap.set(ev.key, false);
        });
    }

    public isKeyPressed(key: string): boolean {
        const result = this.keyMap.get(key);

        if (!result) {
            return false;
        }

        return result;
    }
}