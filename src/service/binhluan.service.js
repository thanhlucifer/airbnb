import { http } from "./config";

export const binhluanService = {
    getBinhluantheophong: (id) => http.get(`/binh-luan/lay-binh-luan-theo-phong/${id}`),
    postBinhluan: (data) => http.post(`/binh-luan`, data)
}