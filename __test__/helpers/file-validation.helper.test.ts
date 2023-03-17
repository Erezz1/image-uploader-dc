import { cleanup } from '@testing-library/react';
import { validFile } from '@/helpers'

afterEach(cleanup);

describe('Test in file-validation.helper.ts', () => {
  it('Should return true', () => {
    const file = new File(
      ['test'],
      'test.png',
      { type: 'image/png' }
    );
    expect(validFile(file)).toBe(true);
  });

  it('should return an error name too large', () => {
    const file = new File(
      ['test'],
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere felis a gravida pulvinar augue.png',
      { type: 'image/png' }
    );
    expect(() => validFile(file)).toThrowError('Name too large');
  });

  it('should return an error type', () => {
    const file = new File(
      ['test'],
      'test.pdf',
      { type: 'application/pdf' }
    );
    expect(() => validFile(file)).toThrowError('File type invalid');
  });
});
