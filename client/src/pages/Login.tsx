import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa'
import { auth } from '../firebase';

const Login = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const loginHandler = async() => {
        try{
            const provider = new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth, provider);
            console.log(user);
        }catch(err){
            toast.error("SignIn fail");
        }
    }

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
                <button onClick={loginHandler}> 
                    <FaGoogle /> <span> Signin with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login