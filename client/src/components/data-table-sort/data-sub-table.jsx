import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import {Table, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {apiAttributeMapper} from "../../utils/api-attribute-mapper";


export default function DataSubTable(props) {
  let {row, use} = props;

  const [dataRow, setDataRow] = useState(null);
  console.log('data', dataRow);

  useEffect(() => {
    // if (use === 'students') {
    //   row['data'] = row['students'];
    //   delete row['students'];
    // }

    console.log('setState', row['students']);

    row =  apiAttributeMapper(row);
    setDataRow(row['students']);
  }, [setDataRow]);

  // debugger

  // if (dataRow == null || dataRow['data'] === undefined) {
  //   return (<></>);
  // }
  //
  // if (dataRow['data'].length === 0) {
  //   return (<></>);
  // }

  return (
    <>
    {dataRow !== null && dataRow !== undefined && dataRow.length !== 0 ? (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Students
      </Typography>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
                  {Object.keys(dataRow[0]).map(value => (
                    <TableCell component="th" scope="row" key={value + '' + Math.random()}>
                      {value}
                    </TableCell>
                  ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRow.map((student) => (
            <TableRow key={student.id}>
              {Object.values(student).map(value => (
                <TableCell component="th" scope="row" key={value + '' + Math.random()}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
    ): (<></>)}
    </>
  )
}
