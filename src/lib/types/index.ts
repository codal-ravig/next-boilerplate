// types.ts
export type PageSize = 'A4' | 'Letter';

export interface ResumeContent {
  name: string;
  summary: string;
}

export interface ResumePage {
  content: ResumeContent;
}

// types.ts
export type ComponentType =
  | 'title'
  | 'subtitle'
  | 'description'
  | 'bulletPoints'
  | 'image'
  | 'badge'
  | 'progressBar'
  | 'customHtml';

export interface Component {
  id: string;
  type: ComponentType;
  content: string;
  styles: React.CSSProperties;
}

export interface Resume {
  components: Component[];
}
