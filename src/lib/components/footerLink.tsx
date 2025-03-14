import type { IconType } from 'react-icons/lib';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '../styles/utils';

const FooterLink = ({
  icon: Icon,
  text,
  link,
  index = false,
}: {
  icon: IconType;
  text: string;
  link: string;
  index?: boolean;
}) => {
  const location = useLocation();
  return (
    <Link
      to={link}
      className={cn(
        'flex flex-col items-center space-y-1 text-[#919191]',
        !index && location.pathname.startsWith(link) && 'text-[#036937]',
        index && location.pathname === link && 'text-[#036937]'
      )}
    >
      <Icon className="aspect-square w-4" />
      <p className="text-xs">{text}</p>
    </Link>
  );
};

export default FooterLink;
