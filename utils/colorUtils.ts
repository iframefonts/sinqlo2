// utils/colorUtils.ts

/**
 * Converts a HEX color string to an RGB string.
 * Handles 3-digit and 6-digit hex codes, with or without '#'.
 * @param hex - The hex color string (e.g., "#RRGGBB" or "RRGGBB" or "#RGB" or "RGB").
 * @returns The RGB string (e.g., "rgb(r, g, b)") or an empty string for invalid input.
 */
export const hexToRgbString = (hex: string): string => {
    if (!hex) return '';
    
    let sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

    if (sanitizedHex.length === 3) {
        sanitizedHex = sanitizedHex.split('').map(char => char + char).join('');
    }

    if (sanitizedHex.length !== 6) {
        // console.warn(`Invalid HEX color for RGB conversion: ${hex}`);
        return 'Invalid HEX'; // Or return a default like 'rgb(0,0,0)' or throw error
    }

    const r = parseInt(sanitizedHex.slice(0, 2), 16);
    const g = parseInt(sanitizedHex.slice(2, 4), 16);
    const b = parseInt(sanitizedHex.slice(4, 6), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        // console.warn(`Failed to parse HEX to RGB components: ${hex}`);
        return 'Invalid HEX';
    }

    return `rgb(${r}, ${g}, ${b})`;
};
