import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'

export default function SingIn() {
  const [formData, setFormData] = useState({}) ; 

  const {loading , error} = useSelector((state) => state.user) ;

  const navigate = useNavigate();

  const dispatch = useDispatch() ; 
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      }
    );

  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // setLoading(true);
      dispatch(signInStart() ) ; 

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false ) {
        dispatch(signInFailure(data.message)) ;
        return;
      }

      dispatch(signInSuccess(data)) ; 
      navigate('/');

    } catch (error) {
      dispatch(signInFailure(error.message)) ; 
    }
  };

  console.log(formData);
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100'>

      <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>

        <h1 className='text-3xl text-center font-bold text-slate-800 mb-6'>
          SIGN IN
        </h1>

        <form className='flex flex-col gap-4'
          onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder='Email'
            id='email'
            className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400'
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder='Password'
            id='password'
            className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400'
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className='bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-3 rounded-lg hover:bg-slate-800 transition duration-200'
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>



        </form>

        <div className='flex gap-2 mt-5 text-sm justify-center'>
          <p>Don't have an account?</p>
          <Link to={"/sign-up"}>
            <span className='text-blue-500 hover:underline'>
              Sign up
            </span>
          </Link>
        </div>
        {error && (
          <p className='text-red-500 text-sm mt-2 text-center'>
            {error}
          </p>
        )}
      </div>

    </div>
  )
}