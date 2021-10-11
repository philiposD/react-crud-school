const axios = require('axios');

export const fetchStudents = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.get('/students/all').then(res => {resolve(res.data)});
  });
}

export const fetchModules = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.get('/modules/all').then(res => {resolve(res.data)});
  });
}

export const deleteModule = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.post('/module/delete', {id: param}).then(res => {resolve(res.data)});
  });
}

// export default fetchStudents;
