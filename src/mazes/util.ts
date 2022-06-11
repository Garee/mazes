export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function sample<T>(arr: Array<T>): T {
    const idx = randInt(0, arr.length - 1);
    return arr[idx];
}
