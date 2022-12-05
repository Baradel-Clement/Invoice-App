export const generateInvoiceDisplayId = () => {
  // starts with #
  // 2 capital letters ([65 --> 90])
  // 4 numbers
  let displayId = '#';
  [0, 1].forEach(() => {
    const randomInt = Math.floor(Math.random() * (25 - 0 + 1) + 0)
    const code = 'A'.charCodeAt(0);

    displayId += String.fromCharCode(code + randomInt)
  });
  [0, 1, 2, 3].forEach(() => {
    displayId += Math.floor(Math.random() * (9 - 0 + 1) + 0);
  })
  return displayId;
}
