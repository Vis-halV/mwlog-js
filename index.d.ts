export function mdToHtml(markdown: string): string;
export function markdownToHtml(markdown: string): string;
export function parse(markdown: string): string;
export function escapeHtml(text: string): string;

export const themes: Readonly<{
  medium: Readonly<{
    light: string;
    dark: string;
  }>;
  awwwards: Readonly<{
    light: string;
    dark: string;
  }>;
}>;
