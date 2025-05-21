<template>
    <div>
      <p>Bem vindo!</p>
      <p>Música atual: {{ sumary?.title }}</p>
      <small>Artista: {{ sumary?.artist }}</small>
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
        async loadData(token) {
            try {
                const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json()
                this.summary = {
                    title: data.item.name,
                    artist: data.item.artists[0].name,
                }
            } catch (err) {
                console.error("Erro ao carregar dados do Spotify", err);
                localStorage.removeItem('spotify_access_token');
                this.accessToken = null;
            }
        }
    }
}
</script>