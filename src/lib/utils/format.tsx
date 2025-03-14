export const formatcUsd = (balance: number | undefined) => {
  if (balance) {
    return balance.toLocaleString(undefined, { minimumFractionDigits: 3 });
  }
  return 0;
};

export function removeNonDigit(amount: string) {
  // Remove any non-digit characters
  if (!amount) return '';

  return amount.replace(/[^0-9.]/g, '');
}

export function formatAmount(amount: string, currency?: '₦' | '$') {
  // Remove any non-digit characters
  const cleanAmount = removeNonDigit(amount);

  return `${currency || ''}${
    cleanAmount
      ? parseFloat(cleanAmount).toLocaleString('en-us', {
          maximumFractionDigits: 2,
        })
      : ''
  }`;
}
