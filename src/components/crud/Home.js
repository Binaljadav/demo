import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Link } from 'react-router-dom';
//import Swal from 'sweetalert2';
// import swal from 'sweetalert';
 import Modal from 'react-bootstrap/Modal';
 import Button from 'react-bootstrap/esm/Button';
import Create from './Create';

import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => {

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState()
  const [delshow,setDelShow]=useState(false);


  const handleClose = () => setShow(false);
  const handleShow = (id) => { 
    return setShow(true), 
    setEditId(id) };
//console.log("editId",editId);
  
const handleDeleteClose = () => setDelShow(false);
const handleDeleteShow = (id) => { return setDelShow(true),setEditId(id)};

useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [data]);
  
console.log("data",data)
  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/users/" + editId)
            .then(res => console.log("........",res))
            .catch(err => console.log(err));
    setDelShow(false);
    
  }
  console.log(delshow)

  return (

    <>
     
      <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100 '>
        <h1>List Of Users</h1>
        <div className='w-75 rounded  bg-white border shadow p-4'>
          <div className='d-flex justify-content-end'>
            {/* <Link to="/create" className='btn btn-success'>Add +</Link> */}
            <button onClick={() => handleShow()}>Add</button>
          </div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((d, i) => {
                  return (
                    <tr key={i}>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>{d.username}</td>
                      <td>{d.email}</td>
                      <td>{d.phone}</td>
                      <td>{d.website}</td>
                      <td>
                        {/* <Link to={`/edit/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link> */}
                        <Button className='btn btn-success' onClick={() => handleShow(d.id)}>Edit</Button>
                        {/* <button onClick={e => handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button> */}
                        <Button className='btn btn-danger' onClick={e=>handleDeleteShow(d.id)}>Delete</Button>                     
                      </td>
                    </tr>
                  )


                })
              }
            </tbody>
          </table>
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Create editId={editId} show={show} setShow={setShow}/>

          


        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      
        </Modal>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
       
      <Modal show={delshow} onHide={handleDeleteClose}>
           
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="alert alert-danger">
                    Are you sure you want to delete this?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                    Cancel
                </Button> 
                 <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
      </Modal>
    </>
  )
}


export default Home