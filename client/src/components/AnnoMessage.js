import React from "react";
// import { Container, Table } from "semantic-ui-react";
import "./annoMessage.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,

  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "black"
  },
  name: {
    fontWeight: "bold",
    color: "black"
  },
}));

function AnnoMessage(props) {
  const { data } = props;
  let message;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (data) {
    message = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((message) => (
            <TableRow key={message.name}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{message.name}</Typography>
                          {/* <Typography color="textSecondary" variant="body2">{message.date}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.phone}</Typography> */}
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography  variant="subtitle2">{message.title}</Typography>
                  {/* <Typography color="textSecondary" variant="body2">{row.company}</Typography> */}
                </TableCell>
              <TableCell>{message.date}</TableCell>
            </TableRow>
          ))}
  

  return (
    <div className="data-row">
      {/* <Table collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Premium Plan</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{message}</Table.Body>
      </Table> */}

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>
                User Info
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Job Info
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Joining Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {message}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AnnoMessage;
