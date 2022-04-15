import React, { useState } from "react";
/**
 *
 * @param {*} User
 * @param {*} Password
 */
function SendLogueo(User, Password) {
  let dataUser = {
    User: User,
    Password: Password,
  };
  let Options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUser),
  };
  fetch("http://localhost:9000/signin", Options)
    .then((response) => response.json())
    .then(({ data, notification }) => {
      alert(notification.msg);
      const { Cookie, Nombre, Correo, loggued, Role } = data;
      if (loggued) {
        document.cookie =
          "usuarioLogueado= ;expires = Thu, 01 Jan 1970 00:00:00 GMT";
        let expires = new Date();
        expires.setTime(expires.getTime() + 86400000);
        let cookie = `usuarioLogueado=${Cookie};expires=${expires.toUTCString()};path=/`;
        document.cookie = cookie;
        window.location.reload();
      }
    })
    .catch((err) => {
    });
}
/**
 *
 */
function FormularioDeLogueo() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container">
      <div className="body d-md-flex align-items-center justify-content-between">
        <div className="box-1 mt-md-0 mt-5 h-100">
          <img
            src={"https://images8.alphacoders.com/470/thumb-1920-470318.jpg"}
            alt="BigCo Inc. logo"
          />{" "}
        </div>
        <div className=" box-2 d-flex flex-column h-100">
          <div className="mt-5">
            <p className="mb-1 h-1">Inicia sesión.</p>
            <p className="text-muted mb-2">
              Inicia sesión con tu usuario y contraseña.
            </p>
            <div className="d-flex flex-column ">
              <div className="mt-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    SendLogueo(user, password);
                  }}
                >
                  <div className="form-group">
                    <label for="user">Usuario*</label>
                    <input
                      id="user"
                      required
                      type="text"
                      placeholder="Usuario"
                      onChange={({ target }) => {
                        setUser(target.value);
                      }}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label for="pass">Contraseña*</label>
                    <input
                      id="pass"
                      required
                      type="password"
                      placeholder="Password"
                      onChange={({ target }) => {
                        setPassword(target.value);
                      }}
                      className="form-control"
                    />
                  </div>

                  <button className="btn btn-primary btn-block">Ingresar</button>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <p className="footer text-muted mb-0 mt-md-0 mt-4">
              <span className="p-color me-1">Terminos y condiciones </span>y{" "}
              <span className="p-color ms-1">Politicas de privacidad</span>{" "}
            </p>
          </div>
        </div>{" "}
        <span className="fas fa-times"></span>
      </div>
    </div>
  );
}
export default FormularioDeLogueo;
