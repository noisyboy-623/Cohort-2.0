import MarkdownRenderer from './MarkdownRenderer';

export default function SolutionCard({ label, content, isWinner, delay = 0 }) {
  return (
    <div
      className={`solution-card ${isWinner ? 'winner' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Header */}
      <div className="solution-header">
        <span className="solution-label">{label}</span>
        {isWinner && (
          <span className="winner-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Winner
          </span>
        )}
      </div>

      {/* Markdown Content */}
      <MarkdownRenderer content={content} />
    </div>
  );
}
