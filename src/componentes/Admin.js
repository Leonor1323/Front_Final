import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import crud from "../conexiones/crud";
import Header from "./Header";
import Sidebar from "./Sidebar";
import swal from 'sweetalert';

const Admin = () => {
  
  const navigate = useNavigate();

  useEffect(() =>{
    const autenticarUsuario = async () =>{
      const token = localStorage.getItem('token')
      //console.log(token)
      if(!token){
        navigate("/login");
      }

    }
    autenticarUsuario()
  },[navigate]);//[] se ejecuta solo una vez
  
  
  const [categoria, setCategoria] = useState([]);
  
  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categorias`);
    console.log(response);
    setCategoria(response.categoria);
  }

  useEffect(() => {
    cargarCategorias();
  },[]);


  const borrarCategoria = async (e, idCategoria) => {
    swal({
      title: "Estas seguro de eliminar esta categoria?",
      text: "Una vez eliminado, no podra recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        e.preventDefault();
        const response = crud.DELETE(`/api/categorias/${idCategoria}`);
        //console.log(response.msg);
        const mensaje = response.msg;
        if(response){
          swal("Tu categoria se eliminó correctamente", {
            icon: "success",
          });
        }
        cargarCategorias();
      } else {
        swal("Se canceló la acción");
      }
    });
  
  }


  const actualizarCategoria = async ( idCategoria) =>{
    
    navigate(`/actualizar-categoria/${idCategoria}`)

  }  

  const crearProductos = async (idCategoria) =>{
    navigate(`/home-productos/${idCategoria}`);
  }

  return (
    <>
      <Header/>
<div className="md:flex md:min-h-screen text-center">
        <Sidebar/>
  <main className="flex-1 space-x-96 space-y-10">
        <h1 className="inline bg-gradient-to-r from-indigo-200 via-fuchsia-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          LISTA DE CATEGORIAS
        </h1>
    <div>
      <table>
        <thead className="bg-white text-2xl bg-[url('https://res.cloudinary.com/dnjpmdspg/image/upload/v1671341301/black-soundwave-texture-background-abstract-line-blend-equalizer-element-dynamic-motive-pattern-vector_irrk1q.jpg')]">
          <tr>
            <th>IMAGEN</th>
            <th>NOMBRE</th>
            <th>ID</th>
            <th>OPCIONES</th>
          </tr>
        </thead>

        <tbody className=" ">
          {
            categoria.map(
              item => 
              <tr key={item._id}>
                <td><img src={item.imagen} width="150" height="150"></img></td>
                <td>{item.nombre}</td>
                <td>{item._id}</td>
                <td>
                <input 
                type="submit"
                value="Eliminar"
                className=" mb-5 w-full py-3 text-white uppercase  rounded-full hover:cursor-pointer hover:bg-neutral-700 transition-colors"
              onClick={(e) => borrarCategoria(e, item._id)}
            />
            <input 
                type="submit"
                value="Actualizar"
                className=" mb-5 w-full py-3 text-white uppercase f rounded-full hover:cursor-pointer hover:bg-neutral-700 transition-colors"
                onClick={(e) => actualizarCategoria(item._id)}
            />
            <input 
                type="submit"
                value="Crear Producto"
                className=" mb-5 w-full py-3 text-white uppercase  rounded hover:cursor-pointer hover:bg-neutral-700 transition-colors"
                onClick={(e) => crearProductos(item._id)}
            />
                </td>
              </tr>
            )
          }

        </tbody>

      </table>
    </div>
  </main>
</div>
    </>
    );
}

export default Admin;