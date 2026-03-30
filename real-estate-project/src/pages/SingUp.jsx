import React from 'react'
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'

export default function SingUp() {
  const [formData , setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id] : e.target.value ,
      }
    );

  } ;
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  console.log(formData) ;
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100'>

      <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>

        <h1 className='text-3xl text-center font-bold text-slate-800 mb-6'>
          SIGN UP
        </h1>

        <form className='flex flex-col gap-4' 
        onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder='Username'
            id='username'
            className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400'
            onChange={handleChange}
          />

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
            disabled = {loading}
            className='bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-3 rounded-lg hover:bg-slate-800 transition duration-200'
          >
            {loading ? 'Loading...' : 'Sign up'}
          </button>

          <OAuth/>

        </form>

        <div className='flex gap-2 mt-5 text-sm justify-center'>
          <p>Already have an account?</p>
          <Link to={"/sign-in"}>
            <span className='text-blue-500 hover:underline'>
              Sign in
            </span>
          </Link>
        </div>

      </div>

    </div>
  )
}