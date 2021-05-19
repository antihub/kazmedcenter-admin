import { instance } from './config';

export const CourseService = {
    post: (course: any) => instance.post('/courses', { course }),
    getAll: () => instance.get('/courses'),
    delete: (id: any) => instance.delete(`/courses/${id}`),
};