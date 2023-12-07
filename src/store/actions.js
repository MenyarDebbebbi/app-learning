import {
    getCurrentUser,
    patchCurrentUser,
    getStudentsList,
    getPorfessorsList,
    deleteUser
} from "@/actions/user";
import { getCategories , addCourse, getCourses, getCourse , getMyCourses , deleteCourse} from "@/actions/course";


export default {
    async fetchUser({ dispatch, state, commit }) {
        await dispatch('fetchUserId');
        const user = await getCurrentUser(state.userId);
        
        commit('setUser', user);
    },

    async getUser({commit},id) {
        const user = await getCurrentUser(id);
        
       return user;
    },

    async patchUser({  state, dispatch }, formData) {
        await patchCurrentUser(state.userId, formData);
        
        dispatch('fetchUser')
    },

    async fetchUserId({ commit }) {
        const item = await JSON.parse(localStorage.getItem('smartData'));
        const id = item.data.result.data.id;
        
        commit('setUserId', id);
    },

    async fetchStudentList({ commit }) {
        const students = await getStudentsList();

        commit('setStudents', students);
    },

    async fetchProfessorList({ commit }) {
        const professors = await getPorfessorsList();

        commit('setProfessors', professors);
    },

    async deleteUser( { commit },userId ) {
         await deleteUser(userId);
    },

    async deleteCourse( { dispatch, commit },courseId ) {
        await deleteCourse(courseId);

        dispatch('getMyCourses');
   },

    async getUserType({ state, commit }) {
        const userType = await state.user?.user_type;

        commit('setUserType', userType);
   },

   async fetchCategories({ commit }) {
    const categories = await getCategories();

    commit('setCategories', categories);
   },

   async addCourse({commit},data) {
    await addCourse(data);
   },

   async getCourses({ commit }) {
   const data = await getCourses();

   commit('setCourses', data)
   return data;
   },

   async getMyCourses({ state , commit }) {
    const data = await getMyCourses(state.userId);
 
    commit('setMyCourses', data)
    },

   async getCourse({ commit }, id) {
    const data = await getCourse(id);
 
    commit('setCourse', data)
    },
};