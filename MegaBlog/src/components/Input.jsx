import React , {useId}  from "react";

const Input = React.forwardRef(function Input({
    label ,
    type = "text" ,
    className = "",
    ...props
} , ref) {
    const id = useId();
    return (
        
        <div className = "w-full">
            {label && (
                <label 
                    className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700" 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            
            <input
                type={type}
                className={`px-3 py-2.5 rounded-lg bg-white text-slate-900 outline-none focus:bg-white duration-200 border border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 w-full shadow-sm ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input;
