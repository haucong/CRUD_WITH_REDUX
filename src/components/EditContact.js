import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';

const EditContact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')

    const {id} = useParams();


    const contacts = useSelector((state) => state);
    const dispatch = useDispatch();

    const history = useHistory();
    const currentContact = contacts.find((contact) => contact.id === parseInt(id));

    useEffect(() =>{
      if(currentContact){
        setName(currentContact.name);
        setEmail(currentContact.email)
        setNumber(currentContact.number)
      }
    },[currentContact])

    const handelSubmit = (e) => {
      e.preventDefault()

      const checkEmail = contacts.find((contact) =>
        contact.email === email && contact.id !== currentContact.id
          ? contact
          : null
      )

      const checkNumber = contacts.find(
        (contact) => contact.id != parseInt(id) && contact.number ===parseInt(number)
      );

      if (!email || !name || !number) {
        return toast.warning('Please fill in all fields!!')
      }

      if (checkEmail) {
        return toast.warning('this email already exits ')
      }
      if (checkNumber) {
        return toast.error('this number already exits ')
      }
      const data = {
        id: parseInt(id),
        name,
        email,
        number,
      }
      dispatch({ type: 'UPDATE_CONTACT', payload: data })
      toast.success('student update successfully')
      history.push('/')
    }

    return (
      <div className='container'>
        {currentContact ? (
          <>
            <div className='row'>
              <h1 className='col-md-12 my-5 display-3 text-center'>
                edit Contact {id}{' '}
              </h1>
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
                  <div className='form-group text-center'>
                    <input
                      className='btn btn-block btn-dark'
                      type='submit'
                      value='Update'
                    />
                    <Link to='/' className='btn btn-danger ml-3'>
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <h1 className='display-3 my-5 text-center'>
            {' '}
            Studentcontact with id {id} not exists
          </h1>
        )}
      </div>
    )
}

export default EditContact
