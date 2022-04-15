import React, { useState } from "react";
import Fetch from "../../../components/Fetch.js";
import Loader from "../../../components/Loader.jsx";

function getCharacters(setPosts, setPeticion, setLoading) {
  Fetch("get/characters")
    .then(({ data }) => {
      setPeticion(false);
      setPosts(data);
      setLoading(false);
    })
    .catch((err) => {
    });
}

/**
 *
 * @param 
 */
function Character() {
  const [peticion, setPeticion] = useState(true);
  const [loading, setLoading] = useState(true);
  const [Posts, setPosts] = useState([]);
  if (peticion) {
    getCharacters(setPosts, setPeticion, setLoading);
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="card-columns">
      {Posts.map(
        (
          { birthday, category, img, name, nickname, portrayed, status },
          xId
        ) => {
          return (
            <div className="card">
              <img src={img} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">
                  {name} {"("}
                  {nickname}
                  {")"}
                </h5>
                <p className="card-text">
                  <small className="text-muted">{portrayed}</small>
                </p>
                <p className="card-text">{birthday}</p>
                <p className="card-text">
                  <span className="badge badge-primary">{status}</span>
                </p>
                <p className="card-text">
                  <small className="text-muted">{category}</small>
                </p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default Character;
