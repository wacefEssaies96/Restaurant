import React, { useEffect } from 'react';
import { useState } from 'react';
import { deletePlat, fetchData } from '../services/platService';
import { Link } from "react-router-dom";
import { confirmDelete } from '../services/alerts';

export default function Admin() {

  const [platsList, setPlatsList] = useState([])

  const getList = async () => {
    setPlatsList(await fetchData("http://localhost:3030/menu/find-all"))
  }
  useEffect(() => {
    getList()
  }, [])

  const submitDelete = async (id) => {
    confirmDelete(id, getList)
  }

  return (
    <div className="container-xxl py-5" style={{ marginTop: "5%" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="d-felx justify-content-between">
            <h1>Liste de tous les menus</h1>
            <Link to="/admin/add" className="btn btn-success">
              Ajouter
            </Link>
          </div>
          <div className="col-lg-12">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Libelle</th>
                  <th scope="col">Prix</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {platsList.map((p, i) => <tr key={i}>
                  <td style={{ width: "50%" }}><img src={`http://localhost:3030/${p.image}`} alt='platPic' style={{ width: "60%", height: "60%" }} /></td>
                  <td>{p.libelle}</td>
                  <td>{p.prix} DT</td>
                  <td>
                    <Link to={`/admin/edit-menu/${p._id}`} className="btn" style={{ backgroundColor: "#59bb1a", color: "white", borderRadius: "10px", marginRight: "20px" }}>Edit</Link>
                    <button className="btn" style={{ backgroundColor: "#b61919", color: "white", borderRadius: "10px" }} onClick={() => submitDelete(p._id)}>Supprimer</button>
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}