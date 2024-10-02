import { http } from "./config";

export const binhluanService = {
    getBinhluantheophong: (id) => http.get(`/binh-luan/lay-binh-luan-theo-phong/${id}`),
    postBinhluan: ( tokenUser, data) => {
          const config = {
            headers: {
                'Content-Type': 'application/json-patch+json', 
                'token': tokenUser, 
                'tokenCybersoft': http.defaults.headers.tokenCybersoft 
            }
        };
        return http.post(`/binh-luan`, data, config);
    }
}