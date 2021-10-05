const axios = require('axios');

export const fetchStudents = (asd) =>{
    axios.get('/api').then(res => console.log(res));
}

// export default fetchStudents;