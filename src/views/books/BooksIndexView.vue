<template>
  <h1>Listado de libros</h1>
  <form @submit.prevent="saveBook">
    <div class="mb-2">
      <label for="name">Name</label>
      <br>
      <input v-model="book.name" id="name" type="text" placeholder="Ingrese el name">
    </div>
    <template v-if="errors.name">
      <span v-for="error, index in errors.name" :key="'error-name-' + error.id" style="color: red; font-size: 14px;">
        {{ errors.name[index] }}
      </span>
    </template>
    <div class="mb-2">
      <label for="price">Price</label>
      <br>
      <input v-model="book.price" id="price" type="number" placeholder="Ingrese el price">
    </div>
    <template v-if="errors.price">
      <span v-for="error, index in errors.price" :key="'error-price-' + error.id" style="color: red; font-size: 14px;">
        {{ errors.price[index] }}
      </span>
    </template>
    <div class="mb-2">
      <label for="date_published">Price</label>
      <br>
      <input v-model="book.date_published" id="date_published" type="date" placeholder="Ingrese la fecha de publicación">
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
  {{ book }}
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
        <li 
          v-for="meta in pagination_meta.links" 
          :key="'pagination_link-' + meta.label"
          class="page-item"
          :class="meta.url === null ? 'disabled' : ''">
          <a 
            class="page-link"
            @click="changePage(meta.url)"
            style="cursor: pointer;"
            :class="meta.active === true ? 'active' : ''"
            v-html="meta.label"
            href="#"
          >
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {

  data() {
    return {
      books: [],
      book: {
        name: '',
        price: '',
        date_published: ''
      },
      pagination_links: [],
      pagination_meta: [],
      errors: []
    }
  },

  created() {
    this.getBooks();
  },

  computed: {
    page() {
      return this.$route.query.page ?? 1;
    }
  },

  watch: {
    page() {
      this.getBooks();
    }
  },

  methods: {
    getBooks() {
      this.axios.get(`http://books.test/api/v1/books?perPage=10&page=${this.page}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4|TQgd89SFCiw92WT9PuGPcKTsWqQAP7y6wuCez0Ia'
        }
      })
        .then(response => {

          let responseData = response.data;
          this.books = responseData.data;
          this.pagination_links = responseData.links;
          this.pagination_meta = responseData.meta;
        })
        .catch(error => {
          console.log(error);
        });
    },

    saveBook() {
      this.axios.post('http://books.test/api/v1/books', this.book, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4|TQgd89SFCiw92WT9PuGPcKTsWqQAP7y6wuCez0Ia'
        }
      })
        .then(response => {
          this.books.push(response.data.data);
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
      this.axios.delete(`http://books.test/api/v1/books/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4|TQgd89SFCiw92WT9PuGPcKTsWqQAP7y6wuCez0Ia'
        }
      })
        .then(() => {
          this.books = this.books.filter(book => book.id !== id);
        })
        .catch(error => {
          console.log(error);
        });
    },

    changePage(url) {
      /**
       * Obtenemos el valor del query page
       * Luego lo modificamos la URL
       */
      this.$router.replace({ 
        query: {
           page: url.split('page=')[1]
          } 
      });
    }
  }
}
</script>

<style scoped></style>