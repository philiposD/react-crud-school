export function apiAttributeMapper(element) {
  // let keys = Object.keys(row.students[0]).filter(ele => ['firstName','lastName'].includes(ele));
  // let keys = Object.keys(element.data[0]).filter(ele => [
  //   "firstName",
  //   "lastName",
  //   "dateOfBirth",
  //   "email",
  //   "phone",
  //   "UID",
  //   "school",
  //   "class",
  // ].includes(ele));

  let keyMap = {
    "firstName": "First name",
    "lastName": "Last name",
    "dateOfBirth": "Date of birth",
    "email": "Email",
    "phone": "Phone",
    "UID": "UID / CPN",
    "school": "School",
    "class": "Class",
  }

  function renameKeys(obj) {
    let keys = Object.keys(obj);
    keys.forEach(key => {
      let newKey = keyMap[key];
      if (newKey) {
        obj[newKey] = obj[key];
        delete obj[key];
      }

      // console.log(key, obj[key]);
      if (obj[key] != null) {
        if (typeof obj[key] === 'object') {
          if (obj[key].length > 1) {
            // debugger
            obj[key].forEach(ele => renameKeys(ele));
          }
        }
      }

      return obj;
      // console.log(key);
    });



    // obj.map((value, key) => {
    //   let newKey = keyMap[key]
    //   if (newKey) {
    //     obj[newKey] = value;
    //     delete obj[key];
    //   }
    //   if (typeof value == 'object') {
    //     renameKeys(value);
    //   }
    // });
  }

  renameKeys(element);
  // renameKeys( element.data[0]);
  // element.data.forEach(ele => {
  //   renameKeys(ele);
  // });

  // for(let key in element.students[0]) {
  //   debugger
  // }
  //
  // switch (keys) {
  //   case 'firstName':
  //     return 'First name';
  //     break;
  // }
  // let values =  Object.values(element.students[0]);
  console.log(element);

  return element;
}
