import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



class User extends Component {
 

    state = {
        id: '',
        users: []
      }

    componentDidMount() {
        axios.get(`/users`)
          .then(res => {
            const users = res.data;
            this.setState({ users : res.data });
          })
      }

    
      handleSubmit = event => {
        event.preventDefault();
    
        axios.delete(`/user/${this.state.users.id}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }

    render() {
        return (
            <div>
                <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">User name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
              </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.password}</TableCell>
              <TableCell align="right"> <div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Delete</button>
        </form>
      </div> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
        );
    }
}

export default User;