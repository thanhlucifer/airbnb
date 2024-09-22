import { http } from "./config"
export const viTriService = {
    getAllVitri: () => http.get('/vi-tri'),

}