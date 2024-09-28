import {http} from "./config";

export const nguoidungService = {
    getOne: (id) => http.get(`/users/${id}`),
    editUser: (id, data) => http.put(`/users/${id}`, data),

}