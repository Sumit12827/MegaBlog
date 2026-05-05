import React  , {useId} from "react"; 

function Select({
    options ,
    label ,
    className ,
    ...props

} , ref) {
    const id = useId();
    return(
     <div className="w-full"> 
        {label && (
            <label 
                htmlFor={id} 
                className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700"
            >
                {label}
            </label>
        )}
        <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2.5 rounded-lg bg-white text-slate-900 outline-none focus:bg-white duration-200 border border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 w-full shadow-sm ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
     </div>
    )
}

export default React.forwardRef(Select);