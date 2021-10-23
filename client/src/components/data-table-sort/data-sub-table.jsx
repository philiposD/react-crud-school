import React from "react";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import {Table, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {apiAttributeMapper} from "../../utils/api-attribute-mapper";
export default function DataSubTable(props) {
  let {row, use} = props;

  if (use === 'students') {
    row['data'] = row['students'];
    delete row['students'];
  }

  row =  apiAttributeMapper(row);

  console.log('row:', row);

  debugger

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Students
      </Typography>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Total price ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              asddd
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <>text</>
                // <ListItem button key={text}>
                //   <ListItemIcon>
                //     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                //   </ListItemIcon>
                //   <ListItemText primary={text} />
                // </ListItem>
              ))}
              {[1,2,3].map(ele => (
                    <>
                    <div>{ele}</div>
                    </>
                  ))}
            </TableCell>
          </TableRow>

          {row.data !== undefined ? (
            row.data.map((student) => (
                <TableRow>

                  {Object.values(student).map(value => (
                    <TableCell component="th" scope="row">
                      {console.log(value)}
                      {value}
                    </TableCell>
                  ))}
                  {/*<TableCell component="th" scope="row">*/}
                  {/*  {student.firstName}*/}
                  {/*</TableCell>*/}
                  {/*<TableCell component="th" scope="row">*/}
                  {/*  {student.lastName}*/}
                  {/*</TableCell>*/}
                </TableRow>
              ))
          ): (<></>)}

        </TableBody>
      </Table>
    </Box>
  );
}
