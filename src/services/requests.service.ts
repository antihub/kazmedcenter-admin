import { instance } from './config';

export const RequestsService = {
    getAll: () => instance.get('/requests'),
    delete: (id: any) => instance.delete(`/requests/${id}`),
};