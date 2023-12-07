export default {
    setUser(state, user) {
        state.user = user;
    },

    setUserId(state, userId) {
        state.userId = userId;
    },

    setStudents(state, students) {
        state.studentList = students;
    },

    setProfessors(state, professors) {
        state.professorList = professors;
    },

    setUserType(state, userType) {
        state.userType = userType;
    },

    setCategories(state, categories) {
        state.categories = categories;
    },

    setCourses(state, courses) {
        state.courses = courses;
    },

    setCourse(state, course) {
        state.course = course;
    },

    setMyCourses(state, courses) {
        state.myCourses = courses;
    }
};