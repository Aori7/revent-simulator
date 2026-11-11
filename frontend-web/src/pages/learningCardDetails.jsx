import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2,
  ChevronLeft, Play, ShieldAlert,
  ShieldCheck, Video
} from 'lucide-react';
import useDemoLearning from '../hooks/useDemoLearning';
import { getAwarenessLevel, lessonScenarios, scamTopics } from '../data/educationData';
import '../css/education.css';

const practiceOptions = [
  'Follow the instructions because the voice or video seems familiar',
  'End the conversation and verify using a number or channel I already trust',
  'Ask the sender to provide another recording as proof'
];

function LearningCardLesson({ topic, learning, toggleSaved, markCompleted }) {
  const [screen, setScreen] = useState('scenario');
  const [practiceChoice, setPracticeChoice] = useState(null);

  const categoryScore = learning.lastReadiness?.categoryScores?.[topic.categoryCode];
  const percentage = categoryScore?.percentage ?? null;
  const level = percentage === null ? null : getAwarenessLevel(percentage);
  // New customers see the beginner explanation as a preview, but no score is invented.
  const scenarioTier = level ?? 'Beginner';
  const scenarioSet = lessonScenarios[topic.id];
  const scenario = scenarioSet?.[scenarioTier] ?? {
    scene: topic.introduction,
    redFlags: topic.redFlags,
    mediaLabel: 'Suspicious request'
  };
  const heading = scenarioSet?.heading ?? topic.title;
  const saved = learning.savedIds.includes(topic.id);

  const finishLesson = () => {
    markCompleted(topic.id);
    setScreen('complete');
  };

  return (
    <main className="edu-page edu-lesson-page">
      <div className="edu-container edu-lesson-shell">
        {screen !== 'complete' && screen !== 'practice' ? (
          <>
            <div className="edu-lesson-topbar">
              <Link to="/education" className="edu-lesson-back"><ArrowLeft size={19}/><span>{heading}</span></Link>
            </div>
            <div className="edu-lesson-score">
              <div className="edu-lesson-score-top">
                <span>{level ? 'Your scam awareness level' : 'Your scam awareness level · Not assessed'}</span>
                {level && <strong className={`edu-lesson-level ${level.toLowerCase()}`}>{level}</strong>}
              </div>
              <div className="edu-lesson-score-bottom">
                <div className={`edu-lesson-progress ${level?.toLowerCase() || ''}`} role="progressbar" aria-label="Latest category awareness score" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage ?? 0}>
                  <span style={{ width: `${percentage ?? 0}%` }}/>
                </div>
                <span>{percentage === null ? '—' : `${percentage}%`}</span>
              </div>
              {!level && <p className="edu-lesson-unassessed">Showing the beginner scenario. <Link to="/readiness">Take the readiness check</Link> to get your level.</p>}
            </div>
            <article className="edu-flip-card">
              <header className="edu-flip-card-heading">
                <h1>{screen === 'scenario' ? 'How it unfolds' : 'Red Flags'}</h1>
                <button type="button" onClick={() => toggleSaved(topic.id)} className="edu-lesson-bookmark" aria-label={saved ? 'Remove saved learning card' : 'Save learning card'} aria-pressed={saved}>
                  {saved ? <BookmarkCheck size={20}/> : <Bookmark size={20}/>}
                </button>
              </header>

              {screen === 'scenario' ? (
                <>
                  <div className="edu-lesson-media" role="img" aria-label={`Illustrative placeholder: ${scenario.mediaLabel}`}>
                    <span className="edu-lesson-media-icon"><Video size={40}/></span>
                    <span>{scenario.mediaLabel}</span>
                  </div>
                  <div className="edu-lesson-content">
                    <p>{scenario.scene}</p>
                    <button type="button" className="edu-flip-button" onClick={() => setScreen('redFlags')}>
                      Tap to reveal the red flags <ArrowRight size={18}/>
                    </button>
                  </div>
                </>
              ) : (
                <div className="edu-lesson-flags">
                  <ul>{scenario.redFlags.map((flag) => <li key={flag}>{flag}</li>)}</ul>
                  <div className="edu-lesson-flags-actions">
                    <button className="edu-lesson-finish" type="button" onClick={finishLesson}>I've reviewed the red flags — Finish lesson <CheckCircle2 size={17}/></button>
                    <button type="button" className="edu-flip-button" onClick={() => setScreen('scenario')}><ChevronLeft size={18}/> Tap to look back at the scenario</button>
                  </div>
                </div>
              )}
            </article>
            <p className="edu-lesson-note">The scenario is fictional and used for education. A familiar face or voice alone is not proof of identity.</p>
          </>
        ) : screen === 'complete' ? (
          <div className="edu-lesson-done" role="status">
            <span className="edu-done-icon"><CheckCircle2 size={53}/></span>
            <p className="edu-done-percentage">100%</p>
            <h1>Lesson Complete!</h1>
            <p>You've learned how this scam may unfold, which warning signs to recognise and why it's important to verify independently.</p>
            <button type="button" className="edu-done-action" onClick={() => { setPracticeChoice(null); setScreen('practice'); }}>Practise with a Scam Scenario <Play size={17}/></button>
            <Link className="edu-done-back" to="/education">Back to learning cards</Link>
            <small>100% refers to this lesson's completion, not your readiness assessment score.</small>
          </div>
        ) : (
          <section className="edu-lesson-practice">
            <button type="button" className="edu-lesson-back" onClick={() => setScreen('complete')}><ChevronLeft size={18}/> Back to lesson</button>
            <span className="edu-section-eyebrow">INTERACTIVE PRACTICE PREVIEW</span>
            <h1>What would you do?</h1>
            <p>A person who seems familiar asks you to send money urgently. The voice or video looks convincing, but the contact details are unfamiliar.</p>
            <div className="edu-practice-options" role="group" aria-label="Choose your response">
              {practiceOptions.map((option, index) => <button key={option} type="button" className={practiceChoice === index ? 'selected' : ''} aria-pressed={practiceChoice === index} onClick={() => setPracticeChoice(index)}>{option}</button>)}
            </div>
            {practiceChoice !== null && <div className={`edu-practice-feedback ${practiceChoice === 1 ? 'correct' : ''}`} role="status">
              {practiceChoice === 1 ? <ShieldCheck size={20}/> : <ShieldAlert size={20}/>}<p>{practiceChoice === 1 ? 'Good choice. Verify through an independent, trusted channel before transferring any money.' : 'That could still be a scam. AI can imitate a face or voice, and another recording is not independent verification.'}</p>
            </div>}
            <div className="edu-practice-actions"><button type="button" onClick={() => setPracticeChoice(null)}>Try again</button><Link to="/readiness">Take full readiness check <ArrowRight size={16}/></Link></div>
            <p className="edu-lesson-note">This is a hardcoded scenario preview; it does not change your readiness score or connect to Twine.</p>
          </section>
        )}
      </div>
    </main>
  );
}

function EducationDetail() {
  const { topicId } = useParams();
  const topic = scamTopics.find((item) => item.id === topicId);
  const { learning, toggleSaved, markCompleted } = useDemoLearning();

  if (!topic) {
    return <main className="edu-page"><div className="edu-container edu-not-found"><h1>Learning card not found</h1><Link to="/education">Back to Scam Education</Link></div></main>;
  }

  // A new component instance when the URL's topic changes resets the flip-card state.
  return <LearningCardLesson key={topic.id} topic={topic} learning={learning} toggleSaved={toggleSaved} markCompleted={markCompleted}/>;
}

export default EducationDetail;
