import React from "react";
import { Link  , useNavigate }  from "react-router-dom";
import {Login as authLogin} from "../store/authService";
import {Button , Input , Logo} from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { set, useForm } from "react-hook-form";



function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {register , handleSubmit} = useForm();

    const [error , setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
          session =   await authService.login(data);
           if(session){
            const user = await authService.getCurrentUser();
            if(userData) dispatch(authLogin(userData));
            navigate("/")

            
           }




        } catch(error) {
            setError(error.message);
        }

    }

    return (
        <div className=" flex items-centre justify-centre w-full">

            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            
           <div className=" mb-2 flex justify-centre "> <span className="inline-block w-full max-w-[100]"> 
            <Logo width = "100%" />
            </span></div>

<h2 className="text-centre text-2xl font-bold leading-tight ">signin to your account</h2>

<p className="mt-2 text-centre text-base text-black/60">
Don&apos;t have account? <Link to = "/signup" className="text-blue-500 hover:underline">Signup</Link>

</p>



{error && <p className="text-red-500 text-centre">{error}</p>}

<form onSubmit={handleSubmit(login)} className="mt-8 w-full">
    
    <div className= 'space-y-5'>


        <Input 
        label = "Email"
        placeholder = "Enter your email"
        type = "email"
        {...register("email" , {required: true  , validate: {matchPatern: (value) => 
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Please enter a valid email address"
        }})}
        
        />

        <Input 
        label = "Password"
        placeholder = "Enter your password"
        type = "password"
        {...register("password" , {required: true})}
        />

        <button 
        type="submit"
        className="w-full"
        >sign in 
        </button>
    </div>

</form>

            </div>
        </div>
    )
}