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
import { Button } from "@mui/material";
import { createParentStudentsAssoc } from "../../services/http-service";

function ParentsView() {
  const [parents, setParents] = useState(null);
  const [mode, setMode] = useState("insert");
  const [formValues, setFormValues] = useState({
    firstName: "Bobi",
    lastName: "Gigi",
  });

  const [listCheckboxParents, setListCheckbox1] = useState([]);
  const [listCheckboxStudents, setListCheckbox2] = useState([]);

  const value = useMemo(
    () => ({
      setParents,
      mode,
      setMode,
      formValues,
      setFormValues,
      // listCheckbox1,
      // listCheckbox2,
      // setListCheckbox1,
      // setListCheckbox2,
    }),
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

  var studentsData = JSON.parse(localStorage.getItem("students"));
  var parentsData = JSON.parse(localStorage.getItem("parents"));

  function handleAssoc() {
    console.log(listCheckboxParents, listCheckboxStudents);
    listCheckboxParents.forEach((parent) => {
      listCheckboxStudents.forEach((student) => {
        var data = { parentId: parent.id, studentId: student.id };
        createParentStudentsAssoc(data);
      });
    });
  }

  return (
    <>
      {parents !== null ? (
        <ParentContext.Provider value={value}>
          <BasicTabs
            tabAdd={[
              <FormAdd
                key="parentsTabAddFormAdd"
                context={ParentContext}
                fields={fields}
                fetchData={fetchParents}
                setData={setParents}
                path={path}
              />,
              <DataTableSort
                key="parentsTabAddDataTableSort"
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
              <Typography
                variant="body1"
                gutterBottom
                key="parentsTabAssocHead1"
              >
                Associations are done parent => child, 1 parent can have
                multiple children, but 1 child cannot have more than 2 parents.
              </Typography>,
              <CheckboxAssoc
                label={"Pick a parent"}
                placeholder={"Parents"}
                data={parentsData}
                // data={JSON.parse(localStorage.getItem("parents"))}
                key="parentsTabAssocCheck1"
                context={ParentContext}
                setData={setListCheckbox1}
              />,
              <CheckboxAssoc
                label={"Pick a student"}
                placeholder={"Students"}
                data={studentsData}
                // data={JSON.parse(localStorage.getItem("students"))}
                key="parentsTabAssocCheck2"
                context={ParentContext}
                setData={setListCheckbox2}
              />,
              <Button
                variant="outlined"
                onClick={handleAssoc}
                key="buttonAssoc"
              >
                Outlined
              </Button>,
              <DataTableSort
                name={"Parents"}
                context={ParentContext}
                headCells={headCells}
                order={arrOrder}
                deleteCallback={deleteParent}
                fetchData={fetchParents}
                setData={setParents}
                rows={parents}
                key="parentsTabAssocDataTable"
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
