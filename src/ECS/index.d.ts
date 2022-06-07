type Vec2 = {
    x: number;
    y: number;
}

/** Type of any class as represented by its constructor */
type Type<T> = new (...args: any[]) => T;