import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

import useLoginMutation from '@/api/auth';
import { getCookie, removeCookie, setCookie } from '@/lib/utils/cookies';

const AuthWatcher = () => {
  const { address } = useAccount();
  const { mutateAsync: login } = useLoginMutation();
  const prevAddressRef = useRef(address);
  const attemptedAddressRef = useRef<string | null>(null);

  useEffect(() => {
    const token = getCookie('accessToken');

    const handleLogoutAndLogin = async (newAddress: string) => {
      // Don't retry if we already attempted for this address in this session
      if (attemptedAddressRef.current === newAddress) return;
      attemptedAddressRef.current = newAddress;

      removeCookie('accessToken');
      try {
        const res = await login({ oxAddress: newAddress });
        if (res.tokens.accessToken) {
          setCookie('accessToken', res.tokens.accessToken);
          toast.success('Successfully re-authenticated');
          window.location.reload();
        }
      } catch (err) {
        // Only error if we actually tried to change address or were previously logged in
        if (prevAddressRef.current === newAddress) {
          console.error('Auto-login failed', err);
        } else {
          toast.error('Failed to re-authenticate with new wallet');
        }
      }
    };

    // Case 1: Wallet address changed
    if (
      prevAddressRef.current &&
      address &&
      prevAddressRef.current !== address
    ) {
      toast.info('Wallet address changed. Re-authenticating...');
      handleLogoutAndLogin(address);
    }
    // Case 2: Wallet disconnected but we have a token
    else if (prevAddressRef.current && !address && token) {
      removeCookie('accessToken');
      window.location.href = '/';
    }
    // Case 3: Address exists but no token (e.g. after 401 logout or fresh load)
    else if (address && !token) {
      handleLogoutAndLogin(address);
    }

    prevAddressRef.current = address;
  }, [address, login]);

  return null;
};

export default AuthWatcher;
