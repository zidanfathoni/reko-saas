import { getMarkdownData } from '@/lib/markdown';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PrivacyPolicyProps {
  content: string;
}

const PrivacyPolicyModules: React.FC<PrivacyPolicyProps> = ({ content }) => {
  return (
    <section>
      <div className="container max-w-6xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </section>
  );
};

// Fungsi untuk membaca file Markdown
export async function getPrivacyPolicyStaticProps() {
  const { content } = getMarkdownData('privacy-policy.md');
  return content;
}

export default PrivacyPolicyModules;
