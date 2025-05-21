<template>
    <div class="card">
        <h3>{{ cardInterface.title }}</h3>
        
        <div>
            <component :is="cardInterface.body" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['cardInterface']
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
}
</style>