import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import SpotifyCallback from '@/views/SpotifyCallback.vue'

const routes = [
    { path: '/', component: Dashboard },
    { path: '/spotify-callback', component: SpotifyCallback }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
