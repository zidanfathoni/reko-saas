import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MarkdownData {
  metadata: Record<string, unknown>;
  content: string;
}

// Fungsi untuk membaca file Markdown
export function getMarkdownData(filename: string): MarkdownData {
  const filePath = path.join(process.cwd(), 'docs', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Parsing metadata dan konten dengan gray-matter
  const { data, content } = matter(fileContents);

  return {
    metadata: data, // Metadata jika ada
    content,        // Konten Markdown
  };
}
