<script setup lang="ts">
import Card from '@/shared/components/Card.vue';
const props = defineProps({
  name: String,
  img_url: String
});

</script>

<template>
    <Card>
        <img class="image" :src="img_url"/>
        <h2>{{ name }}</h2>
    </Card>
</template>

<style scoped>

.image {
    width: 120px;
    height: 120px;
}

.h3 {
    font-size: 20px;
}

</style>