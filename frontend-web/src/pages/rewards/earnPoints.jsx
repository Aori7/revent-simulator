import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Medal, ShieldCheck } from 'lucide-react';
import { earnPointTasks } from '../../data/rewardsData';
import { RewardHeading } from '../../components/rewardUI';

export default function EarnPoints() {
  return <main className="rw-page"><div className="rw-container rw-narrow">
    <RewardHeading title="Earn Points" subtitle="Explore ways to build scam awareness"/>
    <div className="rw-earn-tasks">{earnPointTasks.map((task) =>
      <Link key={task.id} to={task.path} className="rw-task-card">
        <span className="rw-task-icon">{task.id === 'learning' ? <BookOpen/> : task.id === 'practice' ? <ShieldCheck/> : <Medal/>}</span>
        <span><strong>{task.title}</strong><small>{task.description}</small></span>
        {task.points ? <span className="rw-earn-pill">+{task.points} pts</span> : <ChevronRight size={20}/>}
      </Link>)}</div>
    <p className="rw-demo-note">Completing each Beginner, Developing or Confident learning card awards 10 demo points once. Other reward rules will be connected later.</p>
  </div></main>;
}


