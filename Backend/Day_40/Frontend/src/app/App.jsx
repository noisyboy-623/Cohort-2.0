import { useState, useRef, useEffect } from 'react';
import MessageCard from './components/MessageCard';
import InputBar from './components/InputBar';
import axios from 'axios';
import './App.css';

/* ---- Mock response generator ---- */
function generateMockResponse(problem) {
  const pool = [
    {
      solution_1: `## Approach A: Iterative Method\n\nWe can solve this by breaking it down step by step:\n\n1. **Analyze the input** — parse the problem to identify key constraints\n2. **Build the solution** — use a greedy approach, iterating through possibilities\n3. **Optimize** — apply memoization to cut redundant work\n\n\`\`\`python\ndef solve(data):\n    memo = {}\n    for item in data:\n        if item not in memo:\n            memo[item] = compute(item)\n    return max(memo.values())\n\`\`\`\n\n> Runs in **O(n)** time and **O(n)** space.`,
      solution_2: `## Approach B: Recursive Strategy\n\nA divide-and-conquer approach:\n\n- **Base case** — trivial when size is 1\n- **Divide** — split into two halves\n- **Conquer** — recursively solve each half\n- **Combine** — merge with a linear scan\n\n\`\`\`python\ndef solve(arr, lo, hi):\n    if lo == hi:\n        return arr[lo]\n    mid = (lo + hi) // 2\n    left = solve(arr, lo, mid)\n    right = solve(arr, mid+1, hi)\n    return merge(left, right)\n\`\`\`\n\nAchieves **O(n log n)** complexity, optimal for comparison-based methods.`,
      judge: {
        solution_1_score: 8,
        solution_2_score: 9,
        solution_1_reasoning: "Solid iterative approach with good memoization use. O(n) is optimal, but the greedy strategy may miss edge cases.",
        solution_2_reasoning: "Elegant divide-and-conquer with provably optimal complexity. The recursive structure handles edge cases naturally."
      }
    },
    {
      solution_1: `## Direct Analytical Solution\n\nDerive the answer using **mathematical reasoning**:\n\n1. Identify the pattern in small cases\n2. Formulate a closed-form expression\n3. Verify with boundary conditions\n\nThe relationship follows a **Fibonacci-like** recurrence:\n\n\`\`\`\nf(n) = f(n-1) + f(n-2) + C\n\`\`\`\n\nwhere *C* is determined by initial conditions. This yields an **O(1)** solution.`,
      solution_2: `## Simulation-Based Approach\n\nWhen analytics aren't obvious, **Monte Carlo simulation** works:\n\n\`\`\`python\nimport random\n\ndef simulate(n_trials=100000):\n    successes = 0\n    for _ in range(n_trials):\n        result = run_experiment()\n        if meets_criteria(result):\n            successes += 1\n    return successes / n_trials\n\`\`\`\n\n### Pros\n- Works for **any** distribution\n- Easy to implement\n- Provides **confidence intervals**\n\n### Cons\n- Many iterations needed for precision\n- Non-deterministic output`,
      judge: {
        solution_1_score: 9,
        solution_2_score: 7,
        solution_1_reasoning: "Exceptional analytical approach. The closed-form is elegant and computationally superior — shows deep mathematical understanding.",
        solution_2_reasoning: "Practical and robust, but the non-deterministic nature and computational cost make it less ideal as a primary solution."
      }
    },
    {
      solution_1: `## Pattern Matching with Hashing\n\nUse **rolling hash** for efficient substring comparison:\n\n\`\`\`python\ndef rabin_karp(text, pattern):\n    n, m = len(text), len(pattern)\n    p_hash = hash(pattern)\n    for i in range(n - m + 1):\n        if hash(text[i:i+m]) == p_hash:\n            if text[i:i+m] == pattern:\n                return i\n    return -1\n\`\`\`\n\n**Average**: O(n + m) · **Worst**: O(nm)`,
      solution_2: `## Automaton-Based Matching\n\nBuild a **finite automaton**, then scan in one pass:\n\n\`\`\`python\ndef build_automaton(pattern, alpha):\n    states = len(pattern) + 1\n    table = [{} for _ in range(states)]\n    for s in range(states):\n        for c in alpha:\n            k = min(s + 1, len(pattern))\n            while k > 0:\n                prefix = pattern[:s] + c\n                if prefix.endswith(pattern[:k]):\n                    break\n                k -= 1\n            table[s][c] = k\n    return table\n\`\`\`\n\n**Guaranteed O(n)** scanning. No worst-case degradation.`,
      judge: {
        solution_1_score: 7,
        solution_2_score: 8,
        solution_1_reasoning: "Clean Rabin-Karp implementation. Practical, but the O(nm) worst case is a notable weakness for adversarial inputs.",
        solution_2_reasoning: "Robust automaton with guaranteed linear scanning. Higher preprocessing cost, but the worst-case guarantee is superior for production."
      }
    }
  ];

  const idx = Math.floor(Math.random() * pool.length);
  return { problem, ...pool[idx] };
}

/* ---- Empty State ---- */
function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <h2>The Arena Awaits</h2>
      <p>
        Submit a problem and watch two AI solutions compete head-to-head.
        A judge will score and reason about each approach.
      </p>
      <div className="empty-hints">
        {[
          "Explain quicksort vs mergesort",
          "Detect cycles in a linked list",
          "Compare REST vs GraphQL"
        ].map((hint) => (
          <span key={hint} className="empty-hint">{hint}</span>
        ))}
      </div>
    </div>
  );
}

/* ---- App ---- */
export default function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current && messages.length > 0) {
      setTimeout(() => {
        feedRef.current.scrollTo({
          top: feedRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 120);
    }
  }, [messages]);

  const handleSubmit = async (problem) => {
    const response = await axios.post('http://localhost:3000/invoke', { problem });
    const data = response.data;
    console.log(data)
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
    setMessages((prev) => [...prev, data.result]);
    setIsLoading(false);
  };

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">
            <div className="app-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1>AI Battle Arena</h1>
              <div className="app-logo-sub">Compare · Score · Judge</div>
            </div>
          </div>
          {messages.length > 0 && (
            <span className="battle-count">
              {messages.length} {messages.length === 1 ? 'battle' : 'battles'}
            </span>
          )}
        </div>
      </header>

      {/* Feed */}
      <main ref={feedRef} className="feed">
        <div className="feed-inner">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((msg, i) => (
              <MessageCard key={i} data={msg} index={i} />
            ))
          )}

          {isLoading && (
            <div className="loading-card">
              <div className="loading-dots">
                <span className="loading-dot" />
                <span className="loading-dot" />
                <span className="loading-dot" />
              </div>
              <span className="loading-text">Models are competing…</span>
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <InputBar onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
