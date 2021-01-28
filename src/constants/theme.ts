type Rem = `${number}rem`;
type SizeObject = Record<string, Rem>;

const fontSize: SizeObject = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
};

const spacing: SizeObject = {
  xs: '0.25rem',
  sm: '0.5rem',
  base: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};

export { fontSize, spacing };
