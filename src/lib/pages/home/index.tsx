import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

import { useGetTotalEarning } from '../../../api/schedule';
import { CurrencySelect } from '../../components/currencySelect';
import { TotalEarningsTooltip } from '../../components/totalEarningsTooltip';
import { ROBO_URL } from '../../utils/index';
import RegistrationDrawer from '../schedule/components/RegistrationDrawer';
import useLoginMutation from '@/api/auth';
import { useClaimDailyReward } from '@/api/daily-claim';
import { useDisclosure } from '@/hooks/useDisclosure';
import Button from '@/lib/components/buttons/button';
import { getCookie, setCookie } from '@/lib/utils/cookies';
import { handleApiError } from '@/lib/utils/error-handler';
import { formatcUsd } from '@/lib/utils/format';

import FormatBalance from './components/FormatBalance';
import ScheduleList from './components/ScheduleList';
import TransactionList from './components/TransactionList';

const Home = () => {
  const { address } = useAccount();

  const { connect } = useConnect();
  const navigate = useNavigate();
  const registrationDrawer = useDisclosure();
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const { mutateAsync: login } = useLoginMutation();

  const { data: totalEarning, isPending: isLoadingTotalEarning } =
    useGetTotalEarning();

  const { mutate: claimReward, isPending: isLoadingClaimReward } =
    useClaimDailyReward();
  // const { writeContract, isPending, isError, isSuccess, isIdle, error } = useWriteContract()
  // const { data: dailyReached, isLoading: isLoading1 } = useReadContract({
  //     abi: CARUSABI,
  //     address: CARUS,
  //     functionName: 'checkDaily',
  //     account: address
  // })

  // const wait = (milliseconds: any) => {
  //     return new Promise((resolve) => {
  //         setTimeout(resolve, milliseconds);
  //     });
  // };

  // const waitPage = async () => {
  //     await wait(9000);
  //     window.location.reload();
  // }

  // const { data: accountTokenBalance, isLoading: isLoadingAccountTokenBalance } =
  //   useReadContract({
  //     abi: CARUSABI,
  //     address: CARUS,
  //     functionName: 'accountTokenBalance',
  //     args: [address],
  //   });

  // console.log(accountTokenBalance, isLoadingAccountTokenBalance);

  // const { data: transactionByAddress, isLoading: isLoading3 } = useReadContract({
  //     abi: CARUSABI,
  //     address: CARUS,
  //     functionName: 'transactionByAddressFunc',
  //     args: [address]
  // })

  // if (transactionByAddress) { console.log(transactionByAddress) }

  // if (isError) {
  //     toast.error("Error during daily mint!")
  //     console.log(error)
  // }

  // if (isPending) {
  //     toast.info("Processing daily mint")
  // }

  // if (isSuccess) {
  //     toast.success("Successful daily mint")
  //     waitPage()
  // }

  // const handleSubmit = () => {
  //     writeContract({
  //         abi: CARUSABI,
  //         address: CARUS,
  //         functionName: 'dailyMint',
  //         account: address,
  //     })
  // }

  const [searchParams] = useSearchParams();
  const value = searchParams.get('currency') || 'cusd';
  const accessToken = getCookie('accessToken');

  const handleActionClick = async (path: string) => {
    if (accessToken) {
      navigate(path);
      return;
    }

    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      const res = await login({ oxAddress: address });
      if (res.tokens.accessToken) {
        setCookie('accessToken', res.tokens.accessToken);
        navigate(path);
      }
    } catch (err) {
      setPendingPath(path);
      registrationDrawer.onOpen();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {!address && (
          <div className="flex flex-col items-center space-y-4 pt-20">
            <p className="text-lg font-medium">
              Please connect your wallet to continue.
            </p>
            <Button onClick={() => connect({ connector: injected() })}>
              Connect Wallet
            </Button>
          </div>
        )}

        {address && (
          <div className="mx-auto mt-5 flex w-full flex-col pb-20">
            <div className="flex w-full items-center justify-start space-x-2">
              <img
                src={`${ROBO_URL}/${address}`}
                alt="avatar"
                className="aspect-square w-10 rounded-full"
              />
              <div>
                <p className="text-xs">Hello, 👋🏿</p>
                <p className="text-base font-medium">
                  Welcome to Wayst Recycling!
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center space-y-5">
              <CurrencySelect />

              <div className="flex items-end space-x-1">
                <p className="text-xs">{value === 'cusd' ? 'cUSD' : 'G$'}</p>
                <FormatBalance
                  isLoading={isLoadingTotalEarning}
                  value={
                    value === 'cusd'
                      ? Number(formatcUsd(totalEarning?.cusd as number))
                      : Number(formatcUsd(totalEarning?.gd as number))
                  }
                  decimalClassName="text-xl font-semibold"
                  wholeNumberClassName="text-4xl font-semibold"
                />
              </div>

              <TotalEarningsTooltip />
            </div>

            <div className="mt-4 flex flex-col">
              <p className="text-xl font-semibold">Quick Actions</p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleActionClick('/schedule/pickup')}
                  className="flex flex-col items-center rounded-xl bg-white py-3"
                >
                  <img
                    src="/assets/pickup.png"
                    alt="pickup"
                    className="relative aspect-square w-16 object-contain"
                  />
                  <p className="mt-2 text-xs font-medium">Pickup</p>
                </button>
                <button
                  type="button"
                  disabled={isLoadingClaimReward}
                  style={{
                    filter: isLoadingClaimReward ? 'grayscale(100%)' : '',
                  }}
                  onClick={async () => {
                    if (accessToken) {
                      try {
                        await claimReward({ currency: 'gd' });
                        toast.success('Daily claim successful');
                        return;
                      } catch (error) {
                        handleApiError(error);
                      }
                    }

                    if (!accessToken) {
                      registrationDrawer.onOpen();
                    }
                  }}
                  className="flex flex-col items-center rounded-xl bg-white py-3"
                >
                  <img
                    src="/assets/gift.png"
                    alt="gift"
                    className="relative aspect-square w-16 object-contain"
                  />
                  <p className="mt-2 text-xs font-medium">Daily Claim</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleActionClick('/schedule/dropoff')}
                  className="flex flex-col items-center rounded-xl bg-white py-3"
                >
                  <img
                    src="/assets/dropoff.png"
                    alt="dropoff"
                    className="relative aspect-square w-16 object-contain"
                  />
                  <p className="mt-2 text-xs font-medium">Dropoff</p>
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold">Schedule History</p>
                <Link
                  to="/schedule"
                  className="rounded-full border bg-white p-1.5 shadow-md"
                >
                  <ChevronRight size={12} />
                </Link>
              </div>
              <ScheduleList home />
            </div>

            <div className="mt-4 flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold">Transaction History</p>
                <Link
                  to="/history"
                  className="rounded-full border bg-white p-1.5 shadow-md"
                >
                  <ChevronRight size={12} />
                </Link>
              </div>
              <TransactionList home />
            </div>
          </div>
        )}
      </div>
      <RegistrationDrawer
        isOpen={registrationDrawer.isOpen}
        onClose={registrationDrawer.onClose}
        onSuccess={() => {
          if (pendingPath) {
            navigate(pendingPath);
          }
        }}
      />
    </>
  );
};

export default Home;
