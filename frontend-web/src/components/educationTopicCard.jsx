import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark, BookmarkCheck, CheckCircle2, Clock3 } from 'lucide-react';
import { educationIcons } from './educationIcons';

function EducationTopicCard({ topic, saved, completed, onToggleSaved }) {
  const Icon = educationIcons[topic.icon] || educationIcons.landmark;

  return (
    <article className="edu-topic-card">
      <div className="edu-topic-top">
        <div className="edu-topic-icon"><Icon size={26} aria-hidden="true" /></div>
        <button
          type="button"
          className="edu-icon-button"
          aria-label={saved ? `Remove ${topic.title} from saved` : `Save ${topic.title}`}
          aria-pressed={saved}
          onClick={() => onToggleSaved(topic.id)}
        >
          {saved ? <BookmarkCheck size={21} /> : <Bookmark size={21} />}
        </button>
      </div>
      <span className="edu-topic-category">{topic.category}</span>
      <h3>{topic.title}</h3>
      <p>{topic.summary}</p>
      <div className="edu-topic-bottom">
        <span className="edu-time"><Clock3 size={15} /> {topic.minutes} min read</span>
        {completed && <span className="edu-completed"><CheckCircle2 size={15} /> Read</span>}
      </div>
      <Link className="edu-card-link" to={`/education/${topic.id}`}>
        Read guide <ArrowUpRight size={17} />
      </Link>
    </article>
  );
}

export default EducationTopicCard;
