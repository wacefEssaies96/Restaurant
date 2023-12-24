import axios from "axios"

export const deletePlat = async (id) => {
    const res = await fetch(`http://localhost:3030/menu/delete/${id}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    return data
}

export const fetchData = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export const submitMenuForm = async (data, operationMode) => {
    const formData = new FormData()
    formData.append('libelle', data.target.libelle.value)
    formData.append('image', data.target.image.files[0])
    formData.append('prix', data.target.prix.value)
    operationMode === 'Ajouter'
        ? await axios.post(`http://localhost:3030/menu/add`, formData)
        : await axios.put(`http://localhost:3030/menu/update/${data.target.id.value}`, formData)
}