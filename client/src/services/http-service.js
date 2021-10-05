const axios = require('axios');

export const fetchStudents = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.get('/api').then(res => {resolve(res.data)});
  });
}

// export default fetchStudents;
