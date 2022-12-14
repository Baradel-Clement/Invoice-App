export const formatInvoiceDate = (originalDate: string) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = originalDate.slice(5, 7);
  let date = `${originalDate.slice(8, 10)} ${months[parseInt(currentMonth) - 1]} ${originalDate.slice(0, 4)}`;
  if (date[0] === '0') {
    date = date.slice(1, date.length)
  }

  return date;
}

export const getPaymentTermsDate = (originalDate: string, paymentTerms: number) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let currentYear = parseInt(`${originalDate.slice(0, 4)}`);
  let currentMonth = parseInt(`${originalDate.slice(5, 7)}`);
  let dayNumber = parseInt(`${originalDate.slice(8, 10)}`);
  dayNumber += paymentTerms;
  if (dayNumber > 30) {
    dayNumber -= 30;
    currentMonth += 1;
    if (currentMonth === 13) {
      currentMonth = 1;
      currentYear += 1;
    }
  }
  const date = `${dayNumber} ${months[currentMonth - 1]} ${currentYear}`

  return date;
}