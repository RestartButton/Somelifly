<template>
    <div>Conectando ao Spotify...</div>
</template>
  
<script>
export default {
    async mounted() {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const codeVerifier = localStorage.getItem('spotify_code_verifier')

        if (!code) {
            console.error('Erro: parâmetros inválidos ou state corrompido.')
            return
        }

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: window.location.origin + '/spotify-callback',
                    client_id: '0069c28a70a24d3296ebc7b3c51816c4',
                    code_verifier: codeVerifier
                })
            })

            const data = await response.json()

            if (data.access_token) {
                localStorage.setItem('spotify_access_token', data.access_token)
                // Remova dados sensíveis salvos
                localStorage.removeItem('spotify_code_verifier')

                // Redireciona de volta para o dashboard
                window.location.href = '/'
            } else {
                console.error('Erro ao trocar o code pelo token', data)
            }
        } catch (e) {
            console.error('Erro na requisição do token', e)
        }
    }
}
</script>
  