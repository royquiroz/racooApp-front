import React from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";

const CardSos = ({ sos }) => {
  return (
    <Grid item md={3}>
      <Card className="pointer link">
        <CardContent>
          <Typography variant="title" component="h5">
            {sos.user}
          </Typography>
          <Typography color="textSecondary">{sos.company}</Typography>
          <Typography variant="body2" component="p">
            {sos.problem}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="secondary">Cargar</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardSos;
