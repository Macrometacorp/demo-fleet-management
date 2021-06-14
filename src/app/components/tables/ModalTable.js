import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    paddingTop: "1rem",
  },
  pagination: {
    borderRadius:"none"
  }
});

export default function ModalTable() {
  const classes = useStyles();

  const data = [
    {
      vehicleID: 'PF16VBD',
      alertDescription: 'No Start',	
      dateLogged: 'Just Now',	
      statusLevel: 'Critical',	
      maintenancePlanned: 'Yes',	
      suggestedAction: 'Booked 25 Aug 2021'
    },
    {
      vehicleID: 'PF16VBD',
      alertDescription: 'No Start',	
      dateLogged: 'Just Now',	
      statusLevel: 'Critical',	
      maintenancePlanned: 'No',	
      suggestedAction: <Button variant="contained" onClick={()=>console.log('select date')}>Select</Button>
    },
    {
      vehicleID: 'PF16VBD',
      alertDescription: 'No Start',	
      dateLogged: 'Just Now',	
      statusLevel: 'Critical',	
      maintenancePlanned: 'Yes',	
      suggestedAction: 'Booked 25 Aug 2021'
    },
    {
      vehicleID: 'PF16VBD',
      alertDescription: 'No Start',	
      dateLogged: 'Just Now',	
      statusLevel: 'Critical',	
      maintenancePlanned: 'No',	
      suggestedAction: <Button variant="contained" onClick={()=>console.log('selectdate')}>Select</Button>
    },
  ]


  return (
    <>
    <div className={classes.root}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vechicle ID</TableCell>
            <TableCell align="center">Alert &nbsp; Description</TableCell>
            <TableCell align="center">Date  &nbsp; Logged</TableCell>
            <TableCell align="center">Status level</TableCell>
            <TableCell align="center">Maintenance &nbsp; Planned</TableCell>
            <TableCell align="center">Suggested &nbsp; Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row)=>(
            <TableRow key={Math.random()}>
            <TableCell align="center">{row.vehicleID}</TableCell>
            <TableCell align="center">{row.alertDescription}</TableCell>
            <TableCell align="center">{row.dateLogged}</TableCell>
            <TableCell align="center">{row.statusLevel}</TableCell>
            <TableCell align="center">{row.maintenancePlanned}</TableCell>
            <TableCell align="center">{row.suggestedAction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
}
