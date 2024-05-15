import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
<<<<<<< HEAD
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.email!==undefined && formData.password!==undefined &&formData.username!== undefined){
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
    }else{
        setError('Please enter all details');
=======
  const [formData, setFormData] =useState({})
  const [error,setError]= useState(false)
  const [loading,setLoading]= useState(false)
  const handlechange =(e)=>{
    setFormData ({...formData,[e.target.name]:e.target.value})

  }
  const navigator= useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      setError(false)
      const res = await fetch ('/api/auth/sign-up',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)});
        
        setLoading(false)
        const data=await res.json();
        if (data.success === false){
          setError(true)
          return;
        }

       navigator('/sign-in')
      } catch (error) {
        setLoading(false)
        setError(true)
>>>>>>> parent of 9eb9d6b (initial commit)
        
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
<<<<<<< HEAD
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
          maxLength='32'
          minLength='8'
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
=======
    <div>
      <div className="max-w-lg p-4 mx-auto">
        <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
        <form onSubmit={handleSubmit}className="flex flex-col gap-4 p-4">
          {/* <label htmlFor="username">Username</label> */}
          <input
            type="text"
            name="username"
            onChange={handlechange}
            className="bg-gray-100 p-3 rounded-lg"
            id="username"
            placeholder="Username"
          />
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            name="email"
            onChange={handlechange}
            className="bg-gray-100 p-3 rounded-lg"
            id="useremail"
            placeholder="Email"
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            name="password"
            onChange={handlechange}
            className="bg-gray-100 p-3 rounded-lg"
            id="userpass"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-green-700 p-4 text-white rounded-xl uppercase hover:opacity-95 disabled:opacity-80"
            name="submit"
            disabled={loading}
          >{loading? 'Loading...':'Sign up' } </button>
          <OAuth/>
        </form>
        <div className="flex mx-4 gap-2">
          <p>
            Have an account? 
          </p>
            <Link to="/sign-in">
              <span className="text-blue-600 ">SignIn</span>
            </Link>
        </div>
        <div className="text-red-500 mx-4 ">
          {error&&'There is an error'}
        </div>
>>>>>>> parent of 9eb9d6b (initial commit)
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
