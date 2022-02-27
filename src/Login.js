import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img from "./imgs/2.jpg"

const Login = ({email, setEmail, password, setPassword, setLoadingModalVisibility, setRenderMessage}) => {

  // 
  let navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    setLoadingModalVisibility(true)
    setRenderMessage(<div className="spinner"></div>)

    e.preventDefault()    

    if (email.length === 0 || password.length === 0) {
      setRenderMessage(<div><p>Introduce usuario y contraseña para continuar</p><button className="modal_acept_btn" type="button" onClick={() => {setLoadingModalVisibility(false)}}>Aceptar</button></div>)
    } else if (email === "challenge@alkemy.org" && password === "react"){

      const token = "TOKEN";
      localStorage.setItem("token", token);
      navigate("/")
      setLoadingModalVisibility(false)

      setEmail("");
      setPassword("");

    } else if(email !== "challenge@alkemy.org" || password !== "react") {
      setRenderMessage(<div><p>Ha ocurrido un error, intenta de nuevo</p><button className="modal_acept_btn" type="button" onClick={() => {setLoadingModalVisibility(false)}}>Aceptar</button></div>)
    }



  };

    return ( 
        <div className='loggin_area'>

          <div className='loggin_photo_container'>
            <img className="loggin_photo_img" src={img} alt="foto de platos variados" />
          </div>

          <div className='loggin_form_container'>
            <form onSubmit={handleLoginSubmit}>
              <div className='form-floating'>
                <input
                  id='usuario'
                  type='text'
                  className='form-control'
                  placeholder='ejemplo@alkemy.org'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <label htmlFor='usuario'>Usuario</label>
              </div>
              <div className='form-floating'>
                <input
                  className='form-control'
                  placeholder='contraseña'
                  id='contraseña'
                  type='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <label htmlFor='contraseña'>Contraseña</label>
              </div>

              <button type='submit'>Entrar</button>
            </form>
          </div>
        </div>
     );
}
 
export default Login;