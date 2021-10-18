// import logo from './logo.svg';
import "./index.scss";
import "../../services/http-service";
import {
  fetchParents,
  deleteParent,
  fetchProfessors,
} from "../../services/http-service";
import { useEffect, useState, React, useMemo, useContext } from "react";
import { ParentContext } from "./parentContext";
import DataTableSort from "../../components/data-table-sort";
import FormAdd from "../../components/form-add";
import CheckboxAssoc from "../../components/checkbox-associations";
import { AppContext } from "../../AppContext";
import BasicTabs from "../../components/basic-tabs";
import Typography from "@mui/material/Typography";

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

  const { setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle("Parents");

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
  ];

  const arrOrder = headCells.slice(1, headCells.length).map((ele) => ele.id);
  const fields = headCells.slice(1, headCells.length);
  let path = mode === "insert" ? "/parent/add" : "/parent/edit";

  return (
    <>
      {parents !== null ? (
        <ParentContext.Provider value={value}>
          <BasicTabs
            tabAdd={[
              <FormAdd
                context={ParentContext}
                fields={fields}
                fetchData={fetchParents}
                setData={setParents}
                path={path}
              />,
              <DataTableSort
                name={"Parents"}
                context={ParentContext}
                headCells={headCells}
                order={arrOrder}
                deleteCallback={deleteParent}
                fetchData={fetchParents}
                setData={setParents}
                rows={parents}
              />,
            ]}
            tabAssoc={[
              <Typography variant="body1" gutterBottom>
                Associations are done parent => child, 1 parent can have
                multiple children, but 1 child cannot have more than 2 parents.
              </Typography>,
              <CheckboxAssoc
                label={"Pick a parent"}
                placeholder={"Parents"}
                data={parents}
              />,
              <CheckboxAssoc
                label={"Pick a student"}
                placeholder={"Students"}
                data={window.Office.Models.students}
              />,
              <DataTableSort
                name={"Parents"}
                context={ParentContext}
                headCells={headCells}
                order={arrOrder}
                deleteCallback={deleteParent}
                fetchData={fetchParents}
                setData={setParents}
                rows={parents}
              />,
            ]}
          />

          {/* <CheckboxAssoc /> */}
        </ParentContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ParentsView;
