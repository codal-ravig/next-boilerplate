// pages/index.tsx
'use client';
import React from 'react';
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Resume from '@/components/Resume';
import { PageSize, ResumePage } from '@/lib/types';
// import CodeEditor from '@/components/Editor';
import ResumeBuilder from '@/components/ResumeBuilder';

const Home: React.FC = () => {
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [pages, setPages] = useState<ResumePage[]>([
    {
      content: {
        name: 'John Doe',
        summary: 'Experienced software developer...',
      },
    },
  ]);
  // const [customCss, setCustomCss] = useState('');

  const addPage = () => {
    setPages([...pages, { content: { name: '', summary: '' } }]);
  };

  const exportToPdf = async () => {
    const pdf = new jsPDF('p', 'mm', pageSize === 'A4' ? 'a4' : 'letter');
    const elements = document.querySelectorAll('.resume-page');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const canvas = await html2canvas(element as HTMLElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    pdf.save('resume.pdf');
  };

  return (
    <div className="p-8">
      <select
        value={pageSize}
        onChange={(e) => setPageSize(e.target.value as PageSize)}
        className="p-2 border rounded"
      >
        <option value="A4">A4</option>
        <option value="Letter">Letter</option>
      </select>

      {pages.map((page, index) => (
        <div key={index} className="resume-page">
          <Resume
            pageSize={pageSize}
            content={page.content}
            // customCss={customCss}
          />
        </div>
      ))}

      <button onClick={addPage} className="mt-4 p-2 bg-blue-500 text-white">
        Add Page
      </button>
      <button
        onClick={exportToPdf}
        className="mt-4 p-2 bg-green-500 text-white"
      >
        Export to PDF
      </button>
      {/* <CodeEditor customCss={customCss} setCustomCss={setCustomCss} /> */}
      <ResumeBuilder />
    </div>
  );
};

export default Home;
