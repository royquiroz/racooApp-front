import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import moment from "moment";

class TableCalls extends Component {
  constructor() {
    super();
    this.state = {};
  }

  goToCall = id => {
    this.props.history.push(`/call/${id}`);
  };

  render() {
    const { calls, fromCalls } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            {fromCalls ? <TableCell>Cliente</TableCell> : null}
            <TableCell>Tipo de Soporte</TableCell>
            <TableCell>Sistema</TableCell>
            <TableCell>Consultor</TableCell>
            <TableCell>Clasificacion</TableCell>
            <TableCell>Estatus</TableCell>
            <TableCell>Resultado</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calls.map((call, i) => (
            <TableRow
              key={i}
              className="pointer"
              hover
              onClick={() => this.goToCall(call._id)}
            >
              {fromCalls ? (
                <TableCell>
                  {call.client.name} {call.client.last_name}
                </TableCell>
              ) : null}
              <TableCell>{call.kind}</TableCell>
              <TableCell>{call.system}</TableCell>
              {call.prev_db ? (
                <TableCell>{call.prev_db_user}</TableCell>
              ) : (
                <TableCell>
                  {call.user.name} {call.user.last_name}
                </TableCell>
              )}
              <TableCell>{call.classification}</TableCell>
              <TableCell>{call.status}</TableCell>
              <TableCell>{call.ending}</TableCell>
              <TableCell>{moment(call.created_at).format("lll")}</TableCell>
            </TableRow>
          ))}
          {calls.length > 0 ? (
            <TableRow>
              <TableCell align="right" colSpan={fromCalls ? 6 : 5}>
                Total de llamadas
              </TableCell>
              <TableCell align="center">{calls.length}</TableCell>
            </TableRow>
          ) : null}
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
  }
}

export default TableCalls;
