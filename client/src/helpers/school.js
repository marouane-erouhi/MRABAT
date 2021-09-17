const getAllSchools = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/school`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

const addSchool = async (data) => {
  const fd = new FormData();

  fd.append('images', data.images, `${data.images.name}`);
  fd.append('schoolName', data.schoolName)
  fd.append('about', data.about)
  fd.append('location', data.location)
  fd.append('admission', data.admission)

  const fetchOptions = {
    method: 'POST',
    body: fd,
  };
  return await fetch(`http://localhost:5000/school`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

const updateSchool = async (oldName, data, images) => {
  const fd = new FormData();

  if (images != '') {
    fd.append('images', images, `${images.name}`);
  }

  fd.append('oldName', oldName)
  fd.append('schoolName', data.schoolName)
  fd.append('about', data.about)
  fd.append('location', data.location)
  fd.append('admission', data.admission)

  const fetchOptions = {
    method: 'PATCH',
    body: fd,
  };
  return await fetch(`http://localhost:5000/school`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { getAllSchools, addSchool, updateSchool }