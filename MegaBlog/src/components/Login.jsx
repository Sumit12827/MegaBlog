import React, { useState } from "react";
import { Link  , useNavigate }  from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import {Button , Input , Logo} from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin({ userData }));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full py-12">
            <div className={`mx-auto w-full max-w-md bg-white rounded-2xl p-10 shadow-xl border border-slate-100`}>
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[80px]"> 
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">Sign in to your account</h2>
                <p className="mt-3 text-center text-sm text-slate-500">
                    Don&apos;t have an account?&nbsp;
                    <Link 
                        to="/signup" 
                        className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                        Create an account
                    </Link>
                </p>

                {error && <p className="mt-4 text-red-600 text-center bg-red-50 py-2 rounded-lg text-sm font-medium">{error}</p>}

                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className='space-y-6'>
                        <Input 
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPatern: (value) => 
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Please enter a valid email address"
                                }
                            })}
                        />

                        <Input 
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", { 
                                required: "Password is required" 
                            })}
                        />

                        <Button
                            type="submit"
                            className="w-full shadow-lg shadow-indigo-200"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;