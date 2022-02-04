import axios from 'axios';

export class ClientService{
    
    url = "http://localhost:9000/apiTienda/client/"
    getAll(){
        return axios.get(this.url + "listClient").then(res => res.data);
    }

    saveClient(client){
        return axios.post(this.url + "addClient", client).then(res => res.data);
    }

    deleteClient(id){
        return axios.get(this.url + "deleteClient/"+id).then(res => res.data);
    }
}