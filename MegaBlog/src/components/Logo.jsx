import React from "react";

import { Feather } from 'lucide-react'

function Logo({ width = "100px" }) {
    return (
        <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg">
                <Feather className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">MegaBlog</span>
        </div>
    )
}

export default Logo;