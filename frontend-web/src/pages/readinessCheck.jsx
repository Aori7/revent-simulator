import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, CircleHelp, GraduationCap, RotateCcw, ShieldCheck } from 'lucide-react';
import useDemoLearning from '../hooks/useDemoLearning';
import { awarenessCategories, getAwarenessLevel, readinessQuestions } from '../data/educationData';
import '../css/education.css';

function ReadinessCheck() {
  const { saveReadiness } = useDemoLearning();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const current = readinessQuestions[step];
  const hasSelected = answers[current?.id] !== undefined;

  function submitQuiz() {
    const categoryScores = {};
    for (const category of awarenessCategories) {
      const questions = readinessQuestions.filter((question) => question.category === category.code);
      const correct = questions.filter((question) => answers[question.id] === question.correct).length;
      categoryScores[category.code] = { correct, max: questions.length, percentage: Math.round((correct / questions.length) * 100) };
    }
    const totalCorrect = Object.values(categoryScores).reduce((total, entry) => total + entry.correct, 0);
    saveReadiness({ categoryScores, totalCorrect, completedAt: new Date().toISOString() });
    setShowResults(true);
  }

  const restart = () => { setStep(0); setAnswers({}); setShowResults(false); };

  if (showResults) {
    const scores = awarenessCategories.map((category) => {
      const questions = readinessQuestions.filter((question) => question.category === category.code);
      const correct = questions.filter((question) => answers[question.id] === question.correct).length;
      const percentage = Math.round(correct / questions.length * 100);
      return { ...category, correct, percentage, level: getAwarenessLevel(percentage) };
    });
    const total = scores.reduce((count, result) => count + result.correct, 0);
    return <main className="edu-page"><div className="edu-container edu-quiz-container">
      <span className="edu-eyebrow"><CheckCircle2 size={18}/> PRACTICE COMPLETE</span>
      <div className="edu-results-card"><span className="edu-results-icon"><GraduationCap size={34}/></span><h1>Your readiness results</h1><p className="edu-results-number">{total}<span> / 9</span></p><p>Great job taking time to practise. Your score is a learning guide, not a guarantee that any request is safe.</p></div>
      <div className="edu-results-breakdown"><h2>Your scores by scam type</h2>{scores.map((item) => <div key={item.code}><div><strong>{item.title}</strong><span className={`edu-level-pill ${item.level.toLowerCase()}`}>{item.level}</span></div><span>{item.correct}/3 correct ({item.percentage}%)</span></div>)}</div>
      <div className="edu-results-actions"><Link to="/awareness" className="edu-primary-button">View awareness levels <ArrowRight size={18}/></Link><button type="button" className="edu-outline-button" onClick={restart}><RotateCcw size={18}/> Try again</button></div>
      <p className="edu-demo-note">This is a frontend demo: answers and scoring are currently visible in source code. Real grading must be performed on the backend.</p>
    </div></main>;
  }

  return <main className="edu-page"><div className="edu-container edu-quiz-container">
    <Link to="/awareness" className="edu-back-link"><ArrowLeft size={18}/> Back to Awareness</Link>
    <div className="edu-quiz-header"><span className="edu-eyebrow"><ShieldCheck size={17}/> SCAM READINESS CHECK</span><h1>Let's test what you know</h1><p>9 questions · 3 scam categories · Choose the safest response. “I'm not sure” is always okay.</p></div>
    <div className="edu-quiz-main">
      <div className="edu-quiz-progress-info"><span>Question {step + 1} of {readinessQuestions.length}</span><span>{Math.round((step / readinessQuestions.length) * 100)}% completed</span></div>
      <div className="edu-progress-track"><span style={{ width: `${(step / readinessQuestions.length) * 100}%` }}/></div>
      <div className="edu-quiz-question"><span className="edu-quiz-topic">{awarenessCategories.find((entry) => entry.code === current.category)?.title}</span><h2>{current.text}</h2><fieldset><legend className="edu-visually-hidden">Select your answer</legend>
        {current.options.map((option, index) => <label key={option} className={`edu-quiz-option ${answers[current.id] === index ? 'selected' : ''}`}><input type="radio" name={`question-${current.id}`} checked={answers[current.id] === index} onChange={() => setAnswers((previous) => ({ ...previous, [current.id]: index }))}/><span className="edu-quiz-option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span><span className="edu-radio-indicator"/></label>)}
      </fieldset></div>
      <div className="edu-quiz-actions"><button type="button" className="edu-outline-button" onClick={() => setStep((prev) => prev - 1)} disabled={step === 0}><ArrowLeft size={17}/> Previous</button>
        {step === readinessQuestions.length - 1
          ? <button type="button" className="edu-primary-button" disabled={!hasSelected} onClick={submitQuiz}>See my results <CheckCircle2 size={18}/></button>
          : <button type="button" className="edu-primary-button" disabled={!hasSelected} onClick={() => setStep((prev) => prev + 1)}>Next question <ArrowRight size={18}/></button>}
      </div>
    </div>
    <div className="edu-quiz-notice"><CircleHelp size={20}/><p>This check is for learning. In a real transfer, always verify suspicious requests independently.</p></div>
  </div></main>;
}

export default ReadinessCheck;
