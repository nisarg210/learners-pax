import React, { useState } from "react";
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
import { Modal } from "semantic-ui-react";
const useStyles = makeStyles((theme) => ({
  table: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  tableContainer: {
    borderRadius: 15,
  },

  tableHeaderCell: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  name: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
}));

function AnnoMessage(props) {
  const { data } = props;
  let message;

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [title,setTitle] =useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (data) {
    message = data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((message) => (
        <TableRow hover key={message.name} onClick={() => {setOpen(true); setTitle(message.title)}}>
          <TableCell>
            <Typography className={classes.name}>{message.title}</Typography>
          </TableCell>
          <TableCell>
            <Grid container>
              <Grid item>
                <Typography className={classes.name}>{message.name}</Typography>
              </Grid>
            </Grid>
          </TableCell>
          <TableCell className={classes.name}>{message.date}</TableCell>
        </TableRow>
      ));
  }

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
            <TableRow hover>
              <TableCell className={classes.tableHeaderCell}>Title</TableCell>
              <TableCell className={classes.tableHeaderCell}>Faculty</TableCell>
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{message}</TableBody>
          <TableFooter>
            <TablePagination
              className={classes.name}
              component="div"
              rowsPerPageOptions={[10, 15]}
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
      <Modal size="large" open={open} onClose={() => setOpen(false)}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
          </p>
        </Modal.Content>
        {/* <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button positive onClick={() => dispatch({ type: "close" })}>
            Yes
          </Button>
        </Modal.Actions> */}
      </Modal>
    </div>
  );
}

export default AnnoMessage;
