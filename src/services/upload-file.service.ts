import Toast from 'toastify-js';

const toast = Toast({
  text: 'Oh no! We have a problem!',
  duration: 3000,
  gravity: 'top',
  position: 'left',
  stopOnFocus: true,
});

export const uploadFile = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json() as { url: string };
    return data.url;

  } catch (error) {
    console.log(error);
    toast.showToast();
    return null;
  }
}
