const axios = require('axios');

export const fetchStudents = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.get('/students/all').then(res => {
      resolve(res.data);
      window.Office.Models.students = res.data.data;
      localStorage.setItem('students', JSON.stringify(res.data.data));
    });
  });
}

export const fetchModules = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.get('/modules/all').then(res => {
      resolve(res.data);
      window.Office.Models.modules = res.data.data;
      localStorage.setItem('modules', JSON.stringify(res.data.data));
    });
  });
}

export const fetchParents = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.get('/parents/all').then(res => {
      resolve(res.data);
      window.Office.Models.parents = res.data.data;
      localStorage.setItem('parents', JSON.stringify(res.data.data));
    });
  });
}

export const fetchProfessors = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.get('/professors/all').then(res => {
      resolve(res.data);
      window.Office.Models.professors = res.data.data;
      localStorage.setItem('professors', JSON.stringify(res.data.data));
    });
  });
}

export const deleteModule = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.post('/module/delete', { id: param }).then(res => { resolve(res.data) });
  });
}

export const deleteStudent = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.post('/student/delete', { id: param }).then(res => { resolve(res.data) });
  });
}

export const deleteParent = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.post('/parent/delete', { id: param }).then(res => { resolve(res.data) });
  });
}

export const deleteProfessor = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.post('/professor/delete', { id: param }).then(res => { resolve(res.data) });
  });
}



export const createParentStudentsAssoc = (param) => {
  console.log(param);
  return new Promise((resolve, reject) => {
    axios.post('/parent-student/add', { ...param }).then(res => { resolve(res.data) });
  });
}


// export default fetchStudents;
