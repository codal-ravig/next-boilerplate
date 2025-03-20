// components/CodeEditor.tsx
import React from 'react';
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Choose a style for syntax highlighting

interface CodeEditorProps {
  customCss: string;
  setCustomCss: (css: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ customCss, setCustomCss }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Custom CSS</h2>
      <Editor
        value={customCss}
        onValueChange={(code) => setCustomCss(code)}
        highlight={(code) => hljs.highlightAuto(code).value}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          backgroundColor: '#f3f4f6',
          border: '1px solid #ccc',
          borderRadius: '4px',
          minHeight: '100px',
        }}
      />
    </div>
  );
};

export default CodeEditor;
