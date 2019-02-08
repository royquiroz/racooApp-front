import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination
} from "@material-ui/core";
import moment from "moment";

class TableCalls extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 5
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  goToCall = id => {
    this.props.history.push(`/call/${id}`);
  };

  render() {
    const { calls, fromCalls } = this.props;
    const { page, rowsPerPage } = this.state;
    console.log(calls);

    return (
      <Table>
        <TableHead>
          <TableRow>
            {fromCalls ? <TableCell>Compañia</TableCell> : null}
            {fromCalls ? <TableCell>Cliente</TableCell> : null}
            <TableCell>Tipo de Soporte</TableCell>
            <TableCell>Sistema</TableCell>
            <TableCell>Consultor</TableCell>
            {/*<TableCell>Clasificacion</TableCell>*/}
            <TableCell>Estatus</TableCell>
            <TableCell>Resultado</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calls
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((call, i) => (
              <TableRow
                key={i}
                className="pointer"
                hover
                onClick={() => this.goToCall(call._id)}
              >
                {fromCalls ? (
                  <TableCell>
                    {call.client.company.kind === "NOTARY"
                      ? call.client.company.lawyer
                      : call.client.company.name}
                  </TableCell>
                ) : null}
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
                {/*<TableCell>{call.classification}</TableCell>*/}
                <TableCell>{call.status}</TableCell>
                <TableCell>{call.ending}</TableCell>
                <TableCell>{moment(call.created_at).format("lll")}</TableCell>
              </TableRow>
            ))}
          {calls.length > 0 ? (
            <TableRow>
              <TableCell align="right" colSpan={fromCalls ? 7 : 5}>
                Total de llamadas:
              </TableCell>
              <TableCell align="center">{calls.length}</TableCell>
            </TableRow>
          ) : null}

          {calls.length > 0 ? (
            <TableRow>
              <TableCell align="right" colSpan={fromCalls ? 7 : 5}>
                Pendientes:{" "}
                {calls.filter(call => call.status === "PENDING").length}
              </TableCell>
              <TableCell align="center">
                Finalizadas:{" "}
                {calls.filter(call => call.status === "FINALIZED").length}
              </TableCell>
            </TableRow>
          ) : null}

          {calls.length > 0 ? (
            <TableRow>
              <TableCell align="right" colSpan={fromCalls ? 6 : 4}>
                Llamadas: {calls.filter(call => call.kind === "CALL").length}
              </TableCell>
              <TableCell align="center">
                S.O.S.: {calls.filter(call => call.kind === "SOS").length}
              </TableCell>
              <TableCell align="center">
                Inverso: {calls.filter(call => call.kind === "REVERSE").length}
              </TableCell>
            </TableRow>
          ) : null}

          {calls.length > 0 ? (
            <TableRow>
              <TableCell align="center" colSpan={fromCalls ? 2 : 0}>
                Minotaria:{" "}
                {calls.filter(call => call.system === "MINOTARIA").length}
              </TableCell>
              <TableCell align="center">
                Calculofacil:{" "}
                {calls.filter(call => call.system === "CALCULOFACIL").length}
              </TableCell>
              <TableCell align="center">
                ListasPB:{" "}
                {calls.filter(call => call.system === "LISTASPB").length}
              </TableCell>
              <TableCell align="center">
                CFDI: {calls.filter(call => call.system === "CFDI").length}
              </TableCell>
              <TableCell align="center">
                UIF: {calls.filter(call => call.system === "UIF").length}
              </TableCell>
              <TableCell align="center" colSpan={fromCalls ? 2 : 0}>
                Racoo Notarios:{" "}
                {calls.filter(call => call.system === "RACOO NOTARIOS").length}
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 50, 100]}
              colSpan={7}
              count={calls.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

export default TableCalls;
