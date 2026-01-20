export const formatMenuItem = (menuItem: string) => {
  const newMenuItem = menuItem
    .split(/[-_]/) // Handle both dashes and underscores
    .map((item) => {
      // Handle known acronyms
      const lower = item.toLowerCase();
      if (lower === 'ai') return 'AI';
      if (lower === 'it') return 'IT';
      if (lower === 'crm') return 'CRM';
      if (lower === 'kyc') return 'KYC';
      if (lower === 'hvac') return 'HVAC';
      return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    })
    .join(' ');
  return newMenuItem;
};

export const formatMenuTitle = (menuItem: string) => {
  const newMenuItem = menuItem
    .split('_')
    .map((item) => {
      // Handle IT as a special case (should be all uppercase)
      if (item.toLowerCase() === 'it') return 'IT';
      return item.charAt(0).toUpperCase() + item.slice(1);
    })
    .join(' ');
  return newMenuItem;
};

export const formatLink = (str: string) => {
  const splitStr = str.split('.');
  return splitStr[0];
};
