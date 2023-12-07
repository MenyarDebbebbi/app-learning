import * as api from '@/api';

export const getCurrentUser = async (id) => {
    const data = await api.getCurrentUser(id);

    return data.data.data[0];
};

export const patchCurrentUser = async (id, formData) => {
    const data = await api.patchCurrentUser(id, formData);

    return data;
};

export const getStudentsList = async () => {
    const item = await api.getStudents();

    return item;
};

export const getPorfessorsList = async () => {
    const item = await api.getProfessors();

    return item;
};


export const deleteUser = async (Id) => {
    await api.deleteUser(Id);
};