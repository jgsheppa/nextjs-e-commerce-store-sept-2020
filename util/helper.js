import currencyFormatter from 'currency-formatter';

export function centsToDollars(cents) {
  const dollarAmount = currencyFormatter.format(parseInt(cents), {
    code: 'USD',
  });
  return dollarAmount;
}
