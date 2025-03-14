import { toast } from 'react-toastify';

export const emitCommingSoonToast = () => {
  toast('Hang tight this feature is coming soon', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    style: { backgroundColor: '#E1F2EA', color: 'black', fontSize: '12px' },
  });
};
