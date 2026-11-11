import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, GraduationCap, Info, RotateCcw, ShieldCheck, TrendingUp } from 'lucide-react';
import useDemoLearning from '../hooks/useDemoLearning';
import { awarenessCategories, getAwarenessLevel, scamTopics } from '../data/educationData';
import '../css/education.css';

function Awareness() {
  const { learning } = useDemoLearning();
  const result = learning.lastReadiness;
  const completeCount = learning.completedIds.filter((id) => scamTopics.some((topic) => topic.id === id)).length;
  const categories = awarenessCategories.map((item) => {
    const score = result?.categoryScores?.[item.code];
    return { ...item, percent: score?.percentage ?? null, level: score ? getAwarenessLevel(score.percentage) : 'Not assessed' };
  });

  return (
    <main className="edu-page">
      <div className="edu-container">
        <div className="edu-page-heading">
          <span className="edu-eyebrow"><ShieldCheck size={17}/> YOUR LEARNING JOURNEY</span>
          <h1>Scam Awareness</h1>
          <p>Explore what you already know and discover which scam scenarios to practise next.</p>
        </div>
        <div className="edu-awareness-overview">
          <div className="edu-awareness-summary">
            <span className="edu-summary-label">YOUR READINESS</span>
            <h2>{result ? 'Your latest practice results' : 'Know where you stand'}</h2>
            <p>{result ? 'These results are saved locally on this device for demonstration.' : 'Take a short readiness check to see your awareness level for three scam categories.'}</p>
            <Link to="/readiness" className="edu-primary-button"><GraduationCap size={19}/>{result ? 'Retake readiness check' : 'Take readiness check'}<ArrowRight size={18}/></Link>
          </div>
          <div className="edu-awareness-metrics">
            <div><span>Guides read</span><strong>{completeCount}<small> / {scamTopics.length}</small></strong><BookOpen size={22}/></div>
            <div><span>Last readiness score</span><strong>{result ? `${result.totalCorrect}/9` : '—'}</strong><TrendingUp size={22}/></div>
            <div><span>Categories assessed</span><strong>{result ? '3/3' : '0/3'}</strong><CheckCircle2 size={22}/></div>
          </div>
        </div>

        <div className="edu-section-heading edu-awareness-heading">
          <div><span className="edu-section-eyebrow">BY SCAM CATEGORY</span><h2>Your awareness levels</h2><p>{result ? 'Based on your most recent practice attempt.' : 'Complete a readiness check to reveal your levels.'}</p></div>
        </div>
        <div className="edu-level-grid">
          {categories.map((item) => (
            <article className="edu-level-card" key={item.code}>
              <div className="edu-level-card-top"><span className="edu-level-icon"><ShieldCheck size={22}/></span><span className={`edu-level-pill ${item.level.toLowerCase().replace(' ', '-')}`}>{item.level}</span></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="edu-level-score"><strong>{item.percent == null ? 'Not assessed' : `${item.percent}%`}</strong><span>{item.percent == null ? 'Take the check to get your score' : 'Latest category score'}</span></div>
              <div className="edu-progress-track" aria-label={`${item.title}: ${item.percent ?? 0}%`} role="progressbar" aria-valuenow={item.percent ?? 0} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${item.percent ?? 0}%` }}/></div>
              <Link to={`/education/${item.topicId}`}>Explore learning guide <ChevronRight size={18}/></Link>
            </article>
          ))}
        </div>
        <section className="edu-awareness-explainer">
          <div className="edu-detail-title"><span className="edu-detail-title-icon"><Info size={21}/></span><div><h2>How are awareness levels determined?</h2><p>Your practice score is calculated separately for each scam category.</p></div></div>
          <div className="edu-level-legend"><div><span className="edu-level-pill beginner">Beginner</span><strong>Below 50%</strong><p>Start with the basics and learn common warning signs.</p></div><div><span className="edu-level-pill developing">Developing</span><strong>50–79%</strong><p>Good progress. Keep practising tricky situations.</p></div><div><span className="edu-level-pill confident">Confident</span><strong>80–100%</strong><p>Strong awareness. Keep checking unfamiliar requests.</p></div></div>
        </section>
        <section className="edu-check-banner edu-awareness-footer"><span className="edu-check-icon"><RotateCcw size={26}/></span><div><h2>Learning never stops</h2><p>Explore more guides and practise verifying unusual requests.</p></div><Link to="/education" className="edu-secondary-button">Browse education <ArrowRight size={18}/></Link></section>
        <p className="edu-demo-note">Practice-only awareness results are stored in browser local storage; they do not update your bank profile or reward points.</p>
      </div>
    </main>
  );
}
export default Awareness;
