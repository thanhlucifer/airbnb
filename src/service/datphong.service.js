import { http } from "./config";

export const datphongService = {

    //User
    postDatphong: (data) => {
        return http.post('/dat-phong', data)
    },
    checkPhong: () => {
        return http.get('/dat-phong')
    },
    layPhongTheoNguoiDung: (id) => {
        return http.get(`/dat-phong/lay-theo-nguoi-dung/${id}`);
    },

    getAllphong: () => {
        return http.get('/phong-thue');
    },

    //ADMIN
    getAllDatPhongAdmin: () => {
        return http.get('/dat-phong');
    },
    addDatphongAdmin: (data) => {
        return http.post('/dat-phong', data);
    },
    getDatphongAdmin: (id) => {
        return http.get(`/dat-phong/${id}`);
    },
    deleteDatphongAdmin: (id) => {
        return http.delete(`/dat-phong/${id}`);
    },
    editDatphongAdmin: (id, data) => {
        return http.put(`/dat-phong/${id}`, data);
    },


 
}