export function createBlockGradient(ctx, x, y, color, blockSize) {
    const gradient = ctx.createLinearGradient(x, y, x + blockSize, y + blockSize);
    const lightColor = lightenColor(color, 50);
    const darkColor = darkenColor(color, 50);
    gradient.addColorStop(0, lightColor);
    gradient.addColorStop(1, darkColor);
    return gradient;
}

function lightenColor(color, amount) {
    let rgb = hexToRgb(color);
    rgb.r = Math.min(255, rgb.r + amount);
    rgb.g = Math.min(255, rgb.g + amount);
    rgb.b = Math.min(255, rgb.b + amount);
    return rgbToHex(rgb);
}

function darkenColor(color, amount) {
    let rgb = hexToRgb(color);
    rgb.r = Math.max(0, rgb.r - amount);
    rgb.g = Math.max(0, rgb.g - amount);
    rgb.b = Math.max(0, rgb.b - amount);
    return rgbToHex(rgb);
}

function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function rgbToHex(rgb) {
    let r = rgb.r.toString(16),
        g = rgb.g.toString(16),
        b = rgb.b.toString(16);
    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;
    return "#" + r + g + b;
}
