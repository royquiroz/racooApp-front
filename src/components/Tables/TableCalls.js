import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

const TableCalls = ({ calls }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Cliente</TableCell>
        <TableCell>Tipo de Soporte</TableCell>
        <TableCell>Sistema</TableCell>
        <TableCell>Consultor</TableCell>
        <TableCell>Clasificacion</TableCell>
        <TableCell>Estatus</TableCell>
        <TableCell>Resultado</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {calls.map((call, i) => (
        <TableRow key={i} className="pointer" hover>
          <TableCell>
            {call.client.name} {call.client.last_name}
          </TableCell>
          <TableCell>{call.kind}</TableCell>
          <TableCell>{call.system}</TableCell>
          <TableCell>
            {call.user.name} {call.user.last_name}
          </TableCell>
          <TableCell>{call.classification}</TableCell>
          <TableCell>{call.status}</TableCell>
          <TableCell>{call.ending}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    {/*<TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          colSpan={3}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            native: true
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
        </TableFooter>*/}
  </Table>
);

export default TableCalls;
