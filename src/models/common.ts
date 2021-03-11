export interface EventPair {
  mouse?: string;
  keyboard?: string;
}

export interface FileMetadata {
  fileContent: string;
  fileExtension: string;
}

export type FrameworkName = 'react' | 'angular' | 'vue' | 'no framework';