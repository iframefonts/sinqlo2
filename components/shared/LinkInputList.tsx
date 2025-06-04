
import React from 'react';
import { LinkEntry } from '../../types';
import { PlusIcon, MinusIcon } from '../../constants';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface LinkInputListProps {
  links: LinkEntry[];
  onLinksChange: (links: LinkEntry[]) => void;
  itemLabel?: string; // e.g., "External Download Link"
}

const LinkInputList: React.FC<LinkInputListProps> = ({ links, onLinksChange, itemLabel="External Link" }) => {
  const handleAddLink = () => {
    onLinksChange([...links, { id: Date.now().toString(), url: '' }]);
  };

  const handleRemoveLink = (id: string) => {
    onLinksChange(links.filter(link => link.id !== id));
  };

  const handleLinkChange = (id: string, url: string) => {
    onLinksChange(links.map(link => link.id === id ? { ...link, url } : link));
  };
  
  const handleLabelChange = (id: string, label: string) => {
    onLinksChange(links.map(link => link.id === id ? { ...link, label } : link));
  };


  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{itemLabel}s</label>
      {links.map((link) => (
        <div key={link.id} className="flex items-center space-x-2">
          <Input
            type="text"
            value={link.label}
            onChange={(e) => handleLabelChange(link.id, e.target.value)}
            placeholder="Optional Label (e.g., Font Source)"
            className="w-1/3"
          />
          <Input
            type="url"
            value={link.url}
            onChange={(e) => handleLinkChange(link.id, e.target.value)}
            placeholder="https://example.com"
            className="flex-grow"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleRemoveLink(link.id)}
            disabled={links.length <= 1}
            aria-label="Remove link"
          >
            <MinusIcon className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddLink}
        leftIcon={<PlusIcon className="w-4 h-4" />}
      >
        Add {itemLabel}
      </Button>
    </div>
  );
};

export default LinkInputList;
