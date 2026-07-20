import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/",
          {
            username,
            password,
          }
        );
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);

        navigate("/dashboard");
      } catch (error){
          alert("Invalid Username or Password");
          console.log(error);
      }
    };
    

  return (
    <div className='max-w-md mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          className='border p-2 w-full mb-3'
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type='password'
          placeholder='Password'
          className='border p-2 w-full mb-3'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className='bg-blue-600 text-white px-4 py-2'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
        