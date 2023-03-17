import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Loading, Uploaded, Upload, UploaderComponent } from '@/components';

afterEach(cleanup);

describe('Test in Uploader.component.tsx', () => {
  it('<UploaderComponent/> To do match in the snapshot', async () => {
    const { container } = render(<UploaderComponent />);
    expect(container).toMatchSnapshot();
  });

  it('should to show Dropzone component first', () => {
    render(<UploaderComponent />);
    const dropzone = screen.getAllByRole('presentation');
    expect(dropzone).toBeTruthy();
  });
});

describe('Test in component <Loading />', () => {
  test('should to do match in the snapshot', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });

  it('should show the message: "Uploading..."', () => {
    render(<Loading />);
    const text = screen.getByRole('heading', { level: 3 });
    expect(text.textContent).toBe('Uploading...');
  });
});

describe('Test in component <Uploaded />', () => {
  const url = 'https://images.unsplash.com/photo-1678737169727-a3236885e763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=846&q=80';

  test('should to do match in the snapshot', () => {
    const { container } = render(<Uploaded imageUrl={url} />);
    expect(container).toMatchSnapshot();
  });

  it('should to do match the image url, p tag and test url', () => {
    render(<Uploaded imageUrl={url} />);
    const p = screen.getByText(url);
    const img = screen.getByRole('img');

    expect(p.textContent).toBe(url);
    expect(img.src).toBe(url);
    expect(p.textContent).toBe(img.src);
  });
});

describe('Test in component <Upload />', () => {
  const uploadFile = jest.fn();
  const file = new File(['test'], 'test.png', { type: 'image/png' });

  test('should to do match in the snapshot', () => {
    const { container } = render(<Upload uploadFile={uploadFile} />);
    expect(container).toMatchSnapshot();
  });

  it('should the input tag have a file', () => {
    render(<Upload uploadFile={uploadFile} />);
    const input = screen.getByTestId('drop-input');

    fireEvent.input(input, { target: { file: [file] } });

    expect(input.file).toHaveLength(1);
    expect(input.file[0]).toEqual(file);
  });
});
