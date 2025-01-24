import { getMarkdownData } from '@/lib/markdown';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TermAndConditionsProps {
  content: string;
}

const TermAndConditionsModules: React.FC<TermAndConditionsProps> = ({ content }) => {
  return (
    <section>
      <div className="container max-w-6xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </section>
  );
};

// Fungsi untuk membaca file Markdown
export async function getTermAndConditionsStaticProps() {
  const { content } = getMarkdownData('terms-and-conditions.md');
  return content;
}

export default TermAndConditionsModules;
