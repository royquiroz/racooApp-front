import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography
} from "@material-ui/core";
import estados from "../../helpers/states.json";

const CardCompany = ({ company }) => (
  <Grid item md={3}>
    <Card>
      <CardContent>
        {/*<Typography align="left" color="textSecondary">
          {company.kind}
</Typography>*/}
        <Typography variant="title" component="h5">
          {company.name ? company.name : `Lic. ${company.lawyer}`}
        </Typography>
        {company.number ? (
          <Typography variant="subheading" component="h4">
            Notaria No. {company.number}
          </Typography>
        ) : null}
        <Typography color="textSecondary">{estados[company.state]}</Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary" size="small">
          Ver Mas
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

export default CardCompany;
