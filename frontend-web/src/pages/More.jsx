import { Link } from 'react-router-dom';
import {Wallet,CreditCard,Settings,ChevronRight,BookOpenCheck} from 'lucide-react';

function More() {
  const services = [
    {
      title: 'Accounts',
      description: 'View your bank accounts',
      icon: Wallet,
      path: '/accounts'
    },
    {
      title: 'Cards',
      description: 'Manage your debit cards',
      icon: CreditCard,
      path: '/cards'
    },
    {
      title: 'Settings',
      description: 'Manage your preferences',
      icon: Settings,
      path: '/settings'
    },
    {
      title: 'Scam Education',
      description: 'Learn the warning signs and how to verify safely',
      icon: BookOpenCheck,
      path: '/Education'
    },
  ];

  return (
    <main className="placeholder-page">
      <h1>More Services</h1>
      <p>Explore additional REVENT banking services.</p>

      <div className="more-services-list">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <Link
              key={service.title}
              to={service.path}
              className="more-service-item"
            >
              <Icon size={28} />

              <div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>

              <ChevronRight size={24} />
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default More;
