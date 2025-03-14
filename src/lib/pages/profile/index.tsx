import { ChevronRight } from 'lucide-react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-5">
      <div className="flex items-center space-x-3">
        <button aria-label="back" type="button" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={20} />
        </button>
        <p className="text-xl font-semibold">User Profile</p>
      </div>

      <div className="mt-5 space-y-3">
        <a
          href="https://t.me/+kBh3jiVW4OFmNDJk"
          className="flex items-center justify-between rounded-lg bg-white p-3"
        >
          <div className="flex items-center space-x-2">
            <img src="/assets/telegram.svg" alt="telegram" />
            <div>
              <p className="text-sm">Support</p>
              <p className="text-xs text-gray-500">
                Need help? Reach out to us on Telegram.
              </p>
            </div>
          </div>
          <ChevronRight />
        </a>
      </div>
    </div>
  );
};

export default Profile;
