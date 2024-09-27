import { http } from "./config";

export const datphongService = {
    postDatphong: (data) => {
        return http.post('/dat-phong', data)
    },
    checkPhong: () => {
        return http.get('/dat-phong')
    }
}