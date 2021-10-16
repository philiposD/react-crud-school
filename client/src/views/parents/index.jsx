// import logo from './logo.svg';
import "./index.scss";
import "../../services/http-service";
import {
  fetchParents,
  deleteParent,
  fetchProfessors,
} from "../../services/http-service";
import { useEffect, useState, React, useMemo } from "react";
import { ParentContext } from "./parentContext";
import DataTableSort from "../../components/data-table-sort";
import FormAdd from "../../components/form-add";

function ParentsView() {
  const [parents, setParents] = useState(null);
  const [mode, setMode] = useState("insert");
  const [formValues, setFormValues] = useState({
    firstName: "Bobi",
    lastName: "Gigi",
  });

  const value = useMemo(
    () => ({ setParents, mode, setMode, formValues, setFormValues }),
    [mode, setFormValues, formValues]
  );

  useEffect(() => {
    fetchParents("param123").then((res) => {
      setParents(res.data);
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
      numeric: true,
      disablePadding: false,
      label: "Last name",
      className: "form-text-field",
      type: "text",
    },
    {
      id: "dateOfBirth",
      numeric: true,
      disablePadding: false,
      label: "Date of birth",
      className: "form-text-field",
      type: "date",
    },
    {
      id: "UID",
      numeric: true,
      disablePadding: false,
      label: "UID - CNP",
      className: "form-text-field",
      type: "text",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
      className: "form-text-field",
      type: "email",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "Phone",
      className: "form-text-field",
      type: "text",
    },
  ];

  const arrOrder = headCells.slice(1, headCells.length).map((ele) => ele.id);
  const fields = headCells.slice(1, headCells.length);
  let path = mode === "insert" ? "/parent/add" : "/parent/edit";

  return (
    <>
      {parents !== null ? (
        <ParentContext.Provider value={value}>
          <FormAdd
            context={ParentContext}
            fields={fields}
            fetchData={fetchParents}
            setData={setParents}
            path={path}
          />
          <DataTableSort
            name={"Parents"}
            context={ParentContext}
            headCells={headCells}
            order={arrOrder}
            deleteCallback={deleteParent}
            fetchData={fetchParents}
            setData={setParents}
            rows={parents}
          />
        </ParentContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ParentsView;
