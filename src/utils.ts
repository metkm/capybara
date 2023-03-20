export const lerp = (x: number, y: number, a: number): number => (1 - a) * x + a * y
export const scalePercent = (scrollPercent: number, start: number, end: number) => (scrollPercent - start) / (end - start)
