// components/EditPanel.tsx
import React, { useState } from 'react';
import { Component } from '@/lib/types';

interface EditPanelProps {
  selectedComponent: Component | null;
  onUpdate: (component: Component) => void;
}

const EditPanel: React.FC<EditPanelProps> = ({
  selectedComponent,
  onUpdate,
}) => {
  const [content, setContent] = useState(selectedComponent?.content || '');
  const [styles, setStyles] = useState(selectedComponent?.styles || {});

  const handleSave = () => {
    if (selectedComponent) {
      onUpdate({ ...selectedComponent, content, styles });
    }
  };

  return (
    <div className="p-4 border-l">
      <h2 className="text-lg font-semibold mb-4">Edit Component</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="color"
        value={styles.color || '#000000'}
        onChange={(e) => setStyles({ ...styles, color: e.target.value })}
        className="mb-4"
      />
      <input
        type="number"
        value={parseInt(styles.fontSize as string) || 16}
        onChange={(e) =>
          setStyles({ ...styles, fontSize: `${e.target.value}px` })
        }
        className="w-full p-2 border rounded mb-4"
      />
      <button onClick={handleSave} className="p-2 bg-blue-500 text-white">
        Save
      </button>
    </div>
  );
};

export default EditPanel;
