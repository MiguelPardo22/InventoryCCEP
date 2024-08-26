  import React from "react";
  import "../Styles/Login/Login.css";
  import logo from "../assets/Images/Logo_Ccep.jpg";
  import { PrimaryButton } from "../Components/GeneralComponents/PrimaryButton";

  function Login() {
    return (
      <>
        <div className="container position-relative">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div class="position-absolute start-50 translate-middle border">
            <form action="" method="">
              <div class="imgcontainer">
                <img src={logo} alt="Avatar" class="avatar" />
              </div>

              <div class="containerLogin">
                <label htmlFor="uname">
                  <b>Correo Electronico: </b>
                </label>
                <input
                  type="text"
                  placeholder="Ingrese el Correo Electronico"
                  name="uname"
                  required
                />

                <label htmlFor="psw">
                  <b>Contraseña: </b>
                </label>
                <input
                  type="password"
                  placeholder="Ingrese la contraseña"
                  name="psw"
                  required
                />
                <br />
                <br />
                <div className="text-center">
                  <PrimaryButton
                    text={"Iniciar Sesion"}
                    icon={"fa-solid fa-arrow-right-to-bracket"}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  export { Login };
