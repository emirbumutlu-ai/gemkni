
// Shared type definitions for the application theme colors and gallery data.
// Exporting these ensures the file is recognized as a module by the TypeScript compiler.

export type ThemeColor = 'pink' | 'blue' | 'green' | 'yellow';

export interface Photo {
  id: number;
  url: string;
  caption: string;
  emoji: string;
}
