
import React from 'react';
import { ColorEntry } from '../../types';
import { PlusIcon, MinusIcon } from '../../constants';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ColorPaletteInputProps {
  colors: ColorEntry[];
  onColorsChange: (colors: ColorEntry[]) => void;
}

const ColorPaletteInput: React.FC<ColorPaletteInputProps> = ({ colors, onColorsChange }) => {
  const handleAddColor = () => {
    onColorsChange([...colors, { id: Date.now().toString(), hex: '#000000' }]);
  };

  const handleRemoveColor = (id: string) => {
    onColorsChange(colors.filter(color => color.id !== id));
  };

  const handleColorChange = (id: string, hex: string) => {
    // Basic hex validation (very simple)
    const validHex = /^#([0-9A-F]{3}){1,2}$/i.test(hex) ? hex : colors.find(c => c.id === id)?.hex || '#000000';
    
    // Derive RGB (simplified)
    let rgb = '';
    if (validHex.length === 7) {
        const r = parseInt(validHex.slice(1, 3), 16);
        const g = parseInt(validHex.slice(3, 5), 16);
        const b = parseInt(validHex.slice(5, 7), 16);
        rgb = `rgb(${r}, ${g}, ${b})`;
    } else if (validHex.length === 4) {
        const r = parseInt(validHex.slice(1, 2) + validHex.slice(1, 2), 16);
        const g = parseInt(validHex.slice(2, 3) + validHex.slice(2, 3), 16);
        const b = parseInt(validHex.slice(3, 4) + validHex.slice(3, 4), 16);
        rgb = `rgb(${r}, ${g}, ${b})`;
    }

    onColorsChange(colors.map(color => color.id === id ? { ...color, hex: validHex, rgb } : color));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Color Palette</label>
      {colors.map((color, index) => (
        <div key={color.id} className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded border border-gray-300" style={{ backgroundColor: color.hex }}></div>
          <Input
            type="text"
            value={color.hex}
            onChange={(e) => handleColorChange(color.id, e.target.value)}
            placeholder="#RRGGBB"
            className="flex-grow"
          />
           {color.rgb && <span className="text-xs text-gray-500 w-32 truncate">{color.rgb}</span>}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleRemoveColor(color.id)}
            disabled={colors.length <= 1 && index === 0} // Prevent removing the last item if it's the only one (optional)
            aria-label="Remove color"
          >
            <MinusIcon className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddColor}
        leftIcon={<PlusIcon className="w-4 h-4" />}
      >
        Add Color
      </Button>
    </div>
  );
};

export default ColorPaletteInput;
