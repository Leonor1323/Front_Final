import React,{ useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from 'react-router-dom';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const CrearCategoria = () => {
  
  const navigate = useNavigate();

  const [categoria, setCategoria ] = useState({
    nombre:'',
    imagen:''
  });

  const { nombre, imagen } = categoria;


  const onChange = (e) =>{
      setCategoria({
        ...categoria,
        [e.target.name]: e.target.value
      })
  };

  const ingresarCategoria = async () =>{
    const data = {
      nombre: categoria.nombre,
      imagen: categoria.imagen
    }
   //console.log(data);
  const response = await crud.POST(`/api/categorias`, data);
  const mensaje = response.msg;
  const mensaje1 = "la categoria se creo correctamente";
    swal({
      title:'Información',
      text: mensaje1,
      icon: 'success',
      buttons:{
        confirm:{
          text: 'OK',
          value: true,
          visible: true,
          className: 'btn btn-primary',
          closeModal: true
        }
      }
    });
    //redireccionar nuevamente a la pagina de login
    navigate("/admin");
    
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    ingresarCategoria();
  }


  return (
    <>
      <Header/>
      <div className="md:flex md:min-h-screen">
        <Sidebar/>
        <main className="flex-1">
        <div className="mt-10 flex justify-center">
        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          CREAR CATEGORIA
        </h1>
        </div>

        <div className="mt-10 flex justify-center">
        <form 
        onSubmit={onSubmit}
        className="my-10 bg-[url('https://res.cloudinary.com/dnjpmdspg/image/upload/v1671337684/2b6bf05c9aad2fe5075160722c409e74_lbirsh.jpg')] shadow rounded-lg p-10"
    >
      <div className="my-5">
        <label className="uppercase text-black block text-lx font-bold">Nombre de la categoria</label>
        <input 
        type="nombre"
        id="nombre"
        name="nombre"
        placeholder="Nombre"
        className="w-full mt-3 p-3 border rounded-full bg-transparent"
        value={nombre}
        onChange={onChange}
        />

        <label className="uppercase text-black block text-lx font-bold">Imagen de la categoria</label>
        <input 
        type="text"
        id="imagen"
        name="imagen"
        placeholder="Imagen"
        className="w-full mt-3 p-3 border rounded-full bg-transparent"
        value={imagen}
        onChange={onChange}
        />

      
      </div>
      <input 
          type="submit"
          value="Crear Categoria"
          className="bg-transparent mb-5 w-full py-3 text-black uppercase font-bold rounded-full hover:cursor-pointer hover:bg-red-100 transition-colors"
      />

  </form>
        </div>

        </main>
        
    
      </div>
    
    
    </>
    );
}

export default CrearCategoria;