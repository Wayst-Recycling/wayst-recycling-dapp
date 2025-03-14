import { FaUser } from 'react-icons/fa6';
import { FiFileText } from 'react-icons/fi';
import { HiHome } from 'react-icons/hi2';
import { IoCalendarOutline } from 'react-icons/io5';

import FooterLink from '../components/footerLink';

const Footer = () => {
  return (
    <div className="fixed bottom-0 flex w-full max-w-lg items-center justify-between border-t bg-white px-[5%] py-6">
      <FooterLink index icon={HiHome} text="Home" link="/" />
      <FooterLink icon={IoCalendarOutline} text="Schedule" link="/schedule" />
      <FooterLink icon={FiFileText} text="History" link="/history" />
      <FooterLink icon={FaUser} text="Profile" link="/profile" />
    </div>
  );
};

export default Footer;
