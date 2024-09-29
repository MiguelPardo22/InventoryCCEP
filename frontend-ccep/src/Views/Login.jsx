import React, { useState } from "react";
import "../Styles/Login/Login.css";
import logo from "../assets/Images/Logo_Ccep.jpg";
import ServiceAuth from "../Services/ServiceAuth";
import { PrimaryButton } from "../Components/GeneralComponents/PrimaryButton";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Alerta de tostada
  const ok = (msj, icon) => {
    Swal.fire({
      title: msj,
      icon: icon,
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      position: "bottom-end",
      toast: true,
    });
  };

  //Alerta de Carta
  const swalCard = (title, msj, icon) => {
    Swal.fire({
      title: title,
      text: msj,
      icon: icon,
      confirmButtonText: "Entendido",
    });
  };

  const login = async () => {
    try {
      const login = { email, password };

      const response = await ServiceAuth.authentication(login);

      // Acceder al header Authorization
      const token =
        response.headers.get("Authorization") ||
        response.headers.get("authorization");

      if (token) {
        sessionStorage.setItem("authToken", token);
        ok(response.data.message, "success");

        // Si viene de una redirección, navega a esa página, de lo contrario, al dashboard
        const from = location.state?.from?.pathname || "/dashboard/index";
        navigate(from);
      } else {
        throw new Error("Hubo un error, intentelo nuevamente");
      }

      ok(response.data.message, "success");
      navigate("/dashboard/index");
    } catch (error) {
      swalCard("Credenciales Incorrectas", "Email o contraseña Incorectos", "error");
    }
  };

  return (
    <>
      <div className="container position-relative divCard">
        <div class="position-absolute start-50 translate-middle border">
          <div id="form">
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
                onChange={(e) => setEmail(e.target.value)}
                name={email}
                value={email}
                required
              />

              <label htmlFor="psw">
                <b>Contraseña: </b>
              </label>
              <input
                type="password"
                placeholder="Ingrese la contraseña"
                onChange={(e) => setPassword(e.target.value)}
                name={password}
                value={password}
                required
              />
              <br />
              <br />
              <div className="text-center">
                <PrimaryButton
                  text={"Iniciar Sesion"}
                  icon={"fa-solid fa-arrow-right-to-bracket"}
                  execute={() => login()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Login };
