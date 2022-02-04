import axios from 'axios';

export class UserService{
    
    url = "http://localhost:9000/apiTienda/user/"
    getAll(){
        return axios.get(this.url + "listUser").then(res => res.data);
    }

    saveUsers(user){
        return axios.post(this.url + "addUser", user).then(res => res.data);
    }

    deleteUserId(id){
        return axios.get(this.url + "deleteUser/"+id).then(res => res.data);
    }
}