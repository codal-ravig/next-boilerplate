// components/ResumeBuilder.tsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import DraggableComponent from '@/components/DraggableComponent';
import { Component, Resume } from '@/lib/types';
import EditPanel from '@/components/EditPanel';

const ResumeBuilder: React.FC = () => {
  const [resume, setResume] = useState<Resume>({
    components: [
      {
        id: '1',
        type: 'title',
        content: 'John Doe',
        styles: { fontSize: '24px', color: '#000' },
      },
      {
        id: '2',
        type: 'subtitle',
        content: 'Software Developer',
        styles: { fontSize: '18px', color: '#555' },
      },
    ],
  });

  const [selectedComponent, setSelectedComponent] = useState<Component | null>(
    null
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const components = Array.from(resume.components);
    const [reorderedItem] = components.splice(result.source.index, 1);
    components.splice(result.destination.index, 0, reorderedItem);

    setResume({ ...resume, components });
  };

  const handleComponentClick = (component: Component) => {
    setSelectedComponent(component);
  };

  const handleUpdate = (updatedComponent: Component) => {
    const updatedComponents = resume.components.map((c) =>
      c.id === updatedComponent.id ? updatedComponent : c
    );
    setResume({ ...resume, components: updatedComponents });
  };

  //   const addCustomHtml = () => {
  //     const newComponent: Component = {
  //       id: String(Date.now()),
  //       type: 'customHtml',
  //       content: '<div>Custom HTML</div>',
  //       styles: {},
  //     };
  //     setResume({ ...resume, components: [...resume.components, newComponent] });
  //   };

  return (
    <div className="flex">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="resume">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {resume.components.map((component, index) => (
                <div
                  onClick={() => handleComponentClick(component)}
                  key={component.id}
                >
                  <DraggableComponent component={component} index={index} />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <EditPanel
        selectedComponent={selectedComponent}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default ResumeBuilder;
