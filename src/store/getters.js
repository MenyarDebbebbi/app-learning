export default {
    getUser(state) {
        return state.user;
    },

    getStudents(state) {
        return state.studentList;
    },

    getProfessors(state) {
        return state.professorList;
    },

    getUserType(state) {
        return state.userType;
    },

    getCategories(state) {
        return state.categories;
    }
};