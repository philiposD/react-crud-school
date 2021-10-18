// import logo from './logo.svg';
import "./index.scss";
import "../../services/http-service";
import { fetchStudents, deleteStudent } from "../../services/http-service";
import { useEffect, useState, React, useMemo, useContext } from "react";
import { StudentContext } from "./studentContext";
import DataTableSort from "../../components/data-table-sort";
import FormAdd from "../../components/form-add";
import { AppContext } from "../../AppContext";
function StudentsView(props) {
  const [students, setStudents] = useState(null);
  const [mode, setMode] = useState("insert");
  const [formValues, setFormValues] = useState({
    firstName: "Bobi",
    lastName: "Gigi",
  });

  console.log("students props:", props);
  window.props = props;

  const value = useMemo(
    () => ({
      students,
      setStudents,
      mode,
      setMode,
    }),
    [students, mode]
  );
  const { setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle("Students");
    fetchStudents("param123").then((res) => {
      // console.log("fetchStudents", res);
      setStudents(res.data);
    });
  }, [setStudents, setTitle]);

  let headCells = [
    {},
    {
      id: "firstName",
      numeric: false,
      disablePadding: true,
      label: "First name",
      className: "form-text-field",
      type: "text",
    },
    {
      id: "lastName",
      numeric: false,
      disablePadding: false,
      label: "Last name",
      className: "form-text-field",
      type: "text",
    },
    {
      id: "dateOfBirth",
      numeric: false,
      disablePadding: false,
      label: "Date of birth",
      className: "form-text-field",
      type: "date",
    },
    {
      id: "UID",
      numeric: false,
      disablePadding: false,
      label: "UID - CNP",
      className: "form-text-field",
      type: "text",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
      className: "form-text-field",
      type: "email",
    },
    {
      id: "phone",
      numeric: false,
      disablePadding: false,
      label: "Phone",
      className: "form-text-field",
      type: "tel",
    },
    {
      id: "school",
      numeric: false,
      disablePadding: false,
      label: "School",
      className: "form-text-field",
      type: "text",
    },
    {
      id: "class",
      numeric: false,
      disablePadding: false,
      label: "Class",
      className: "form-text-field",
      type: "text",
    },
  ];

  const arrOrder = headCells.slice(1, headCells.length).map((ele) => ele.id);
  const fields = headCells.slice(1, headCells.length);
  let path = mode === "insert" ? "/student/add" : "/student/edit";
  // const fields = headCells.slice(1, headCells.length).concat({
  //   id: "dateOfBirth",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Date of birth",
  // });

  return (
    <>
      {students !== null ? (
        <StudentContext.Provider value={value}>
          <FormAdd
            context={StudentContext}
            fields={fields}
            fetchData={fetchStudents}
            setData={setStudents}
            path={path}
          />
          <DataTableSort
            name={"Students"}
            context={StudentContext}
            headCells={headCells}
            order={arrOrder}
            deleteCallback={deleteStudent}
            fetchData={fetchStudents}
            setData={setStudents}
            rows={students}
          />
        </StudentContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default StudentsView;
