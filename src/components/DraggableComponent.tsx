/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DraggableComponent.tsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Component } from '@/lib/types';

interface DraggableComponentProps {
  component: Component;
  index: number;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
  index,
}) => {
  return (
    <Draggable draggableId={component.id} index={index}>
      {(provided: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...component.styles, ...provided.draggableProps.style }}
          className="p-4 mb-4 border rounded-lg shadow-sm"
        >
          {component.type === 'title' && <h1>{component.content}</h1>}
          {component.type === 'subtitle' && <h2>{component.content}</h2>}
          {component.type === 'description' && <p>{component.content}</p>}
          {component.type === 'bulletPoints' && (
            <ul>
              {component.content.split('\n').map((point: any, i: any) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          )}
          {component.type === 'image' && (
            <img src={component.content} alt="Resume Image" />
          )}
          {component.type === 'badge' && (
            <span className="badge">{component.content}</span>
          )}
          {component.type === 'progressBar' && (
            <div className="progress-bar">
              <div style={{ width: component.content }}></div>
            </div>
          )}
          {component.type === 'customHtml' && (
            <div dangerouslySetInnerHTML={{ __html: component.content }} />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableComponent;
