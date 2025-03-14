import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { useGetTotalEarning } from '../../../api/schedule';
import { CurrencySelect } from '../../components/currencySelect';
import FormatBalance from '../../components/formatBalance';
import { TotalEarningsTooltip } from '../../components/totalEarningsTooltip';
import TransactionCard from '../../components/transactionCard';
import { ROBO_URL } from '../../utils/index';
import { useGetTransactions } from '@/api/transaction';
import Loader from '@/lib/components/loader';
import { formatcUsd } from '@/lib/utils/format';

const Home = () => {
  const { address } = useAccount();
  const { data: transactions, isPending: isLoadingGetTransactions } =
    useGetTransactions(address as string);

  const { data: totalEarning, isPending: isLoadingTotalEarning } =
    useGetTotalEarning(address as string);

  // const { mutate: claimReward, } = useClaimDailyReward()
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

  return (
    <div className="flex flex-col items-center justify-center">
      {!address && (
        <div className="h1">Please install Metamask and connect.</div>
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
              <p className="text-base font-medium">Welcome to Carus!</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center space-y-5">
            <CurrencySelect />

            <div className="flex items-end space-x-1">
              <p className="text-xs">cUSD</p>
              <FormatBalance
                isLoading={isLoadingTotalEarning}
                value={Number(formatcUsd(totalEarning?.total as number))}
                decimalClassName="text-xl font-semibold"
                wholeNumberClassName="text-4xl font-semibold"
              />
            </div>

            <TotalEarningsTooltip />
          </div>

          <div className="mt-4 flex flex-col">
            <p className="text-xl font-semibold">Quick Actions</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <Link
                to="/schedule/pickup"
                className="flex flex-col items-center rounded-xl bg-white py-3"
              >
                <img
                  src="/assets/pickup.png"
                  alt="pickup"
                  className="relative aspect-square w-16 object-contain"
                />
                <p className="mt-2 text-xs font-medium">Pickup</p>
              </Link>
              <Link
                to="/daily-claim"
                className="flex flex-col items-center rounded-xl bg-white py-3"
              >
                <img
                  src="/assets/gift.png"
                  alt="gift"
                  className="relative aspect-square w-16 object-contain"
                />
                <p className="mt-2 text-xs font-medium">Daily Claim</p>
              </Link>
              <Link
                to="/schedule/dropoff"
                className="flex flex-col items-center rounded-xl bg-white py-3"
              >
                <img
                  src="/assets/dropoff.png"
                  alt="dropoff"
                  className="relative aspect-square w-16 object-contain"
                />
                <p className="mt-2 text-xs font-medium">Dropoff</p>
              </Link>
            </div>
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
            {transactions &&
              !isLoadingGetTransactions &&
              transactions
                .slice(0, 3)
                .map((transaction) => (
                  <TransactionCard transaction={transaction} />
                ))}
            {!transactions && isLoadingGetTransactions && <Loader />}
            {!isLoadingGetTransactions && !transactions && (
              <div className="mx-auto flex max-w-[60%] flex-col items-center text-center">
                <img
                  className="mx-auto pt-10"
                  src="/assets/garbage.png"
                  alt="empty"
                />
                <p className="text-sm font-semibold">No transaction history</p>
                <p className="text-xs text-gray-500">
                  Your data history is currently empty. Start recycling today to
                  see your impact.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
