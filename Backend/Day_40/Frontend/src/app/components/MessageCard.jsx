import SolutionCard from './SolutionCard';
import JudgeVerdict from './JudgeVerdict';

export default function MessageCard({ data, index }) {
  const { problem, solution_1, solution_2, judge } = data;
  const winner = judge.solution_1_score > judge.solution_2_score ? 1
    : judge.solution_2_score > judge.solution_1_score ? 2
    : 0;

  return (
    <article className="message-block" id={`message-${index}`}>
      {/* Problem / Challenge */}
      <div className="card">
        <div className="card-label">
          <span className="card-label-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          Challenge
        </div>
        <p className="problem-text">{problem}</p>
      </div>

      {/* Side-by-side Solutions */}
      <div className="solutions-grid">
        <SolutionCard
          label="Solution 1"
          content={solution_1}
          isWinner={winner === 1}
          delay={0.1}
        />
        <SolutionCard
          label="Solution 2"
          content={solution_2}
          isWinner={winner === 2}
          delay={0.18}
        />
      </div>

      {/* Judge */}
      <JudgeVerdict judge={judge} delay={0.26} />
    </article>
  );
}
