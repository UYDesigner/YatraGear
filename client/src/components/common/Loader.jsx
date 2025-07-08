import React from 'react';
import { Loader2 } from "lucide-react"; // ShadCN/Lucide spinner icon

const Loader = () => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#18181888] bg-opacity-30">
      <Loader2 className="w-10 h-10 animate-spin text-[#000000]" />
    </div>
  )
}

export default Loader