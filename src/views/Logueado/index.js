import React from "react";
import Welcome from "./Logueado.components/Welcome.js";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { stateUser } from "../../store/Usuario/reducer.js";
import { connect } from "react-redux";
import Character from "./Logueado.components/Characters.js";
import Citas from "./Logueado.components/Citas.js";
import { Link } from "react-router-dom";
import "./Logueado.css";
import Episodes from "./Logueado.components/Episodes.js";
/**
 *
 * @param {*} param0
 */
function Logueado({ setUserData }) {
  const { User, Role } = setUserData;
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
          <h5 className="my-0 mr-md-auto font-weight-normal">
            <Link className="p-2 text-dark" to="/">
              TelePerformance
            </Link>
          </h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <Route path="/*">
              <Link className="p-2 text-dark" to="/characters">
                Personaje
              </Link>
            </Route>

            {Role === "admin" && (
              <Link className="p-2 text-dark" to="/episodes">
                Episodios
              </Link>
            )}

            {Role === "admin" && (
              <Link className="p-2 text-dark" to="/citas">
              Citas
            </Link>
            )}
          </nav>
          <button className="btn btn-outline-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </div>

        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Bienvenido {User}</h1>
          <p className="lead">
            Quickly build an effective pricing table for your potential
            customers with this Bootstrap example. It's built with default
            Bootstrap components and utilities with little customization.
          </p>
        </div>

        <div className="container">
          <Switch>
            <Route exact path="/characters" children={<Character />} />
            <Route
              exact
              path="/episodes"
              children={<Episodes />}
              render={() =>
                Role === "admin" ? <Episodes /> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/citas"
              children={<Citas />}
              render={() =>
                Role === "admin" ? <Citas /> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/"
              children={<Welcome />}
            />
            <Route path="/*">
              <Welcome />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

/**
 *
 */
const logout = () => {
  document.cookie =
    "usuarioLogueado =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  window.location.reload();
};

/**
 *
 * @param {*} state
 */
const mapToStateData = (state) => {
  return {
    ...state,
    ...stateUser,
  };
};
export default connect(mapToStateData)(Logueado);
