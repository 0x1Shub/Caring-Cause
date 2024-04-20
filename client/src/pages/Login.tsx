import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa'
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userAPI';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import { MessageResponse } from '../types/api-types';

const Login = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");

    const [login] = useLoginMutation();

    const loginHandler = async () => {
        try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);

        console.log({
            name: user.displayName!,
            email: user.email!,
            photo: user.photoURL!,
            gender,
            role: "user",
            dob: date,
            _id: user.uid,
        });

        const res = await login({
            name: user.displayName!,
            email: user.email!,
            photo: user.photoURL!,
            gender,
            role: "user",
            dob: date,
            _id: user.uid,
        });

        if ("data" in res) {
            toast.success(res.data.message);
            // const data = await getUser(user.uid);
            // dispatch(userExist(data?.user!));
        } else {
            const error = res.error as FetchBaseQueryError;
            const message = (error.data as MessageResponse).message;
            toast.error(message);
            // dispatch(userNotExist());
        }
        } catch (error) {
        toast.error("Sign In Fail");
        }
    };

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