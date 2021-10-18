// import logo from './logo.svg';
import "./index.scss";
import "../../services/http-service";
import { fetchProfessors, deleteProfessor } from "../../services/http-service";
import { useEffect, useState, React, useMemo, useContext } from "react";
import { ProfessorContext } from "./professorContext";
import DataTableSort from "../../components/data-table-sort";
import FormAdd from "../../components/form-add";
import { AppContext } from "../../AppContext";

function ProfessorsView() {
  const [professors, setProfessors] = useState(null);
  const [mode, setMode] = useState("insert");
  const [formValues, setFormValues] = useState({
    firstName: "Bobi",
    lastName: "Gigi",
  });

  const value = useMemo(
    () => ({
      setProfessors,
      mode,
      setMode,
      formValues,
      setFormValues,
    }),
    [mode, setFormValues, formValues]
  );

  const { setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle("Professors");
    fetchProfessors("param123").then((res) => {
      setProfessors(res.data);
    });
  }, []);

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
      type: "text",
    },
    {
      id: "school",
      numeric: false,
      disablePadding: false,
      label: "School",
      className: "form-text-field",
      type: "text",
    },
  ];

  const arrOrder = headCells.slice(1, headCells.length).map((ele) => ele.id);
  const fields = headCells.slice(1, headCells.length);
  let path = mode === "insert" ? "/professor/add" : "/professor/edit";

  return (
    <>
      {professors !== null ? (
        <ProfessorContext.Provider value={value}>
          <FormAdd
            context={ProfessorContext}
            fields={fields}
            fetchData={fetchProfessors}
            setData={setProfessors}
            path={path}
          />
          <DataTableSort
            name={"Professors"}
            context={ProfessorContext}
            headCells={headCells}
            order={arrOrder}
            deleteCallback={deleteProfessor}
            fetchData={fetchProfessors}
            setData={setProfessors}
            rows={professors}
          />
        </ProfessorContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ProfessorsView;
