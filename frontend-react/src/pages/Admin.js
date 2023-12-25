import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchData } from '../services/platService';
import { Link } from "react-router-dom";
import { confirmDelete } from '../services/alerts';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';

export default function Admin() {
  const [articles, setArticles] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [query,] = useState('')

  const handleSearch = async (query) => {
    setCurrentPage(1)
    try {
      const response = await axios.get(`http://localhost:3030/menu/find-all`, {
        params: {
          query,
          page: 1
        }
      })
      setArticles(response.data.docs)
      setTotalPages(response.data.totalPages)

    } catch (err) {
      console.error(err)
    }
  }

  const handlePageChange = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3030/menu/find-all`, {
        params: {
          query,
          page
        }
      })

      setArticles(response.data.docs)
      setCurrentPage(page)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    handleSearch('')
  }, [])

  const submitDelete = async (id) => {
    confirmDelete(id, handleSearch)
  }

  return (
    <div className="container-xxl py-5" style={{ marginTop: "5%" }}>
      <div className="container">
        <div className="row align-items-center g-5">
        <h1>Liste de tous les menus</h1>

          <div className="d-flex justify-content-between">
            <Link to="/admin/add" className="btn btn-success">
              Ajouter
            </Link>
            <input name='search' defaultValue={query} onChange={(e) => handleSearch(e.target.value)} type="search" placeholder='Rechercher...'></input>

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
                {articles.map((p, i) => <tr key={i}>
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
            <div style={{ display: "flex", justifyContent:'center' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                currentPage == page
                  ? <div style={{ padding: "5px", marginRight:"5px", backgroundColor: "red", borderRadius: '5px' }}><span key={page} aria-current="page" className="page-numbers current">{currentPage}</span></div>
                  : <div style={{ padding: "5px", marginRight:"5px", backgroundColor: "red", borderRadius: '5px' }}><a href="#" className="page-numbers" key={page} onClick={() => handlePageChange(page)}>
                    {page}
                  </a></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}