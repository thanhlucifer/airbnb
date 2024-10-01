import {http} from "./config";

export const nguoidungService = {
    //USER
    getOne: (id) => http.get(`/users/${id}`),
    editUser: (id, data) => http.put(`/users/${id}`, data),

    //ADMIN
    getAll: () => http.get('/users'),
    deleteUser: (id) => http.delete(`/users?id=${id}`),
    addUser: (data) => http.post('/users', data),
    searchUserName: (TenNguoiDung) => http.get(`/users/search/${TenNguoiDung}`),
    getOneAdmin: (id) => http.get(`/users/${id}`),
    editUserAdmin: (id, data) => http.put(`/users/${id}`, data),

}