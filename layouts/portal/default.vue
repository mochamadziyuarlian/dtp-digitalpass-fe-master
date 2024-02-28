<template>
    <div id="wrapper">
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <app-header class="bg-white" id="Header_Portal" style="padding-bottom: 70px;"></app-header>
            </div>
            <nuxt id="portal-section" />
            <app-footer></app-footer>
        </div>
    </div>
</template>


<style>
    .embeddedServiceHelpButton .helpButton .uiButton {
        background-color: #DD1B14 !important;
        font-family: "Nunito", sans-serif !important;
    }

    .embeddedServiceHelpButton .helpButton .uiButton:focus {
        outline: 1px solid #DD1B14 !important;
    }

    .dockableContainer embeddedservice-chat-header header.sidebarHeader {
        background-color: #ed2b24 !important;
    }

    .buttonWrapper.embeddedServiceSidebarForm button.embeddedServiceSidebarButton {
        background-color: #ed2b24 !important;
    }

</style>

<script type='text/javascript' src='https://service.force.com/embeddedservice/5.0/esw.min.js'></script>

<script>
    import Header from '@/components/layouts/HeaderPortal.vue';
    import Footer from '@/components/layouts/FooterPortal.vue';

    export default {
        middleware: ['isUser', 'notAuthenticated', 'liveChat'],
        head() {
            return {
                script: [
                    { src: '/js/LiveChat.js', body: true },
                ],
            }
        },
        data() {
            return {};
        },
        components: {
            'app-header': Header,
            'app-footer': Footer,
        },
    };

</script>
