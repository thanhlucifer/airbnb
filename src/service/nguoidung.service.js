import {http} from "./config";

export const nguoidungService = {
    //USER
    getOne: (id) => http.get(`/users/${id}`),
    editUser: (id, data) => http.put(`/users/${id}`, data),
    uploadAvatar: (tokenUser, file) => {
        const formData = new FormData();
        formData.append('formFile', file);
    
        // Thiết lập headers với tokenUser
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Đảm bảo đúng kiểu dữ liệu
                'token': tokenUser, // Sử dụng tokenUser ở đây
                'tokenCybersoft': http.defaults.headers.tokenCybersoft // Giữ lại tokenCyber
            }
        };
    
        return http.post(`/users/upload-avatar`, formData, config); // Sử dụng POST thay vì PUT
    },
    

    //ADMIN
    getAll: () => http.get('/users'),
    deleteUser: (id) => http.delete(`/users?id=${id}`),
    addUser: (data) => http.post('/users', data),
    searchUserName: (TenNguoiDung) => http.get(`/users/search/${TenNguoiDung}`),
    getOneAdmin: (id) => http.get(`/users/${id}`),
    editUserAdmin: (id, data) => http.put(`/users/${id}`, data),

}