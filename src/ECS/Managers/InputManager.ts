export interface KeyState {
    pressed: boolean;
}

/** Class that manages `KeyboardEvent` input events */
export class InputManager {
    public keys: Map<string, KeyState> = new Map();

    /**
     * Checks if a key is being pressed
     * @param code The key code
     * @returns `true` if the key is being pressed, otherwise `false`
     */
    public isPressed(code: string): boolean {
        const keyState = this.keys.get(code);

        if (!keyState) {
            return false;
        }

        return keyState.pressed;
    }

    /**
     * Handles the keydown event
     * @param event The keyboard event
     */
    public onKeyDown(event: KeyboardEvent): void {
        let keyState = this.keys.get(event.code);

        if (!keyState) {
            keyState = { pressed: false };
        }

        keyState.pressed = true;
        this.keys.set(event.code, keyState);
    }

    /**
     * Handles the keyup event
     * @param event The keyboard event
     */
    public onKeyUp(event: KeyboardEvent): void {
        const keyState = this.keys.get(event.code);

        if (!keyState) {
            return;
        }

        keyState.pressed = false;
        this.keys.set(event.code, keyState);
    }
}