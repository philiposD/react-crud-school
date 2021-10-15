// import logo from './logo.svg';
import "./index.scss";
import "../../services/http-service";
import { fetchParents, deleteParent } from "../../services/http-service";
import { useEffect, useState, React, useMemo } from "react";
import AddParents from "./add-parent";
import { ParentContext } from "./parentContext";
import DataTableSort from "../../components/data-table-sort";

function ParentsView() {
  const [parents, setParents] = useState(null);
  const value = useMemo(() => ({ parents, setParents }), [parents]);

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
  ];

  const arrOrder = headCells.slice(1, headCells.length).map((ele) => ele.id);

  return (
    <>
      {parents !== null ? (
        <ParentContext.Provider value={value}>
          <AddParents />
          <DataTableSort
            context={ParentContext}
            headCells={headCells}
            order={arrOrder}
            name={"Parents"}
            deleteCallback={deleteParent}
            fetchData={fetchParents}
            setData={setParents}
          />
        </ParentContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ParentsView;
