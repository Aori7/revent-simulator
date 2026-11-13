import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Bookmark, CheckCircle2, ChevronDown,
  ChevronRight, CircleAlert, Flag, GraduationCap, Search, ShieldCheck,
  Sparkles, Video
} from 'lucide-react';
import EducationTopicCard from '../components/EducationTopicCard';
import useDemoLearning from '../hooks/useDemoLearning';
import {
  awarenessCategories, getAwarenessLevel, quickTips, scamTopics, topicCategories
} from '../data/educationData';
import '../css/education.css';

const quickIcons = { flag: Flag, shield: ShieldCheck, video: Video, check: CheckCircle2 };

function Education() {
  const [category, setCategory] = useState('All topics');
  const [query, setQuery] = useState('');
  const [savedOpen, setSavedOpen] = useState(false);
  const [expandedTip, setExpandedTip] = useState(null);
  const { learning, toggleSaved } = useDemoLearning();

  const matchingTopics = useMemo(() => scamTopics.filter((topic) => {
    const inCategory = category === 'All topics' || topic.category === category;
    const matchesQuery = `${topic.title} ${topic.summary} ${topic.category}`
      .toLowerCase().includes(query.toLowerCase().trim());
    return inCategory && matchesQuery;
  }), [category, query]);

  const savedTopics = scamTopics.filter((topic) => learning.savedIds.includes(topic.id));
  const latestScores = learning.lastReadiness?.categoryScores;

  return (
    <main className="edu-page">
      <div className="edu-container">
        <header className="edu-page-heading">
          <h1>Scam Education</h1>
          <p>Understand how AI-powered scams work, spot warning signs and verify requests before sending money.</p>
        </header>

        <section className="edu-hero" aria-label="Education introduction">
          <div className="edu-hero-content">
            <span className="edu-hero-kicker"><Sparkles size={16} /> Stay informed. Stay in control.</span>
            <h2>Stay scam-smart.</h2>
            <p>AI-generated voices, convincing videos and impersonation messages can feel real. Learn to verify before you act.</p>
          </div>
          <div className="edu-hero-art" aria-hidden="true">
            <span className="edu-art-ring edu-art-ring-one" />
            <span className="edu-art-ring edu-art-ring-two" />
            <div className="edu-art-phone"><div className="edu-art-camera"/><CircleAlert size={56}/><span>Unexpected request</span></div>
            <div className="edu-art-shield"><ShieldCheck size={50}/></div>
          </div>
        </section>

        <section className="edu-section edu-awareness-preview" aria-labelledby="edu-preview-heading">
          <div className="edu-section-heading edu-section-heading-inline">
            <div>
              <span className="edu-section-eyebrow">YOUR LEARNING JOURNEY</span>
              <h2 id="edu-preview-heading">Your scam awareness levels</h2>
              <p>{latestScores ? 'Based on your latest readiness check.' : 'Take a readiness check to discover your level in each scam category.'}</p>
            </div>
            <Link to="/awareness" className="edu-view-all">View All <ArrowRight size={17}/></Link>
          </div>
          <div className="edu-preview-grid">
            {awarenessCategories.map((item) => {
              const score = latestScores?.[item.code];
              const percentage = score?.percentage ?? null;
              const level = percentage == null ? 'Not assessed' : getAwarenessLevel(percentage);
              return (
                <article className="edu-preview-card" key={item.code}>
                  <div className="edu-preview-card-heading"><strong>{item.title}</strong><span className={`edu-level-pill ${level.toLowerCase().replace(' ', '-')}`}>{level}</span></div>
                  <div className="edu-preview-score"><span>{percentage == null ? 'Complete your check' : 'Current awareness'}</span><strong>{percentage == null ? '—' : `${percentage}%`}</strong></div>
                  <div className={`edu-progress-track edu-preview-progress ${level.toLowerCase()}`} role="progressbar" aria-label={`${item.title} awareness`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage ?? 0}>
                    <span style={{ width: `${percentage ?? 0}%` }}/>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="edu-section" aria-labelledby="edu-tips-heading">
          <div className="edu-section-heading">
            <span className="edu-section-eyebrow">USEFUL IN ANY SCAM</span>
            <h2 id="edu-tips-heading">Quick learn cards</h2>
            <p>Three safety habits that apply across different AI-powered scam situations. Tap a card for an action you can take.</p>
          </div>
          <div className="edu-quick-grid">
            {quickTips.map((tip, index) => {
              const Icon = quickIcons[tip.icon] || ShieldCheck;
              const open = expandedTip === tip.id;
              return (
                <div key={tip.id} className={`edu-quick-tip edu-quick-tip-${index + 1} ${open ? 'expanded' : ''}`}>
                  <button type="button" className="edu-quick-toggle" aria-expanded={open} aria-controls={`edu-tip-${tip.id}`} onClick={() => setExpandedTip(open ? null : tip.id)}>
                    <span className="edu-quick-icon"><Icon size={24}/></span>
                    <span className="edu-quick-copy"><strong>{tip.title}</strong><small>{tip.subtitle}</small></span>
                    <ChevronDown className="edu-quick-arrow" size={20}/>
                  </button>
                  {open && <p className="edu-quick-expanded" id={`edu-tip-${tip.id}`}>{tip.action}</p>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="edu-section edu-topics-section" aria-labelledby="edu-topics-heading">
          <div className="edu-section-heading edu-section-heading-inline">
            <div>
              <span className="edu-section-eyebrow">EXPLORE THE LIBRARY</span>
              <h2 id="edu-topics-heading">Learn about AI-powered scams</h2>
              <p>Explore how AI can make impersonation, fake advertisements and fraudulent requests more convincing.</p>
            </div>
            <span className="edu-topic-count">{matchingTopics.length} guides</span>
          </div>

          <div className="edu-saved-section">
            <div className="edu-saved-header">
              <span className="edu-saved-icon"><Bookmark size={21}/></span>
              <div className="edu-saved-heading"><strong>My saved learning cards</strong><span>{savedTopics.length ? `${savedTopics.length} bookmarked for later` : 'Bookmark a guide to find it here later'}</span></div>
              <button type="button" className="edu-saved-open" aria-expanded={savedOpen} aria-controls="edu-saved-panel" onClick={() => setSavedOpen((value) => !value)}>
                {savedOpen ? 'Hide saved' : 'View saved'} <ChevronDown size={17}/>
              </button>
            </div>
            {savedOpen && (
              <div id="edu-saved-panel" className="edu-saved-panel">
                {savedTopics.length ? (
                  <div className="edu-topic-grid">
                    {savedTopics.map((topic) => <EducationTopicCard key={topic.id} topic={topic} saved completed={learning.completedIds.includes(topic.id)} onToggleSaved={toggleSaved}/>)}
                  </div>
                ) : <p className="edu-saved-empty">You haven't saved any cards yet. Use the bookmark icon on a learning card to keep it here.</p>}
              </div>
            )}
          </div>

          <div className="edu-filters">
            <div className="edu-category-list" aria-label="Filter topics by category">
              {topicCategories.map((name) => (
                <button key={name} type="button" aria-pressed={category === name} className={`edu-filter-chip ${category === name ? 'active' : ''}`} onClick={() => setCategory(name)}>{name}</button>
              ))}
            </div>
            <label className="edu-search">
              <Search size={18}/>
              <span className="edu-visually-hidden">Search learning cards</span>
              <input type="search" placeholder="Search AI-powered scam guides" value={query} onChange={(event) => setQuery(event.target.value)}/>
            </label>
          </div>

          {matchingTopics.length ? (
            <div className="edu-topic-grid">
              {matchingTopics.map((topic) => <EducationTopicCard key={topic.id} topic={topic} saved={learning.savedIds.includes(topic.id)} completed={learning.completedIds.includes(topic.id)} onToggleSaved={toggleSaved}/>)}
            </div>
          ) : (
            <div className="edu-empty-state"><Search size={28}/><h3>No guides found</h3><p>Try a different keyword or topic.</p><button type="button" onClick={() => { setQuery(''); setCategory('All topics'); }}>Clear filters</button></div>
          )}
        </section>

        <section className="edu-check-banner">
          <span className="edu-check-icon"><GraduationCap size={27}/></span>
          <div><h2>How ready are you to spot an AI-powered scam?</h2><p>Try a short nine-question readiness check to see how you respond to suspicious requests.</p></div>
          <Link to="/readiness" className="edu-secondary-button">Take a readiness check <ChevronRight size={18}/></Link>
        </section>
        <p className="edu-demo-note">Educational prototype with fictional examples. Awareness scores and bookmarks are currently stored in this browser, not Supabase.</p>
      </div>
    </main>
  );
}

export default Education;
