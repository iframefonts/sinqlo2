
import React, { useState, useEffect } from 'react';
import LogoUpload from '../components/shared/LogoUpload';
import ColorPaletteInput from '../components/shared/ColorPaletteInput';
import LinkInputList from '../components/shared/LinkInputList';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ColorEntry, LinkEntry, ExportFormat, ExportCategory } from '../types';
import { DEFAULT_EXPORT_FORMATS, DownloadIcon, CheckIcon } from '../constants';
import { detectDominantColors } from '../utils/aiService';
import { updateSvgFills } from '../utils/svgUtils'; // New import
import SvgPreview from '../components/shared/SvgPreview'; // New import
import { hexToRgbString } from '../utils/colorUtils'; // Import centralized utility


const FreeToolPage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalSvgString, setOriginalSvgString] = useState<string | null>(null);
  const [modifiedSvgString, setModifiedSvgString] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorEntry[]>([{ id: 'color1', hex: '#ff0000', rgb: hexToRgbString('#ff0000') }, { id: 'color2', hex: '#000000', rgb: hexToRgbString('#000000') }]);
  const [fonts, setFonts] = useState<string>('Inter, Regular');
  const [externalLinks, setExternalLinks] = useState<LinkEntry[]>([{ id: 'link1', url: 'https://ifenamefonts.com', label: 'Font Source' }]);
  const [notes, setNotes] = useState<string>('');
  const [isDetectingColors, setIsDetectingColors] = useState(false);

  useEffect(() => {
    if (originalSvgString && colors.length > 0) {
      const firstColorHex = colors[0].hex;
      try {
        const newSvgString = updateSvgFills(originalSvgString, firstColorHex);
        setModifiedSvgString(newSvgString);
      } catch (error) {
        console.error("Error updating SVG colors:", error);
        setModifiedSvgString(originalSvgString); // Fallback to original on error
      }
    } else if (!originalSvgString) {
        setModifiedSvgString(null); // Clear preview if original SVG is gone
    }
  }, [originalSvgString, colors]);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const svgText = e.target?.result as string;
      setOriginalSvgString(svgText);
      // setModifiedSvgString(svgText); // Initially set modified to original - useEffect will handle this

      // Now detect colors, which will trigger the useEffect if colors[0] changes
      setIsDetectingColors(true);
      try {
        const detectedColors = await detectDominantColors(file);
        if (detectedColors.length > 0) {
          setColors(detectedColors);
        } else {
          console.log("No dominant colors detected by AI. Keeping current/default colors.");
           // If AI returns no colors, ensure we have a default first color for the useEffect
           if (colors.length === 0) { // Or use a fresh default
             setColors([{ id: `default-fallback-${Date.now()}`, hex: '#000000', rgb: hexToRgbString('#000000') }]);
           }
        }
      } catch (error) {
        console.error("Failed to detect colors:", error);
        if (colors.length === 0) { // Or use a fresh default
          setColors([{ id: `err-fallback-${Date.now()}`, hex: '#CCCCCC', rgb: hexToRgbString('#CCCCCC') }]);
        }
      } finally {
        setIsDetectingColors(false);
      }
    };
    reader.onerror = (e) => {
        console.error("FileReader error:", e);
        setOriginalSvgString(null);
        setModifiedSvgString(null);
    }
    reader.readAsText(file);
    console.log('File uploaded:', file.name);
  };

  const handleDownloadAll = () => {
    if (!uploadedFile) {
      alert('Please upload a logo first.');
      return;
    }
    // Mock download
    console.log('Downloading all files for:', uploadedFile.name);
    alert(`Mock downloading all assets for ${uploadedFile.name} using SVG with color ${colors[0]?.hex || 'default'}. Check console for details.`);
  };
  
  const groupFormatsByCategory = (formats: ExportFormat[]) => {
    return formats.reduce((acc, format) => {
      (acc[format.category] = acc[format.category] || []).push(format);
      return acc;
    }, {} as Record<ExportCategory, ExportFormat[]>);
  };

  const groupedFormats = groupFormatsByCategory(DEFAULT_EXPORT_FORMATS);


  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-brand-primary mb-4">Free Logo Export Tool</h1>
        <p className="text-lg text-gray-600">Get your logo in all the formats you need with one click. No sign-up required.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Upload and Preview */}
        <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload Your Logo</h2>
                <LogoUpload onFileUpload={handleFileUpload} />
                {uploadedFile && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-center">
                    <p className="text-sm font-medium text-green-700">{uploadedFile.name} uploaded!</p>
                    <p className="text-xs text-green-600">Ready to add details and export.</p>
                    </div>
                )}
            </Card>

            {originalSvgString && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Live Preview</h2>
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50 min-h-[150px] flex items-center justify-center">
                    <SvgPreview svgString={modifiedSvgString} title="Live preview of uploaded logo with color adjustments" />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Preview updates based on the first color in the palette.
                </p>
              </Card>
            )}

             <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Download</h2>
                <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    onClick={handleDownloadAll}
                    disabled={!uploadedFile}
                    leftIcon={<DownloadIcon className="w-5 h-5"/>}
                >
                    Download All Files
                </Button>
                <p className="text-xs text-gray-500 mt-3 text-center">All files will be zipped. The free tool does not store your assets.</p>
            </Card>
        </div>
        
        {/* Right Column: Metadata Inputs */}
        <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">2. Add Brand Information</h2>
                <div className="space-y-6">
                    {isDetectingColors && <p className="text-sm text-gray-500 italic my-2 text-center">Detecting dominant colors from your logo...</p>}
                    <ColorPaletteInput colors={colors} onColorsChange={setColors} />
                     <p className="text-xs text-gray-500 -mt-2 pl-1">
                        Tip: The first color in the palette above updates the live preview.
                    </p>
                    <Input
                        label="Fonts"
                        value={fonts}
                        onChange={(e) => setFonts(e.target.value)}
                        placeholder="e.g., Inter Regular, Manrope Bold"
                    />
                    <LinkInputList links={externalLinks} onLinksChange={setExternalLinks} itemLabel="External Download Link" />
                    <Textarea
                        label="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any important notes about logo usage..."
                        rows={4}
                    />
                </div>
            </Card>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Auto-Export Formats</h2>
                <p className="text-sm text-gray-600 mb-4">Upon upload, we'll prepare these standard formats for you:</p>
                <div className="space-y-4">
                {Object.entries(groupedFormats).map(([category, formats]) => (
                    <div key={category}>
                    <h3 className="text-md font-semibold text-gray-700 mb-2">{category}</h3>
                    <ul className="space-y-1 pl-1">
                        {formats.map((format) => (
                        <li key={format.name} className="flex items-center text-sm text-gray-600">
                            <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {format.name} {format.details && <span className="text-xs text-gray-400 ml-1">({format.details})</span>}
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default FreeToolPage;