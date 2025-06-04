
import React, { useState, useEffect } from 'react';
import { ColorEntry, LinkEntry, ExportFormat, ExportCategory, NewLogoProjectData } from '../../types';
import { DEFAULT_EXPORT_FORMATS, CATEGORY_OPTIONS, CheckIcon } from '../../constants';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import LogoUpload from '../shared/LogoUpload';
import ColorPaletteInput from '../shared/ColorPaletteInput';
import LinkInputList from '../shared/LinkInputList';
import { detectDominantColors } from '../../utils/aiService'; // Import AI service
import { hexToRgbString } from '../../utils/colorUtils'; // Import centralized utility

interface AddLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: NewLogoProjectData) => void;
}

const AddLogoModal: React.FC<AddLogoModalProps> = ({ isOpen, onClose, onSave }) => {
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [colors, setColors] = useState<ColorEntry[]>([{ id: 'initial-color', hex: '#FF0000', rgb: hexToRgbString('#FF0000') }]);
  const [fonts, setFonts] = useState('');
  const [links, setLinks] = useState<LinkEntry[]>([{ id: 'initial-link', url: '' }]);
  const [notes, setNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDetectingColors, setIsDetectingColors] = useState(false);

  // Reset form when modal opens or closes to ensure clean state
  useEffect(() => {
    if (isOpen) {
        // Reset to initial values when modal is opened
        setClientName('');
        setCategory(CATEGORY_OPTIONS[0]);
        setColors([{ id: `default-${Date.now()}`, hex: '#000000', rgb: hexToRgbString('#000000') }]);
        setFonts('');
        setLinks([{ id: `link-${Date.now()}`, url: '' }]);
        setNotes('');
        setUploadedFile(null);
        setIsDetectingColors(false);
    }
  }, [isOpen]);


  const handleSave = (isDraft: boolean) => {
    if (!clientName || !uploadedFile) {
      alert('Client Name and a Logo File are required.');
      return;
    }
    
    const projectData: NewLogoProjectData = {
      clientName,
      category,
      colors,
      fonts,
      links,
      notes,
      fileName: uploadedFile.name,
      status: isDraft ? 'Draft' : 'Published',
    };
    onSave(projectData);
    onClose(); 
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsDetectingColors(true);
    try {
      const detectedColors = await detectDominantColors(file);
      if (detectedColors.length > 0) {
        setColors(detectedColors);
      } else {
         console.log("No dominant colors detected by AI for modal. Keeping current/default colors.");
         setColors([{ id: `default-fallback-${Date.now()}`, hex: '#000000', rgb: hexToRgbString('#000000') }]);
      }
    } catch (error) {
      console.error("Failed to detect colors in modal:", error);
      setColors([{ id: `err-fallback-1-${Date.now()}`, hex: '#000000', rgb: hexToRgbString('#000000') }, { id: `err-fallback-2-${Date.now()}`, hex: '#FFFFFF', rgb: hexToRgbString('#FFFFFF') }]);
    } finally {
      setIsDetectingColors(false);
    }
  };

  const exportCategories = Object.values(ExportCategory);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Logo Project" size="xl">
      <div className="space-y-6">
        <LogoUpload onFileUpload={handleFileUpload} />
        {uploadedFile && <p className="text-sm text-green-600 text-center -mt-2">✓ {uploadedFile.name} selected.</p>}
        
        <Input
          label="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Enter client name"
          required
        />

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
          >
            {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        
        {isDetectingColors && <p className="text-sm text-gray-500 italic my-2 text-center">Detecting dominant colors...</p>}
        <ColorPaletteInput colors={colors} onColorsChange={setColors} />
        
        <Input
          label="Fonts"
          value={fonts}
          onChange={(e) => setFonts(e.target.value)}
          placeholder="e.g., Inter Regular, Manrope Bold"
        />

        <LinkInputList links={links} onLinksChange={setLinks} itemLabel="External Link" />

        <Textarea
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes for this logo project..."
          rows={3}
        />

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Export Formats Preview</h3>
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {exportCategories.map(cat => (
                <div key={cat} className="flex items-center text-sm text-green-600">
                  <CheckIcon className="w-4 h-4 mr-1.5"/>
                  <span>{cat}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">All standard formats will be automatically generated upon publish.</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="secondary" onClick={() => handleSave(true)} disabled={!uploadedFile || !clientName || isDetectingColors}>Save as Draft</Button>
          <Button variant="primary" onClick={() => handleSave(false)} disabled={!uploadedFile || !clientName || isDetectingColors}>Publish</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddLogoModal;