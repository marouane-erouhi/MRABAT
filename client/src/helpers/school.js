const backend_url = 'http://3.142.46.234:5000/'

const getAllSchools = async () => {
  const fetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  };
  return await fetch(`${backend_url}/school`, fetchOptions)
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
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: fd,
  };
  return await fetch(`${backend_url}/school`, fetchOptions)
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
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: fd,
  };
  return await fetch(`${backend_url}/school`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { getAllSchools, addSchool, updateSchool }