<template>
    <div class="dashboard">
        <Card
            v-for="m in modules"
            :key="m.id"
            :cardInterface="m"
        />
    </div>
</template>

<script>
import Card from "@/components/Card.vue"

export default {
    components: { Card },
    data() {
        return {
            modules: []
        }
    },
    async mounted() {
        const rawModules = import.meta.glob('@/modules/*/index.js');

        for (const path in rawModules) {
            const mod = await rawModules[path]();
            if (mod.createModule) {
                this.modules.push(mod.createModule());
            }
        }
    }
}
</script>
