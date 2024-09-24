import { http } from "./config";

export const datphongService = {
    getDatphong: () => http.get('/dat-phong'), //goi api dat phong de lay danh sach ngay gio va ma phong => check xem phong da co nguoi dat hay chua
    postDatphong: (data) => http.post('/dat-phong', data),
}