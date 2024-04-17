import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa'

const Login = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

  return (
    <div className='login'>
        <main>
            <h1 className='heading'>Login</h1>

            <div>
            <input type="text" placeholder='Email' onChange={(e) => e.target.value} />
            <input type="text" placeholder='OTP' onChange={(e) => e.target.value} />
            </div>
            

            <div>
                <p>Already Signed in once</p>
                <button>
                    <FaGoogle /> <span> Signin with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login