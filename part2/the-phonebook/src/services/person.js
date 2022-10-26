import axios from "axios";

const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const deletecontact = objectId => {
    const request = axios.delete(`${baseUrl}/${objectId}`);
    return request.then(response => console.log(response));
}

export default { getAll, create, deletecontact }