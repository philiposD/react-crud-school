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

  function rename(value) {
    if (!value || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(rename);
    return Object.fromEntries(Object
      .entries(value)
      .map(([k, v]) => [keyMap[k] || k, rename(v)])
    );
  }

  // function renameKeys(obj) {
  //   let newObj = {};
  //   Object.keys(obj).forEach(ele => {
  //     if (keyMap[ele]) {
  //       newObj[keyMap[ele]] = obj[ele]
  //     }
  //
  //     if (ele === 'data') {
  //        obj[ele].forEach(ele => renameKeys(ele));
  //     }
  //   });
  //   return newObj;
  //   // Object.keys(keyMap).forEach(ele => {
  //   //   if (obj[ele]) {
  //   //     newObj[keyMap[ele]] = obj[ele];
  //   //   }
  //   // });
  // }

  // function renameKeys(obj) {
  //   let keys = Object.keys(obj);
  //   keys.forEach(key => {
  //     let newKey = keyMap[key];
  //     if (newKey) {
  //       obj[newKey] = obj[key];
  //       delete obj[key];
  //     }
  //
  //     // console.log(key, obj[key]);
  //     if (obj[key] != null) {
  //       if (typeof obj[key] === 'object') {
  //         if (obj[key].length > 1) {
  //           // debugger
  //           obj[key].forEach(ele => renameKeys(ele));
  //         }
  //       }
  //     }
  //
  //     return obj;
  //     // console.log(key);
  //   });
  // }

  // renameKeys(element);
  console.log(element);

  return rename(element);
}
