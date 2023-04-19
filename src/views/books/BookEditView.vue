<template>
  <h1>Editar libro</h1>
  {{ book }}
  <form @submit.prevent="editBook">
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
      <label for="date_published">Fecha de publicación</label>
      <br>
      <input v-model="datePublished" id="date_published" type="date">
    </div>
    <br>
    <button type="submit">
      Guardar
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      book: {}
    }
  },

  created() {
    this.getBook();
  },

  methods: {
    getBook() {
      this.axios.get(`http://books.test/api/v1/books/${this.$route.params.id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4|TQgd89SFCiw92WT9PuGPcKTsWqQAP7y6wuCez0Ia'
        }
      })
        .then(response => {
          this.book = response.data.data;
          this.book.price = parseFloat(this.book.price.replace(/[^\d/.]/g, ''));
        })
        .catch(error => {
          console.log(error);
        });
    },

    editBook() {
      this.axios.put(`http://books.test/api/v1/books/${this.$route.params.id}`, this.book, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4|TQgd89SFCiw92WT9PuGPcKTsWqQAP7y6wuCez0Ia'
        }
      })
        .then(() => {
          this.$router.push({ name: 'booksShow', params: { id: this.book.id } });
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

  computed: {
    datePublished: {
      get() {
        if (this.book && this.book.date_published) {
          const [day, month, year] = this.book.date_published.split('/');
          const dateObject = new Date(year, month - 1, day);
          return dateObject.toISOString().split('T')[0];
        } else {
          return '';
        }
      },
      set(value) {
        if (value) {
          const dateObject = new Date(value);
          const formattedDate = `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${(dateObject.getDate() + 1).toString().padStart(2, '0')}/${dateObject.getFullYear()}`;
          this.book.date_published = formattedDate;
        } else {
          this.book.date_published = '';
        }
      }
    }
  }
}
</script>
<style scoped></style>