import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
const Create = (props) => {
  const {editId,show,setShow} = props;

  console.log("editId",show);
  const navigate = useNavigate();
  const [editMode, seteditMode] = useState(false);
  //console.log("editMode",editMode);
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  })
  const { id } = useParams();
  //console.log("id",id);
   useEffect(() => {
    axios.get("http://localhost:3000/users/" + editId)
      .then(res => {
        setValues(res.data);
        seteditMode(true);
      })
      .catch(err => console.log(err))
      
   }, [editId]);
  //console.log(editMode);


  const handleUpdate = (event) => {
    event.preventDefault();
    seteditMode(true);
    axios.put("http://localhost:3000/users/" + editId, values)
      .then(res => {
        console.log("res.....", res);
        
        //setValues(res.data);
        
        navigate('/');
      })
      .catch(err => console.log(err))
      setShow(false);
      setValues({
        name:'',
        username:'',
        email:'',
        phone:'',
        website:''
      })
     
  }
   
const hanleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/users", values)
      .then(res => {
        //console.log("res.....",res);
        setValues(res.data);
        navigate('/');
      })
      .catch(err => console.log(err))
      setShow(false)
  }

  const handlerMethod = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  //console.log("add value",values);

  return (
    <>
      
      {/* <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'> */}
        {/* <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'> */}
          {/* <h1>Add a User</h1> */}
          <form onSubmit={hanleSubmit}>
            <div className='mb-2'>
              <label htmlFor='name'>Name:</label>
              <input type='text' name='name' className='form-control' placeholder='Enter Name'
                onChange={handlerMethod} value={values.name} />
            </div>
            <div className='mb-2'>
              <label htmlFor='username'>Username:</label>
              <input type='text' name='username' className='form-control' placeholder='Enter Username'
                onChange={handlerMethod} value={values.username}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='email'>Email:</label>
              <input type='email' name='email' className='form-control' placeholder='Enter Email'
                onChange={handlerMethod} value={values.email}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='phone'>Phone:</label>
              <input type='text' name='phone' className='form-control' placeholder='Enter Phone'
                onChange={handlerMethod} value={values.phone}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor='website'>Website:</label>
              <input type='text' name='website' className='form-control' placeholder='Enter Website'
                onChange={handlerMethod} value={values.website}
              />
            </div>
            {
              editMode === true ? "" : <button className='btn btn-success'>Submit</button>
            }
            {
              editMode === false ? "" : <button onClick={handleUpdate} className='btn btn-success'>Update</button>
            }
            <Link to='/' className='btn btn-primary ms-3'>Back</Link>
          </form>
        {/* </div> */}

      {/* </div> */}
    </>

  )
}

export default Create




