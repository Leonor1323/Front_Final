import React,{ useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from 'react-router-dom';
import crud from '../../conexiones/crud';
import swal from 'sweetalert';

const CrearProductos = () => {
  
  const navigate = useNavigate();
  const { idCategoria} = useParams();

  const [categoria, setCategoria ] = useState({
    nombre:'',
    descripcion:'',
    stock:'',
    precio:'',
    imagen:'',
    categoriaId:''
  });

  const { nombre, descripcion,stock,precio, imagen  } = categoria;


  const onChange = (e) =>{
      setCategoria({
        ...categoria,
        [e.target.name]: e.target.value
      })
  };

  const ingresarCategoria = async () =>{
    const data = {
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      stock: categoria.stock,
      precio: categoria.precio,
      imagen: categoria.imagen,
      categoriaId: idCategoria
    }
   //console.log(data);
  const response = await crud.POST(`/api/productos`, data);
  const mensaje = response.msg;
  const mensaje1 = "La categoria se creo correctamente";
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
    navigate(`/home-productos/${idCategoria}`);
    
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
        <h1 className="inline bg-gradient-to-r from-indigo-200 via-zinc-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          CREAR PRODUCTOS
        </h1>
        </div>

        <div className="mt-10 flex justify-center">
        <form 
        onSubmit={onSubmit}
        className="my-10 bg-[url('https://res.cloudinary.com/dnjpmdspg/image/upload/v1671337684/2b6bf05c9aad2fe5075160722c409e74_lbirsh.jpg')] shadow rounded-lg p-10"
    >
      <div className="my-5">
        <label className="uppercase text-black block text-lx font-bold">Nombre</label>
        <input 
        type="nombre"
        id="nombre"
        name="nombre"
        placeholder="Nombre"
        className="w-full mt-3 p-3 border-0 rounded-full bg-transparent"
        value={nombre}
        onChange={onChange}
        />
  <label className="uppercase text-black block text-lx font-bold">descripcion</label>
        <input 
        type="text"
        id="descripcion"
        name="descripcion"
        placeholder="descripcion"
        className="w-full mt-3 p-3 border-0 rounded-full bg-transparent"
        value={descripcion}
        onChange={onChange}
        />
          <label className="uppercase text-black block text-lx font-bold">stock</label>
        <input 
        type="number"
        id="stock"
        name="stock"
        placeholder="stock"
        className="w-full mt-3 p-3 border-0 rounded-full bg-transparent"
        value={stock}
        onChange={onChange}
        />
          <label className="uppercase text-black block text-lx font-bold">precio</label>
        <input 
        type="number"
        id="precio"
        name="precio"
        placeholder="precio"
        className="w-full mt-3 p-3 border-0 rounded-full bg-transparent"
        value={precio}
        onChange={onChange}
        />

        <label className="uppercase text-black block text-lx font-bold">Imagen</label>
        <input 
        type="text"
        id="imagen"
        name="imagen"
        placeholder="Imagen"
        className="w-full mt-3 p-3 border-0 rounded-full bg-transparent"
        value={imagen}
        onChange={onChange}
        />

      
      </div>
      <input 
          type="submit"
          value="Crear Productos"
          className="bg-transparent mb-5 w-full py-3 text-black uppercase font-bold rounded-full hover:cursor-pointer hover:bg-red-100 transition-colors"
      />

  </form>
        </div>

        </main>
        
    
      </div>
    
    
    </>
    );
}

export default CrearProductos;