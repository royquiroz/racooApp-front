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
import estados from "../../helpers/states.json";

const CardCompany = ({ company, goToCompany }) => (
  <Grid item md={3}>
    <Card onClick={() => goToCompany(company)} className="pointer link">
      <CardContent>
        <Typography align="right" color="textSecondary">
          {company.key}
        </Typography>
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
        <Button
          color="secondary"
          component={Link}
          size="small"
          to={`/company/${company._id}`}
        >
          Ver Mas
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

export default CardCompany;
