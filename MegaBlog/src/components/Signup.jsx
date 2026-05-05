import React, { useState } from "react";
import authService from "../appwrite/auth"
import { Link , useNavigate }  from "react-router-dom";
import { login } from "../store/authSlice";

import {Button , Input , Logo} from "./index";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const {register , handleSubmit} = useForm();

    const onSubmit = async (data) => {
        setError("");
        try {
           const userData =  await authService.createAccount(data);
           if(userData) {
            const currentUser = await authService.getCurrentUser();
            if(currentUser) dispatch(login({ userData: currentUser }));
            navigate("/");
           }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
    <div className="flex items-center justify-center py-12">
            <div className={`mx-auto w-full max-w-md bg-white rounded-2xl p-10 shadow-xl border border-slate-100`}>
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[80px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">Create an account</h2>
                <p className="mt-3 text-center text-sm text-slate-500">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
                {error && <p className="mt-4 text-red-600 text-center bg-red-50 py-2 rounded-lg text-sm font-medium">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <div className='space-y-6'>
                        <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button 
                            type="submit" 
                            className="w-full shadow-lg shadow-indigo-200"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}
export default Signup;