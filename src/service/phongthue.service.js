import { http } from "./config";

export const phongthueService = {
    layphongthueVitri: (id) => http.get(`/phong-thue/lay-phong-theo-vi-tri`, {
        params: { maViTri: id }  
    }),
    layChiTietPhong: (id) => http.get(`/phong-thue/${id}`),
};
