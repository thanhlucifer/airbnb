import { http } from "./config";

export const phongthueService = {
    //User
    layphongthueVitri: (id) => http.get(`/phong-thue/lay-phong-theo-vi-tri`, {
        params: { maViTri: id }  
    }),
    layChiTietPhong: (id) => http.get(`/phong-thue/${id}`),

    //ADMIN
    getAllphongthue: () => http.get(`/phong-thue`),
    getPhongthue: (id) => http.get(`/phong-thue/${id}`),
    addPhongthue: (tokenUser,data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json-patch+json', 
                'token': tokenUser, 
                'tokenCybersoft': http.defaults.headers.tokenCybersoft 
            }
        };
        return http.post(`/phong-thue`, data, config);
    },
    deletePhongthue: (tokenUser,id) => {
        const config = {
            headers: {
                'token': tokenUser, 
                'tokenCybersoft': http.defaults.headers.tokenCybersoft 
            }
        };
        return http.delete(`/phong-thue/${id}`, config);
    },
    editPhongthue: ( tokenUser, id, data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json-patch+json', 
                'token': tokenUser, 
                'tokenCybersoft': http.defaults.headers.tokenCybersoft 
            }
        };
        return http.put(`/phong-thue/${id}`, data, config);
    },
    uploadHinhPhong: (tokenUser,id, file) => {
        const formData = new FormData();
        formData.append('formFile', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', 
                'token': tokenUser, 
                'tokenCybersoft': http.defaults.headers.tokenCybersoft 
            }
        };
        return http.post(`/phong-thue/upload-hinh-phong?maPhong=${id}`, formData, config); 
    }

};
