import { useEffect } from 'react';
import { useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export default function Header() {
  const { connect } = useConnect();
  useEffect(() => {
    connect({ connector: injected() });
  }, [connect]);
  return <div className="bg-[#F3F3F3]"> </div>;
}

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }
