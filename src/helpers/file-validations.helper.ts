const maxNameLength = 100;
const maxSize = 10; // ? 10 = 10MB
const validTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/svg+xml',
];

export const validFile = (file: File): boolean => {
  if (file.name.length > maxNameLength) {
    throw new Error('Name too large');
  }
  if (!validTypes.some(type => type === file.type)) {
    throw new Error('File type invalid');
  }
  if (file.size > (maxSize * 1000000)) {
    throw new Error('File size to large');
  }
  return true;
}
