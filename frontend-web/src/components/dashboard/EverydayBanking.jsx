import {Send,ScanLine,ArrowLeftRight,ReceiptText,UsersRound,Grid2X2} from 'lucide-react';
import QuickAction from './QuickAction';
import PayNowQR from '../../assets/PayNowLogo.png';

const bankingActions = [
  {
    id: 'paynow',
    title: 'PayNow',
    description: 'Send instantly',
    icon: PayNowQR
  },
  {
    id: 'scan',
    title: 'Scan & Pay',
    description: 'Pay with a QR',
    icon: ScanLine
  },
  {
    id: 'transfer',
    title: 'Transfer',
    description: 'Local & overseas',
    icon: ArrowLeftRight
  },
  {
    id: 'bills',
    title: 'Pay bills',
    description: 'Bills & utilities',
    icon: ReceiptText
  },
  {
    id: 'payees',
    title: 'Manage payees',
    description: 'Your recipients',
    icon: UsersRound
  },
  {
    id: 'more',
    title: 'More services',
    description: 'All banking tools',
    icon: Grid2X2
  }
];

function EverydayBanking() {
  return (
    <section className="everyday-banking">
      <h2>EVERYDAY BANKING</h2>

      <div className="banking-actions">
        {bankingActions.map((action) => (
          <QuickAction
            key={action.id}
            icon={action.icon}
            title={action.title}
            description={action.description}
          />
        ))}
      </div>
    </section>
  );
}

export default EverydayBanking;