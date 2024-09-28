import { http } from "./config";

export const datphongService = {
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
 
}