export const truncateAddress = (address, short = false) => {
  if (!address) return "No Account";
  const match = short ? address.match(
    /^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{3})$/
  ) : address.match(
    /^(0x[a-zA-Z0-9]{10})[a-zA-Z0-9]+([a-zA-Z0-9]{10})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
