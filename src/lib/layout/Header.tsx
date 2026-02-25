export default function Header() {
  // No auto-connect here anymore. Handled on home page or manually.

  // Automatic login moved to Home page actions to prevent redundant calls
  return <div className="bg-[#F3F3F3]"> </div>;
}

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }
