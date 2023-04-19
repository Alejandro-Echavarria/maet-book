<template>
  <div>
    <h1>{{ book.name }}</h1>
    <p>Price: {{ book.price }}</p>
    <p>Date published: {{ book.date_published }}</p>
    <h2>Authors:</h2>
    <ul>
      <li v-for="(author, index) in book.author" :key="'author-' + index">
        {{ author.name }}
      </li>
    </ul>
    <h2>Chapters:</h2>
    <ul>
      <li v-for="(chapter, index) in book.chapters" :key="'chapters-' + index">
        {{ chapter.name }}
      </li>
    </ul>
    <router-link v-if="book.id" :to="{ name: 'booksEdit', params: { id: book.id } }">
      Editar curso
    </router-link>
  </div>
</template>

<script>
export default {

  data() {
    return {
      book: {},
    };
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
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
};
</script>

<style scoped>

</style>
