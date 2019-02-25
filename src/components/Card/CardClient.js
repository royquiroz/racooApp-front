import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography
} from "@material-ui/core";

const CardClient = ({ client, goToClient }) => (
  <Grid item md={3}>
    <Card onClick={() => goToClient(client)} className="pointer link">
      <CardContent>
        <Typography variant="title" component="h5">
          {client.name} {client.last_name}
        </Typography>
        {
          <Typography color="textSecondary">
            {client.company.kind === "NOTARY"
              ? `Notaria No. ${client.company.number}`
              : `${client.company.name}`}
          </Typography>
        }
        {/*company.number ? (
          <Typography variant="subheading" component="h4">
            Notaria No. {company.number}
          </Typography>
        ) : null*/}
      </CardContent>
      <CardActions>
        <Button
          color="secondary"
          component={Link}
          size="small"
          to={`/client/${client._id}`}
        >
          Ver Mas
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

export default CardClient;
