import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpenCheck, CheckCircle2, ChevronRight, CircleAlert, Flag,
  GraduationCap, Search, ShieldCheck, SlidersHorizontal, Sparkles
} from 'lucide-react';
import EducationTopicCard from '../components/EducationTopicCard';
import useDemoLearning from '../hooks/useDemoLearning';
import { quickTips, scamTopics, topicCategories } from '../data/educationData';
import '../css/education.css';

const quickIcons = { flag: Flag, shield: ShieldCheck, check: CheckCircle2 };

function Education() {
  const [category, setCategory] = useState('All topics');
  const [query, setQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const { learning, toggleSaved } = useDemoLearning();

  const matchingTopics = useMemo(() => scamTopics.filter((topic) => {
    const inCategory = category === 'All topics' || topic.category === category;
    const matchesQuery = `${topic.title} ${topic.summary} ${topic.category}`.toLowerCase().includes(query.toLowerCase().trim());
    return inCategory && matchesQuery && (!onlySaved || learning.savedIds.includes(topic.id));
  }), [category, query, onlySaved, learning.savedIds]);

  return (
    <main className="edu-page">
      <div className="edu-container">
        <div className="edu-page-heading">
          <span className="edu-eyebrow"><BookOpenCheck size={16} /> LEARN & STAY SAFER</span>
          <h1>Scam Education</h1>
          <p>Learn how to recognise suspicious requests, verify safely and protect your money.</p>
        </div>

        <section className="edu-hero" aria-label="Education introduction">
          <div className="edu-hero-content">
            <span className="edu-hero-kicker"><Sparkles size={16} /> A little knowledge goes a long way</span>
            <h2>Stay scam-smart.</h2>
            <p>Impersonation, deepfake and payment scams can feel convincing. Know the signs before you send.</p>
            <Link to="/awareness" className="edu-primary-button edu-hero-button">
              Explore your awareness <ArrowRight size={18}/>
            </Link>
          </div>
          <div className="edu-hero-art" aria-hidden="true">
            <span className="edu-art-ring edu-art-ring-one" />
            <span className="edu-art-ring edu-art-ring-two" />
            <div className="edu-art-phone"><div className="edu-art-camera"/><CircleAlert size={56}/><span>Unknown caller</span></div>
            <div className="edu-art-shield"><ShieldCheck size={50}/></div>
          </div>
        </section>

        <section className="edu-section" aria-labelledby="edu-tips-heading">
          <div className="edu-section-heading">
            <div>
              <span className="edu-section-eyebrow">THE ESSENTIALS</span>
              <h2 id="edu-tips-heading">Quick learn cards</h2>
              <p>Small habits that help you make safer decisions.</p>
            </div>
          </div>
          <div className="edu-quick-grid">
            {quickTips.map((tip, index) => {
              const Icon = quickIcons[tip.icon];
              return (
                <Link to={`/education/${tip.topicId}`} key={tip.title} className={`edu-quick-tip edu-quick-tip-${index + 1}`}>
                  <span className="edu-quick-icon"><Icon size={25}/></span>
                  <strong>{tip.title}</strong>
                  <span>{tip.subtitle}</span>
                  <ChevronRight size={19} className="edu-quick-arrow"/>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="edu-section edu-topics-section" aria-labelledby="edu-topics-heading">
          <div className="edu-section-heading edu-section-heading-inline">
            <div>
              <span className="edu-section-eyebrow">EXPLORE THE LIBRARY</span>
              <h2 id="edu-topics-heading">Learn about common scams</h2>
              <p>Short guides based on situations you might encounter.</p>
            </div>
            <span className="edu-topic-count">{matchingTopics.length} guides</span>
          </div>
          <div className="edu-filters">
            <div className="edu-category-list" aria-label="Filter topics by category">
              {topicCategories.map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={category === name}
                  className={`edu-filter-chip ${category === name ? 'active' : ''}`}
                  onClick={() => setCategory(name)}
                >{name}</button>
              ))}
            </div>
            <div className="edu-search-row">
              <label className="edu-search">
                <Search size={18}/>
                <span className="edu-visually-hidden">Search guides</span>
                <input type="search" placeholder="Search scam guides" value={query} onChange={(event) => setQuery(event.target.value)}/>
              </label>
              <button
                type="button"
                className={`edu-saved-filter ${onlySaved ? 'active' : ''}`}
                onClick={() => setOnlySaved((value) => !value)}
                aria-pressed={onlySaved}
              >
                <SlidersHorizontal size={17}/> {onlySaved ? 'Saved only' : 'Show saved'}
              </button>
            </div>
          </div>
          {matchingTopics.length ? (
            <div className="edu-topic-grid">
              {matchingTopics.map((topic) => (
                <EducationTopicCard
                  key={topic.id}
                  topic={topic}
                  saved={learning.savedIds.includes(topic.id)}
                  completed={learning.completedIds.includes(topic.id)}
                  onToggleSaved={toggleSaved}
                />
              ))}
            </div>
          ) : (
            <div className="edu-empty-state">
              <Search size={28}/>
              <h3>No guides found</h3>
              <p>Try another search or category.</p>
              <button type="button" onClick={() => { setQuery(''); setCategory('All topics'); setOnlySaved(false); }}>Clear filters</button>
            </div>
          )}
        </section>

        <section className="edu-check-banner">
          <span className="edu-check-icon"><GraduationCap size={27}/></span>
          <div><h2>How ready are you to spot a scam?</h2><p>Try a short 9-question readiness check. Practice results stay in this browser.</p></div>
          <Link to="/readiness" className="edu-secondary-button">Take a quick check <ArrowRight size={18}/></Link>
        </section>
        <p className="edu-demo-note">Prototype content for learning purposes. These examples are not live scam alerts or bank-issued advisories.</p>
      </div>
    </main>
  );
}

export default Education;
