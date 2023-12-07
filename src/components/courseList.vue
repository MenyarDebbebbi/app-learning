<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div
    class="pa-16 d-flex flex-column align-items-center"
    >
       <span class="text-semibold mb-10">Courses management</span>

       <div class="d-flex filter-container">
        <div class="d-flex w-50 mr-5">
            <v-text-field v-model="filters.id" label="ID" variant="outlined" class="mr-5" />
            <v-text-field v-model="filters.name" label="Name" variant="outlined" class="mr-5" />
            <v-text-field v-model="filters.owner" label="Owner" variant="outlined" class="mr-5" />

            <v-select
            v-model="filters.category"
            class="mr-5"
            label="Category"
            variant="outlined"
            clearable
            :items="categoryItems"
            item-title="name"
            item-value="value"
            />

            <v-btn size="x-large" color="#575757" @click="applyFilters">
                <template #default>
                    <v-icon>
                        mdi-magnify
                    </v-icon>
                    </template>
            </v-btn>
        </div>

       </div>

       <div class="mt-10">
        <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="courses"
        item-value="id"
        class="elevation-1 student-table rounded"
        >
        <template v-slot:item.actions="{ item }">
            <v-icon class="mr-5" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        </v-data-table>
       </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'courseList',
    data () {
    return {
        categoryItems: [
            {
                name: 'Languages',
                value: 'lang'
            },
            {
                name: 'Frontend Development',
                value: 'fe'
            },
            {
                name: 'Backend Development',
                value: 'be'
            },
            {
                name: 'Digital Marketing',
                value: 'dm'
            },
        ],
        filters: {
            id: '',
            name: '',
            category:''
        },
        itemsPerPage: 10,
        headers: [
          { title: 'ID',align: 'start',sortable: false,key: 'c_id',},
          { title: 'Name', align: 'end', key: 'name' },
          { title: 'Description', align: 'start', key: 'description'},
          { title: 'Price', align: 'end', key: 'price'},
          { title: 'Creation date', align: 'end', key: 'created_at'},
          { title: 'Owner', align: 'start', key: 'owner'},
          { title: 'Category', align: 'start', key: 'category'},
          { title: '', align: 'end',sortable: false, key: 'actions'},
        ],
        courses: []
    }
},
    methods:{
        ...mapActions(['getCourses']),
        applyFilters() {
            if(this.filters.id || this.filters.name) {
                alert(`${this.filters.id} ${this.filters.name}`);
            }
        }
    },
    async created() {
        this.courses = await this.getCourses();
    }
}
</script>

<style>
.filter-container {
    justify-content: space-between;
}
.grey-header {
   background-color: black !important;
}
</style>