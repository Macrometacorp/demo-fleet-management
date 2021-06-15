import React, { useState } from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import {Button} from '@material-ui/core'
import AlertFilters from './AlertFilters';
import ModalComponent from '../ModalComponent';
import { activeButtonClass } from '../../services/util';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    paddingTop: "1rem",
  },
  pagination: {
    borderRadius:"none"
  },
  activeActionButton: activeButtonClass,
});


export default function AlertsTable() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState({status:false, data:1}); 
  const [modalData, setModalData] = useState({}); 

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
      suggestedAction: <Button variant="contained" color="primary" className={classes.activeActionButton} onClick={()=>setOpenModal({status:true, data: {id:3}})}>Book</Button>
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
      suggestedAction: <Button color="primary" variant="contained" className={classes.activeActionButton} onClick={()=>setOpenModal({status:true, data:{id:4}})}>Book</Button>
    },
  ]


  return (
    <>
    <h3>Alerts</h3>
    <AlertFilters/>
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
      <Pagination className={classes.pagination} count={5} showFirstButton showLastButton />
    </TableContainer>
      <ModalComponent openModal={openModal} closeModal={()=>setOpenModal({status:false, data:{id:0}})} />
    </div>
    </>
  );
}
