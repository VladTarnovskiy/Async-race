export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getRandomNum = (): number => {
  return Math.floor(Math.random() * 15);
};

export const carsBrand: Array<string> = [
  'Jaguar',
  'Aston Martin',
  'Alpine',
  'Bentley',
  'Cadillac',
  'Chery',
  'Chevrolet',
  'Chrysler',
  'Datsun',
  'Dodge',
  'Ford',
  'Mersedes',
  'Audi',
  'Ferrari',
  'Feat',
];
