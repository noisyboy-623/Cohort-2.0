export default function JudgeVerdict({ judge, delay = 0 }) {
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
  const winner = solution_1_score > solution_2_score ? 1
    : solution_2_score > solution_1_score ? 2
    : 0;

  return (
    <div className="verdict-card" style={{ animationDelay: `${delay}s` }}>
      {/* Header */}
      <div className="card-label">
        <span className="card-label-icon">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>
        Judge's Verdict
      </div>

      {/* Score Boxes */}
      <div className="verdict-scores">
        {/* Solution 1 */}
        <div className={`score-box ${winner === 1 ? 'highlight' : ''}`}>
          <div className={`score-value ${winner === 1 ? 'accent' : ''}`}>
            {solution_1_score}<span>/10</span>
          </div>
          <div className="score-label">Solution 1</div>
          <p className="score-reasoning">{solution_1_reasoning}</p>
        </div>

        {/* Solution 2 */}
        <div className={`score-box ${winner === 2 ? 'highlight' : ''}`}>
          <div className={`score-value ${winner === 2 ? 'accent' : ''}`}>
            {solution_2_score}<span>/10</span>
          </div>
          <div className="score-label">Solution 2</div>
          <p className="score-reasoning">{solution_2_reasoning}</p>
        </div>
      </div>
    </div>
  );
}
