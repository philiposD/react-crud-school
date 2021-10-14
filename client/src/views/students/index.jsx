// import logo from './logo.svg';
import "./index.scss";
import "../../services/http-service";
import { fetchStudents, deleteStudent } from "../../services/http-service";
import { useEffect, useState, React, useMemo } from "react";
import AddStudents from "./add-students";
import { StudentContext } from "./studentContext";
import DataTableSort from "../../components/data-table-sort";
import { useForm } from "react-hook-form";

function StudentsView() {
  const [students, setStudents] = useState(null);
  const [selected, setSelected] = useState([]);
  const [mode, setMode] = useState("insert");
  const [formValues, setFormValues] = useState({
    firstName: "Bobi",
    lastName: "Gigi",
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm();

  const value = useMemo(
    () => ({
      students,
      setStudents,
      selected,
      setSelected,
      mode,
      setMode,
      register,
      handleSubmit,
      setValue,
      setFocus,
      formValues,
      setFormValues,
    }),
    [students, selected, mode, setValue, setFormValues]
  );

  useEffect(() => {
    fetchStudents("param123").then((res) => {
      console.log("fetchStudents", res);
      setStudents(res.data);
    });
  }, []);

  let headCells = [
    {},
    {
      id: "firstName",
      numeric: false,
      disablePadding: true,
      label: "First name",
    },
    {
      id: "lastName",
      numeric: true,
      disablePadding: false,
      label: "Last name",
    },
    {
      id: "dateOfBirth",
      numeric: true,
      disablePadding: false,
      label: "Date of birth",
    },
    {
      id: "UID",
      numeric: true,
      disablePadding: false,
      label: "UID - CNP",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "Phone",
    },
    {
      id: "school",
      numeric: true,
      disablePadding: false,
      label: "School",
    },
    {
      id: "class",
      numeric: true,
      disablePadding: false,
      label: "Class",
    },
  ];

  const arrOrder = headCells.slice(1, headCells.length).map((ele) => ele.id);

  return (
    <>
      {students !== null ? (
        <StudentContext.Provider value={value}>
          <AddStudents formValues={formValues} />
          <DataTableSort
            context={StudentContext}
            headCells={headCells}
            order={arrOrder}
            name={"Students"}
            deleteCallback={deleteStudent}
            fetchData={fetchStudents}
            setData={setStudents}
            formValues={formValues}
            // setFormValues={setFormValues}
          />
        </StudentContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default StudentsView;
