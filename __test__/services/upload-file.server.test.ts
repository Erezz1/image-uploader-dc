import { cleanup } from '@testing-library/react';
import { uploadFile } from '@/services'

afterEach(cleanup);

const url = 'https://images.unsplash.com/photo-1678737169727-a3236885e763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=846&q=80';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ url })
}));

describe('Test in file-validation.helper.ts', () => {
  const file = new File(
    ['test'],
    'test.png',
    { type: 'image/png' }
  );

  it('Should return image url', async () => {
    const responseUrl = await uploadFile(file) as string;
    expect(responseUrl).toBe(url);
  });
});
