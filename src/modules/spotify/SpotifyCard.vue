<template>
  <div class="card">
    <h3>Spotify</h3>
    
    <div v-if="!accessToken">
      <p>Para ver seu resumo, conecte com o Spotify.</p>
      <button @click="authorize">Conectar com Spotify</button>
    </div>
    
    <div v-else>
      <p>Bem vindo!</p>
      <p>Música atual: {{ sumary?.title }}</p>
      <small>Artista: {{ sumary?.artist }}</small>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accessToken: null,
      summary: null
    }
  },
  mounted() {
    const token = localStorage.getItem('spotify_access_token');
    if (token) {
      this.accessToken = token;
      this.loadData(token);
    }
  },
  methods: {
    authorize() {

    },

    async loadData
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #1db954;
  color: white;
  border: none;
  cursor: pointer;
}
</style>