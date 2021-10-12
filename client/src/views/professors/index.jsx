// import logo from './logo.svg';
import "./index.scss";
import "../../services/http-service";
import { fetchProfessors, deleteProfessor } from "../../services/http-service";
import { useEffect, useState, React, useMemo } from "react";
import AddProfessor from "./add-professor";
import { ProfessorContext } from "./professorContext";
import DataTableSort from "../../components/data-table-sort";

function ProfessorsView() {
  const [professors, setProfessors] = useState(null);
  const value = useMemo(() => ({ professors, setProfessors }), [professors]);

  useEffect(() => {
    fetchProfessors("param123").then((res) => {
      console.log("fetchProfessors", res);
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
      {professors !== null ? (
        <ProfessorContext.Provider value={value}>
          <AddProfessor />
          <DataTableSort
            context={ProfessorContext}
            headCells={headCells}
            order={arrOrder}
            name={"Professors"}
            deleteCallback={deleteProfessor}
            fetchData={fetchProfessors}
            setData={setProfessors}
          />
        </ProfessorContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ProfessorsView;
