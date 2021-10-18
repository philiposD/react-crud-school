import "./index.scss";
import { fetchModules, deleteModule } from "../../services/http-service";
import { ModuleContext } from "./moduleContext";
import { useEffect, useState, React, useMemo, useContext } from "react";
import DataTableSort from "../../components/data-table-sort";
import FormAdd from "../../components/form-add";
import { AppContext } from "../../AppContext";

export default function Modules() {
  const [modules, setModules] = useState(null);
  const [mode, setMode] = useState("insert");
  const [formValues, setFormValues] = useState({
    firstName: "Bobi",
    lastName: "Gigi",
  });
  const value = useMemo(
    () => ({ setModules, mode, setMode, formValues, setFormValues }),
    [modules, setFormValues, formValues]
  );
  const { setTitle } = useContext(AppContext);

  useEffect(() => {
    setTitle("Modules");
    fetchModules("param123").then((res) => {
      setModules(res.data);
    });
  }, []);

  const headCells = [
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: "",
    },
    {
      id: "name",
      numeric: true,
      disablePadding: false,
      label: "Name",
      className: "form-text-field",
      type: "text",
    },
    {
      id: "type",
      numeric: true,
      disablePadding: false,
      label: "Type",
      className: "form-text-field",
      type: "text",
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Price",
      className: "form-text-field",
      type: "numeric",
    },
    {
      id: "notes",
      numeric: false,
      disablePadding: false,
      label: "Notes",
      className: "form-text-field",
      type: "textarea",
    },
  ];

  const arrOrder = headCells.slice(1, headCells.length).map((ele) => ele.id);
  const fields = headCells.slice(1, headCells.length);
  let path = mode === "insert" ? "/module/add" : "/module/edit";

  return (
    <>
      {modules !== null ? (
        <ModuleContext.Provider value={value}>
          <FormAdd
            context={ModuleContext}
            fields={fields}
            fetchData={fetchModules}
            setData={setModules}
            path={path}
          />
          <DataTableSort
            context={ModuleContext}
            headCells={headCells}
            order={arrOrder}
            name={"Modules"}
            deleteCallback={deleteModule}
            fetchData={fetchModules}
            setData={setModules}
            rows={modules}
          />
        </ModuleContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
}
