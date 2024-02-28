<template>
    <div>
        <app-404 v-if="error.statusCode === 404"></app-404>
    </div>
</template>

<script>
    import NotFound from '@/pages/error/404.vue';

    export default {
        props: ['error'],
        layout: 'without-footer',
        components: {
            "app-404": NotFound,
        },
    }

</script>
