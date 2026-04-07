import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ content }) {
  return (
    <div className="md-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
