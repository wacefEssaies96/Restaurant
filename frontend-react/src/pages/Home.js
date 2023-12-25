import { useEffect, useState } from "react"
import { fetchData } from "../services/platService"
import { Form } from "react-bootstrap"

export default function Home() {
    const [platsList, setPlatsList] = useState([])
    const getList = async () => {
        setPlatsList(await fetchData("http://localhost:3030/menu/get-all"))
    }
    useEffect(() => {
        getList()
    }, [])

    return (
        <>
            <main className="main" id="top">
                <section className="py-5 overflow-hidden bg-dark" id="home">
                    <div className="container">
                        <img style={{ width: "100px" }} src="chilis.png" alt="..."></img>
                        <div className="row flex-center">
                            <div className="col-md-7 col-lg-6 py-8 text-md-end ">
                                <h1 className="display-1 fs-md-5 fs-lg-6 fs-xl-8 text-light">
                                    Chilli's Tunisie                                    </h1>
                                <h1 className="text-800 mb-5 fs-4">
                                    Découvrez les
                                    meilleures recettes
                                    syriennes
                                    <br />
                                    <a href="#testimonial" className="btn btn-danger">Voir notre menu</a>
                                </h1>
                            </div>
                            <div className="col-md-5 col-lg-6 order-3 order-md-1 mt-8 mt-md-0">
                                <a className="img-landing-banner" href="#!">
                                    <img
                                        className="img-fluid"
                                        src="assets/img/gallery/hero-header.png"
                                        alt="hero-header"
                                    />
                                </a>
                            </div>

                        </div>
                    </div>
                </section>
                <section id="testimonial">
                    <div className="container">
                        <div className="row h-100">
                            <div className="col-lg-7 mx-auto text-center mb-6">
                                <h5 style={{ color: "red" }} className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">
                                    Notre menu
                                </h5>
                            </div>
                        </div>
                        <div className="row gx-2">
                            {platsList.length > 0 && platsList.map((p, i) =>
                                <div className="col-sm-6 col-md-4 col-xl mb-5 h-100" key={i}>
                                    <div className="card card-span h-100 rounded-3">
                                        <img
                                            className="img-fluid rounded-3"
                                            src={`http://localhost:3030/${p.image}`}
                                            alt="..."
                                            style={{ width: "250px", height: '275px' }}
                                        />
                                        <div className="card-body ps-0">
                                            <h5 className="fw-bold text-1000 text-truncate mb-1" >
                                                {p.libelle}
                                            </h5>
                                            <span className="text-1000 fw-bold">{p.prix} DT</span>
                                        </div>
                                    </div>

                                </div>
                            )
                            }
                        </div>
                        <div className="col-12 d-flex justify-content-center mt-5">
                            {" "}
                            <a className="btn btn-lg btn-primary" href="#!">
                                Voir plus <i className="fas fa-chevron-right ms-2"> </i>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="card card-span mb-3 shadow-lg bg-danger">
                                    <div className="card-body py-0">
                                        <div className="row justify-content-center">
                                            <h3 style={{ padding: "20px", marginLeft: '77%', color: 'white' }}>Prendre contact</h3>
                                            <div className="col-7 p-4 p-lg-5">
                                                <div className="row">
                                                    <div className="col-7">
                                                        <Form encType="multipart/form-data">
                                                            <Form.Group className="mb-3">
                                                                <Form.Control name="name" type="text" className="form-control" placeholder="Nom et Prénom" required />
                                                                <Form.Control.Feedback type="valid">
                                                                </Form.Control.Feedback>
                                                                <Form.Control.Feedback type='invalid'>
                                                                    Veuillez entrer un nom et prénom!
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Control name="email" type="email" className="form-control" placeholder="Adresse Email" required />
                                                                <Form.Control.Feedback type="valid">
                                                                </Form.Control.Feedback>
                                                                <Form.Control.Feedback type='invalid'>
                                                                    Veuillez entrer une adresse Email
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Control name="message" as="textarea" rows={7} placeholder="Votre message ici..." required />
                                                                <Form.Control.Feedback type="valid">
                                                                </Form.Control.Feedback>
                                                                <Form.Control.Feedback type='invalid'>
                                                                    Veuillez entrer un prix pour le plat !
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                            <div style={{ display: "flex", justifyContent: 'center' }}>
                                                                <button className="btn btn-light" style={{ color: "grey" }} type="submit">
                                                                    Envoyer
                                                                </button>
                                                            </div>
                                                        </Form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <img
                                                    className="img-fluid fit-cover rounded-top rounded-md-end rounded-md-top-0"
                                                    src="https://seeklogo.com/images/C/chilis-colombia-logo-9113A14E23-seeklogo.com.png"
                                                    alt="..."
                                                    style={{ width: "500px" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >
        </>
    )
}