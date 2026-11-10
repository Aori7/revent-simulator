import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, Clock3,
  Info, ListChecks, MessageSquareWarning, ShieldCheck, TriangleAlert
} from 'lucide-react';
import { educationIcons } from '../components/educationIcons';
import useDemoLearning from '../hooks/useDemoLearning';
import { scamTopics } from '../data/educationData';
import '../css/education.css';

function StepList({ entries, ordered = false }) {
  const Element = ordered ? 'ol' : 'ul';
  return (
    <Element className={`edu-detail-list ${ordered ? 'edu-detail-ordered' : ''}`}>
      {entries.map((entry, index) => <li key={entry}>
        <span className="edu-detail-marker">{ordered ? index + 1 : <CheckCircle2 size={18}/>}</span>
        <span>{entry}</span>
      </li>)}
    </Element>
  );
}

function EducationDetail() {
  const { topicId } = useParams();
  const topic = scamTopics.find((item) => item.id === topicId);
  const { learning, toggleSaved, markCompleted } = useDemoLearning();

  if (!topic) {
    return <main className="edu-page"><div className="edu-container edu-not-found"><h1>Guide not found</h1><p>This topic may have been moved.</p><Link to="/education">Back to Education</Link></div></main>;
  }

  const Icon = educationIcons[topic.icon];
  const saved = learning.savedIds.includes(topic.id);
  const completed = learning.completedIds.includes(topic.id);
  const recommended = scamTopics.filter((item) => item.id !== topic.id && item.category === topic.category).slice(0, 2);

  return (
    <main className="edu-page edu-detail-page">
      <div className="edu-container edu-detail-container">
        <Link className="edu-back-link" to="/education"><ArrowLeft size={18}/> Back to Scam Education</Link>
        <header className="edu-detail-header">
          <div>
            <span className="edu-eyebrow">SCAM EDUCATION / {topic.category.toUpperCase()}</span>
            <h1>{topic.title} Scam</h1>
            <div className="edu-detail-badges"><span><Clock3 size={16}/> {topic.minutes} min read</span><span>{topic.difficulty}-friendly</span></div>
          </div>
          <button type="button" className="edu-detail-bookmark" onClick={() => toggleSaved(topic.id)} aria-pressed={saved}>
            {saved ? <BookmarkCheck size={19}/> : <Bookmark size={19}/>} {saved ? 'Saved' : 'Save guide'}
          </button>
        </header>

        <section className="edu-detail-intro">
          <div><span>KNOW THE PATTERN</span><p>{topic.introduction}</p></div>
          <div className="edu-detail-intro-art" aria-hidden="true"><Icon size={82}/><ShieldCheck size={37}/></div>
        </section>

        <section className="edu-detail-section">
          <div className="edu-detail-title"><span className="edu-detail-title-icon"><Info size={21}/></span><div><h2>How it unfolds</h2><p>How a scammer might approach you</p></div></div>
          <StepList entries={topic.unfolds} ordered/>
        </section>
        <section className="edu-detail-section edu-warning-section">
          <div className="edu-detail-title"><span className="edu-detail-title-icon"><TriangleAlert size={23}/></span><div><h2>Common red flags</h2><p>Pause when you notice any of these signs</p></div></div>
          <div className="edu-redflag-grid">{topic.redFlags.map((flag) => <div className="edu-redflag" key={flag}><TriangleAlert size={18}/><p>{flag}</p></div>)}</div>
        </section>
        <section className="edu-detail-section">
          <div className="edu-detail-title"><span className="edu-detail-title-icon edu-positive"><ShieldCheck size={23}/></span><div><h2>How to verify independently</h2><p>Simple steps to confirm a request is genuine</p></div></div>
          <StepList entries={topic.verify}/>
        </section>
        <section className="edu-detail-section">
          <div className="edu-detail-title"><span className="edu-detail-title-icon"><ListChecks size={23}/></span><div><h2>What to do next</h2><p>If something feels suspicious</p></div></div>
          <StepList entries={topic.next} ordered/>
        </section>
        <section className="edu-message-example"><MessageSquareWarning size={26}/><div><h2>Example suspicious message</h2><blockquote>{topic.example}</blockquote><p>Fictional example for awareness practice.</p></div></section>
        <section className="edu-detail-finish">
          <div><h2>{completed ? 'Guide marked as read' : 'Finished reading?'}</h2><p>{completed ? 'You can revisit this guide whenever you need a reminder.' : 'Mark this guide as read to track your learning on this device.'}</p></div>
          <button type="button" className="edu-primary-button" onClick={() => markCompleted(topic.id)} disabled={completed}>
            <CheckCircle2 size={18}/> {completed ? 'Completed' : 'Mark as read'}
          </button>
        </section>
        {recommended.length > 0 && <section className="edu-detail-related"><h2>Keep learning</h2><div>{recommended.map((item) => <Link key={item.id} to={`/education/${item.id}`}>{item.title}<ArrowRight size={18}/></Link>)}</div></section>}
        <p className="edu-demo-note">Educational prototype. Contact your bank using official channels if you suspect an actual scam.</p>
      </div>
    </main>
  );
}
export default EducationDetail;
