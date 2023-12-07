import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:5000/' });
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('data');
    if (token) {
        req.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
    }
    return req;
});


// Authentification
export const signin = (formData) => API.post('/auth/signin',formData);
export const signup = (formData) => API.post('/auth/signup',formData);


// Users
export const getCurrentUser = (id) => API.get(`/users/current/${id}`);
export const patchCurrentUser = (id, formData) => API.patch(`/users/current/${id}`,formData);
export const getStudents = () => API.get('/users/students');
export const getProfessors = () => API.get('/users/professors');
export const deleteUser = (id) => API.post(`/users/delete/${id}`);


//Courses
export const getCourses = () => API.get('/courses/');
export const getMyCourses = (id) => API.get(`/courses/owner/${id}`);
export const getCourse = (id) => API.get(`/courses/${id}`);
export const getCategories = () => API.get('/courses/categories/all');
export const addCourse = (data) => API.post('/courses/add/new', data);
export const deleteCourse = (id) => API.post(`/courses/delete/${id}`);