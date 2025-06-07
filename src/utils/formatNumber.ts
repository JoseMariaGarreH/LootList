export function formatCounter(num: number, digits = 3) {
    return (num || 0).toLocaleString("es-ES", {
        minimumIntegerDigits: digits,
        useGrouping: false,
    });
}