import React,{ useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const Login = () => {
  
  const navigate = useNavigate();

  const [usuario, setUsuario ] = useState({
    email:'',
    password:''
  });

  const { email, password} = usuario;


  const onChange = (e) =>{
      setUsuario({
        ...usuario,
        [e.target.name]: e.target.value
      })
  };


  const ingresarCuenta = async () =>{
    // los dos password deben ser iguales
    const data = {
      email: usuario.email,
      password: usuario.password
    }
    console.log(data);
    const response = await crud.POST(`/api/auth`, data);
    const mensaje = response.msg;
      //console.log(mensaje);
      if(mensaje === "el usuario no existe"){
        const mensaje = "el usuario no existe";
      swal({
        title:'Error',
        text: mensaje,
        icon: 'error',
        buttons:{
          confirm:{
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
      }else if(mensaje === "password incorrecto"){
        const mensaje = "password incorrecto";
        swal({
          title:'Error',
          text: mensaje,
          icon: 'error',
          buttons:{
            confirm:{
              text: 'OK',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        });
      } else{
        const jwt = response.token;

        //guardar la informacion en el localStorage
        localStorage.setItem('token', jwt);
        
        //redireccionar nuevamente a la pagina de login
        navigate("/admin");
      } 
      
    
    
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    ingresarCuenta();
  }

  return (
  <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center text-center'>
  <div className='md:w-2/3 lg:w-2/5'>
  <h1 className="inline bg-gradient-to-r from-indigo-200 via-fuchsia-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
      Iniciar Sesión
    </h1>
    <form 
      onSubmit={onSubmit}
      className="my-10 bg-[url('https://res.cloudinary.com/dnjpmdspg/image/upload/v1671337684/2b6bf05c9aad2fe5075160722c409e74_lbirsh.jpg')] shadow rounded-lg p-10"
    >
      <div className="my-5">
        <label className="uppercase text-black block text-lx font-bold">Email</label>
        <input 
        type="email"
        id="email"
        name="email"
        placeholder="Email de Registro"
        className="w-full mt-3 p-3 border rounded-full bg-transparent"
        value={email}
        onChange={onChange}
        />

        <label className="uppercase text-black block text-lx font-bold">Password</label>
        <input 
        type="password"
        id="password"
        name="password"
        placeholder="Password de Registro"
        className="w-full mt-3 p-3 border rounded-full bg-transparent"
        value={password}
        onChange={onChange}
        />
      </div>
      <input 
          type="submit"
          value="Iniciar Sesión"
          className="bg-transparent mb-5 w-full py-3 text-black uppercase font-bold rounded-full hover:cursor-pointer hover:bg-red-100 transition-colors"
      />

      <Link
        className="block text-center my-5 "
      to={"/crear-cuenta"}
      >
        Crear Cuenta
      </Link>
  </form>

  </div>
    
  </main>
    );
}

export default Login;