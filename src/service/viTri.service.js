import { http } from "./config"
export const viTriService = {
    //User
    getAllVitri: () => http.get('/vi-tri'),

    //ADMIN
    getALLViTriAdmin: () => http.get('/vi-tri'),
    addViTriAdmin: (tokenUser, data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json-patch+json', 
                'token': tokenUser, 
                'tokenCybersoft': http.defaults.headers.tokenCybersoft 
            }
        };
        return http.post(`/vi-tri`, data, config);
    },
    editViTriAdmin: ( tokenUser, id, data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json-patch+json', 
                'token': tokenUser, 
                'tokenCybersoft': http.defaults.headers.tokenCybersoft 
            }
        };
        return http.put(`/vi-tri/${id}`, data, config);
    },
    deleteViTriAdmin: (tokenUser,id) => {
        const config = {
            headers: {
                'token': tokenUser, 
                'tokenCybersoft': http.defaults.headers.tokenCybersoft 
            }
        };
        return http.delete(`/vi-tri/${id}`, config);
    },
    uploadHinhAnhViTri: (tokenUser,id, file) => {
        const formData = new FormData();
        formData.append('formFile', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', 
                'token': tokenUser, 
                'tokenCybersoft': http.defaults.headers.tokenCybersoft 
            }
        };
        return http.post(`/vi-tri//upload-hinh-vitri?maViTri=${id}`, formData, config); 
    }
}