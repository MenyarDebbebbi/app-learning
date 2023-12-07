import * as api from '@/api';

export const getCategories = async () => {
    const item = await api.getCategories();

    return item.data.data;
};

export const getCourses = async () => {
    const item = await api.getCourses();
    
    return item.data.data;
};

export const deleteCourse = async (courseId) => {
    await api.deleteCourse(courseId);
};

export const getMyCourses = async (id) => {
    const item = await api.getMyCourses(id);
    
    return item.data.data;
};

export const getCourse = async (id) => {
    const item = await api.getCourse(id);

    return item.data.data[0];
};

export const addCourse = async (data) => {
    await api.addCourse(data);
};