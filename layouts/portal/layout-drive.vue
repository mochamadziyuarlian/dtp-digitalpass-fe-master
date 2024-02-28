<template>
    <div id="wrapper">
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <app-header></app-header>
            </div>
            <nuxt />
        </div>
    </div>
</template>
<script>
    import Header from '@/components/layouts/HeaderPortal.vue';

    export default {
        middleware: ['isUser'],
        data() {
            return {};
        },
        components: {
            'app-header': Header,
        },
    };

</script>
