<template>
    <div id="wrapper">
        <div id="content-wrapper" class="d-flex flex-column bg-white">
            <div id="content">
                <nuxt />
                <app-footer></app-footer>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/layouts/HeaderPortal.vue';
    import Footer from '@/components/layouts/Footer.vue';

    export default {
        middleware: ['isUser', 'notAuthenticated'],
        data() {
            return {};
        },
        components: {
            'app-header': Header,
            'app-footer': Footer,
        },
    };

</script>
