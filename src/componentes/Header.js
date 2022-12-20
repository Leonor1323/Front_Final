import React from "react";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    
    const navigate = useNavigate();

    const cerrarSesion = () =>{
        localStorage.removeItem("token");
        navigate("/");
    }


return (
        <header className="px-4 py-5 bg-[url('https://res.cloudinary.com/dnjpmdspg/image/upload/v1671344206/fondo-ondas-sonido-negro-rojo_34926-200_zzdxub.webp')] border-b">
            <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-black font-black text-center mb-5 md:mb-0">
                Panel Administrador
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-4">
            <input 
                type="submit"
                value="Cerrar Sesión"
                className="bg-transparent mb-5 w-full py-3 text-black uppercase font-bold rounded-full hover:cursor-pointer hover:bg-red-100 transition-colors"
                onClick={cerrarSesion}
            />
            </div>
            </div>
        </header>
    );
}

export default Header;