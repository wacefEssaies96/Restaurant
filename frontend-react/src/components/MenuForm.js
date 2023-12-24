import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { fetchData, submitMenuForm } from "../services/platService";
import { Form } from 'react-bootstrap';


export default function MenuForm({ operationMode }) {

    const [validated, setValidated] = useState(false)
    const [imageSrc, setImageSrc] = useState('')
    const [newMenu, setNewMenu] = useState({
        libelle: '',
        image: '',
        prix: ''
    })
    const navigate = useNavigate();
    const params = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)
        if (form.checkValidity() === true) {
            await submitMenuForm(e, operationMode)
            navigate('/admin', { replace: true });
        }
    }

    const handleImageChange = (event) => {
        if (event.target.files[0])
            setImageSrc(URL.createObjectURL(event.target.files[0]))
        else
            setImageSrc('')
    }

    const getMenuById = async () => {
        const data = await fetchData('http://localhost:3030/menu/find/' + params.id)
        setNewMenu(data)
        setImageSrc(data.image)
    }
    useEffect(() => {
        if (operationMode === 'Modifier')
            getMenuById()
    }, []);

    return (
        <div className="container-xxl p-0">
            <div className="container-xxl">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <h1>{operationMode} un menu</h1>
                            <Form encType="multipart/form-data" noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Control defaultValue={params.id} name="id" type="hidden" className="form-control" id="id" />
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="nom">Libelle</Form.Label>
                                    <Form.Control defaultValue={newMenu.libelle} name="libelle" type="text" className="form-control" id="libelle" placeholder="libelle" required />
                                    <Form.Control.Feedback type="valid">
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>
                                        Veuillez entrer un nom pour le plat !
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="image">Image</Form.Label>
                                    {operationMode === 'Modifier'
                                        ? <Form.Control defaultValue={newMenu.image} name="image" type="file" className="form-control" id="image" placeholder="image" onChange={handleImageChange} />
                                        : <Form.Control defaultValue={newMenu.image} name="image" type="file" className="form-control" id="image" placeholder="image" required onChange={handleImageChange} />

                                    }
                                    <Form.Control.Feedback type="valid">
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>
                                        Veuillez entrer une image pour le plat !
                                    </Form.Control.Feedback>
                                    {imageSrc !== '' && <>
                                        <img style={{ width: '250px' }} src={`http://localhost:3030/${imageSrc}`} alt="picture"></img>
                                    </>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="prix">Prix</Form.Label>
                                    <Form.Control value={newMenu.prix} name="prix" type="number" className="form-control" id="prix" placeholder="prix" required />
                                    <Form.Control.Feedback type="valid">
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>
                                        Veuillez entrer un prix pour le plat !
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div style={{ display: "flex", justifyContent: 'center' }}>
                                    <button className="btn btn-success" type="submit">
                                        {operationMode}
                                    </button>
                                    <div style={{ marginLeft: '20px' }}></div>
                                    <Link to="/admin" className="btn btn-warning" type="submit">
                                        Cancel
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}