import React from "react";
import { Link  } from 'react-router-dom';

const Sidebar = () => {
  
  return (
        <aside className="md:w-80 lg:w-60 px-5 py-10 bg-[url('https://res.cloudinary.com/dnjpmdspg/image/upload/v1671337684/2b6bf05c9aad2fe5075160722c409e74_lbirsh.jpg')]">
            
            
            <Link
                className="bg-transparent w-full p-3 text-black uppercase font-bold mt-5 text-center rounded-full"
                to={"/crear-categoria"}
            >
        Crear Categoria
      </Link>

      <div className="py-10">
      <Link
                className="bg-transparent w-full p-3 text-black uppercase font-bold mt-5 text-center rounded-full"
                to={"/admin"}
            >
        Admin Categorias
      </Link>

      </div>

      
      
        </aside>
    );
}

export default Sidebar;