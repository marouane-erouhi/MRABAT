// body is not string in this request

const uploadImage = async (images) => {
  const fd = new FormData();

  for (const image of images) {
    fd.append('images', image, `${image.name}`);
  }

  const fetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: fd,
  };

  return await fetch(`/images`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { uploadImage };
