import { FaSpinner } from 'react-icons/fa6';

const Loader = () => {
  return (
    <div className="mx-auto flex">
      <FaSpinner className="h-24 animate-spin" />
    </div>
  );
};

export default Loader;
