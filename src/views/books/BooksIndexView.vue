<template>
    <div class="container">
        <h1>Listado de libros</h1>
        <div class="card mb-4">
            <form @submit.prevent="saveBook" class="card-body">
                <div class="mb-2">
                    <label for="name">Name</label>
                    <br>
                    <input v-model="book.name" id="name" type="text" class="form-control" placeholder="Ingrese el name">
                </div>
                <template v-if="errors.name">
                    <span v-for="error, index in errors.name" :key="'error-name-' + error.id"
                        style="color: red; font-size: 14px;">
                        {{ errors.name[index] }}
                    </span>
                </template>
                <div class="mb-2">
                    <label for="price">Price</label>
                    <br>
                    <input v-model="book.price" id="price" type="number" class="form-control" placeholder="Ingrese el price">
                </div>
                <template v-if="errors.price">
                    <span v-for="error, index in errors.price" :key="'error-price-' + error.id"
                        style="color: red; font-size: 14px;">
                        {{ errors.price[index] }}
                    </span>
                </template>
                <div class="mb-2">
                    <label for="date_published">Price</label>
                    <br>
                    <input v-model="book.date_published" id="date_published" type="date" class="form-control"
                        placeholder="Ingrese la fecha de publicación">
                </div>
                <template v-if="errors.date_published">
                    <span v-for="error, index in errors.date_published" :key="'error-date_published-' + error.id"
                        style="color: red; font-size: 14px;">
                        {{ errors.date_published[index] }}
                    </span>
                </template>
                <br>
                <button type="submit" class="btn btn-primary mb-4">
                    Guardar
                </button>
            </form>
        </div>

        <div class="mb-4">
            <h2>Buscador</h2>
            <input v-model="search" type="text" placeholder="Filtrar" class="form-control">
        </div>

        <ul>
            <li v-for="book in books" :key="'book-' + book.id" class="mb-2">
                <router-link :to="{ name: 'booksShow', params: { id: book.id } }">
                    {{ book.name }}
                </router-link>
                -
                <button @click="deleteBook(book.id)" class="btn btn-danger btn-sm">
                    Eliminar
                </button>
            </li>
        </ul>
        <!-- Pagination -->
        <div class="d-flex justify-content-center">
            <nav aria-label="...">
                <ul class="pagination">
                    <li v-for="meta in pagination.links" :key="'pagination_link-' + meta.label" class="page-item"
                        :class="meta.url === null ? 'disabled' : ''">
                        <a class="page-link" @click="changePage(meta.url)" style="cursor: pointer;"
                            :class="meta.active === true ? 'active' : ''" v-html="meta.label" href="#">
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>

import usePagination from '../../composables/usePagination.js';

export default {

    setup() {
        const { pagination, setPagination, page, changePage } = usePagination();

        return {
            pagination,
            setPagination,
            page,
            changePage
        };
    },

    data() {
        return {
            books: [],
            book: {
                name: '',
                price: '',
                date_published: ''
            },
            search: '',
            errors: []
        }
    },

    created() {
        this.getBooks();
    },

    mounted() {
        // crear una versión debounced de la función getBooks con un tiempo de espera de 500ms
        this.debouncedGetBooks = this.debounce(this.getBooks, 500); 
    },

    watch: {
        page() {
            this.getBooks();
        },

        search() {
            this.debouncedGetBooks();
        }
    },

    methods: {
        getBooks() {
            // this.axios.get(`${process.env.VUE_APP_ROOT_API}/books?perPage=10&page=${this.page}&sort=-id&filter[name]=${this.search}`, {
            this.axios.get(`${process.env.VUE_APP_ROOT_API}/books`, {
                params: {
                    perPage: 10,
                    page: this.page,
                    sort: '-id',
                    'filter[name]': this.search
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.VUE_APP_TOKEN}`
                }
            })
                .then(response => {

                    let responseData = response.data;
                    this.books = responseData.data;

                    this.setPagination(responseData);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        saveBook() {
            this.axios.post(`${process.env.VUE_APP_ROOT_API}/books`, this.book, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.VUE_APP_TOKEN}`
                }
            })
                .then(() => {
                    // this.books.push(response.data.data);
                    /**
                     * Para este ejemplo vamos a llamar a la función getBooks
                     */
                    this.getBooks();
                    this.book = {
                        name: '',
                        price: '',
                        date_published: ''
                    },
                        this.errors = []
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                });
        },

        deleteBook(id) {
            this.axios.delete(`${process.env.VUE_APP_ROOT_API}/books/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.VUE_APP_TOKEN}`
                }
            })
                .then(() => {
                    // this.books = this.books.filter(book => book.id !== id);
                    /**
                     * Para este ejemplo vamos a llamar a la función getBooks
                     * De esta manera recargamos todos los registros nuevamente
                     */
                    this.getBooks();
                })
                .catch(error => {
                    console.log(error);
                });
        },

        debounce(func, wait) {
            let timeout;
            return function () {
                const context = this,
                    args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    timeout = null;
                    func.apply(context, args);
                }, wait);
            };
        }
    }
}
</script>

<style scoped></style>