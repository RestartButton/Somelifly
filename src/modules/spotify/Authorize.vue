<template>
    <div>
      <p>Para ver seu resumo, conecte com o Spotify.</p>
      <button @click="authorize">Conectar com Spotify</button>
    </div>
</template>

<script>
export default {
    methods: {
        async authorize() {
            const clientId = '0069c28a70a24d3296ebc7b3c51816c4'
            const codeVerifier = this.generateRandomString(64);
            const hashed = await this.sha256(codeVerifier);
            const codeChallenge = this.base64encode(hashed);
            const scope = 'user-read-private user-read-email user-read-currently-playing';

            localStorage.setItem('spotify_code_verifier', codeVerifier)

            const authUrl = new URL("https://accounts.spotify.com/authorize")

            const params =  {
                response_type: 'code',
                client_id: clientId,
                scope,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge,
                redirect_uri: window.location.origin + '/spotify-callback',
            }

            authUrl.search = new URLSearchParams(params).toString();
            window.location.href = authUrl.toString();
        },
        generateRandomString(length) {
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const values = crypto.getRandomValues(new Uint8Array(length));
            return values.reduce((acc, x) => acc + possible[x % possible.length], "");
        },
        async sha256(plain) {
            const encoder = new TextEncoder()
            const data = encoder.encode(plain)
            return window.crypto.subtle.digest('SHA-256', data)
        },
        base64encode(input) {
            return btoa(String.fromCharCode(...new Uint8Array(input)))
                .replace(/=/g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        }
    }
}
</script>

<style scoped>
button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #1db954;
  color: white;
  border: none;
  cursor: pointer;
}
</style>