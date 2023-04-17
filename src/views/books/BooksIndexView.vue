<template>
    <h1>Listado de libros</h1>

    <ul>
        <li v-for="book in books.data" :key="book.id">
            <router-link :to="{ name: 'booksShow', params: { id: book.id } }">
                {{ book.name }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {

    data() {
        return {
            books: []
        }
    },

    created() {
        this.getBooks();
    },

    methods: {
        getBooks() {
            this.axios.get('http://books.test/api/v1/books', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 4|TQgd89SFCiw92WT9PuGPcKTsWqQAP7y6wuCez0Ia'
                }
            })
            .then(response => {
                this.books = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}
</script>

<style scoped>
    
</style>