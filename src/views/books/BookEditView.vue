<template>
  <div>
    <h1>Editar libro</h1>
    {{ book }}
  </div>
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
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>
<style scoped></style>