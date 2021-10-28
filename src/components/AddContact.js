import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { toast } from "react-toastify";

const AddContact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handelSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find((contact) =>
      contact.email === email ? contact : null
    )
     const checkNumber = contacts.find(
       (contact) => contact.number === parseInt(number) 
     )

    if (!email || !name || !number) {
      return toast.warning('Please fill in all fields!!');
    }

    if(checkEmail){
      return toast.warning('this email already exits ')
    }
       if (checkNumber) {
         return toast.error('this number already exits ')
       }
    const data = {
      id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      number
    }
    dispatch({type: "ADD_CONTACT", payload: data});
    toast.success('student added successfully');
    history.push('/')
  }

    return (
      <div className='container'>
        <div className='row'>
          <h1 className='col-md-12 my-5 display-3 text-center'>Add Contact</h1>
          <div className='col-md-6 shadow mx-auto p-5'>
            <form onSubmit={handelSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='name'
                  className='form-control'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='email'
                  className='form-control'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='number'
                  placeholder='phone number'
                  className='form-control'
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <input
                  className='btn btn-block btn-dark'
                  type='submit'
                  value='Add Student'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}

export default AddContact
