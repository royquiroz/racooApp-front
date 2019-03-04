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
import { Link } from "@material-ui/icons";
import moment from "moment";

class TableCalls extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 10
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

  renderStatus = status => {
    if (status === "FINALIZED") {
      return "Finalizado";
    } else if (status === "PENDING DEVELOPMENT") {
      return "Pendiente Desarrollo";
    } else if (status === "PENDING SUPPORT") {
      return "Pendiente Soporte";
    } else if (status === "PENDING VISITS") {
      return "Pendiente Visitas";
    } else {
      return "Ventas";
    }
  };

  renderKind = kind => {
    if (kind === "CALL") {
      return "Llamada";
    } else if (kind === "SOS") {
      return "S.O.S.";
    } else {
      return "Inverso";
    }
  };

  render() {
    const { calls, fromCalls, viewDetails } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <Table>
        <TableHead>
          <TableRow>
            {fromCalls ? <TableCell>Compañia</TableCell> : null}
            {fromCalls ? (
              <TableCell>Cliente/Problema</TableCell>
            ) : (
              <TableCell>Problema</TableCell>
            )}
            <TableCell>Tipo de Soporte</TableCell>
            <TableCell>Sistema</TableCell>
            <TableCell>Consultor</TableCell>
            {/*<TableCell>Clasificacion</TableCell>*/}
            <TableCell>Estatus</TableCell>
            <TableCell>Resultado</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Asana</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calls
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((call, i) => (
              <TableRow
                key={i}
                hover
                className={
                  call.status.includes("PENDING")
                    ? "color-pending pointer"
                    : "pointer"
                }
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
                    <div style={{ fontWeight: "bold" }}>
                      {call.client.name} {call.client.last_name}
                    </div>{" "}
                    <br />
                    {call.problem.length > 75
                      ? `${call.problem.substring(0, 75)}...`
                      : call.problem}
                  </TableCell>
                ) : (
                  <TableCell>
                    {call.problem.length > 75
                      ? `${call.problem.substring(0, 75)}...`
                      : call.problem}
                  </TableCell>
                )}
                <TableCell>{this.renderKind(call.kind)}</TableCell>
                <TableCell>{call.system}</TableCell>
                {call.prev_db ? (
                  <TableCell>{call.prev_db_user}</TableCell>
                ) : (
                  <TableCell>
                    {call.user.name} {call.user.last_name}
                  </TableCell>
                )}
                {/*<TableCell>{call.classification}</TableCell>*/}
                <TableCell>{this.renderStatus(call.status)}</TableCell>
                <TableCell>
                  {call.ending === "UNPRODUCTIVE"
                    ? "Improductiva"
                    : "Productiva"}
                </TableCell>
                <TableCell>{moment(call.created_at).format("L")}</TableCell>
                <TableCell>
                  {call.link ? (
                    <a
                      target="_blank"
                      href={call.link}
                      rel="noopener noreferrer"
                    >
                      <Link />
                    </a>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}

          {viewDetails ? (
            <TableRow>
              <TableCell align="right" colSpan={fromCalls ? 8 : 6}>
                Total de llamadas:
              </TableCell>
              <TableCell align="center">{calls.length}</TableCell>
            </TableRow>
          ) : null}

          {viewDetails ? (
            <TableRow>
              <TableCell align="right" colSpan={fromCalls ? 5 : 3}>
                Ventas: {calls.filter(call => call.status === "SALES").length}
              </TableCell>
              <TableCell align="center">
                Pendientes Soporte:{" "}
                {calls.filter(call => call.status === "PENDING SUPPORT").length}
              </TableCell>
              <TableCell align="center">
                Pendientes Desarrollo:{" "}
                {
                  calls.filter(call => call.status === "PENDING DEVELOPMENT")
                    .length
                }
              </TableCell>
              <TableCell align="center">
                Pendientes Visitas:{" "}
                {calls.filter(call => call.status === "PENDING VISITS").length}
              </TableCell>
              <TableCell align="center">
                Finalizadas:{" "}
                {calls.filter(call => call.status === "FINALIZED").length}
              </TableCell>
            </TableRow>
          ) : null}

          {viewDetails ? (
            <TableRow>
              <TableCell align="right" colSpan={fromCalls ? 7 : 5}>
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

          {viewDetails ? (
            <TableRow>
              <TableCell align="center" colSpan={fromCalls ? 3 : 1}>
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
              <TableCell align="center" colSpan={fromCalls ? 3 : 1}>
                Racoo Notarios:{" "}
                {calls.filter(call => call.system === "RACOO NOTARIOS").length}
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              labelRowsPerPage="Registros por Pagina"
              rowsPerPageOptions={[5, 10, 50, 100]}
              colSpan={8}
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
