<template>
  <h1>Listado de libros</h1>
  <form @submit.prevent="saveBook">
    <div>
      <label for="name">Name</label>
      <br>
      <input v-model="book.name" id="name" type="text" placeholder="Ingrese el name">
    </div>
    <br>
    <div>
      <label for="price">Price</label>
      <br>
      <input v-model="book.price" id="price" type="number" placeholder="Ingrese el price">
    </div>
    <br>
    <div>
      <label for="date_published">Price</label>
      <br>
      <input v-model="book.date_published" id="date_published" type="date" placeholder="Ingrese la fecha de publicación">
    </div>
    <br>
    <button type="submit">
      Guardar
    </button>
  </form>
  {{ book }}
  <ul>
    <li v-for="book in books" :key="'book-' + book.id">
      <router-link :to="{ name: 'booksShow', params: { id: book.id } }">
        {{ book.name }}
      </router-link>
      -
      <button @click="deleteBook(book.id)">
        Eliminar
      </button>
    </li>
  </ul>
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
      }
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
        this.books = response.data.data;
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
        }
      })
      .catch(error => {
        console.log(error);
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
    }
  }
}
</script>

<style scoped></style>