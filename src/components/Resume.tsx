// components/Resume.tsx
import React from 'react';
import { PageSize, ResumeContent } from '@/lib/types';

interface ResumeProps {
  pageSize: PageSize;
  content: ResumeContent;
  customCss?: string;
}

const Resume: React.FC<ResumeProps> = ({ pageSize, content, customCss }) => {
  return (
    <div
      className={`bg-white p-8 shadow-lg ${pageSize === 'A4' ? 'w-[210mm] h-[297mm]' : 'w-[216mm] h-[279mm]'}`}
      style={{ boxSizing: 'border-box' }}
    >
      <style>{customCss}</style>
      <h1 className="text-2xl font-bold">{content.name}</h1>
      <p>{content.summary}</p>
    </div>
  );
};

export default Resume;
