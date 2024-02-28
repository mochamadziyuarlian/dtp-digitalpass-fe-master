<template>
    <div id="wrapper" class="v3">
        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column bg-white">
            <div id="content" class="font-size-14">
                <nav class="navbar navbar-expand navbar-light bg-white topbar static-top"
                    style="padding: 0 40px; height: 80px; border-bottom: 1px solid #F4F4F4;">
                    <div class="dsa-breadcrumb">
                        <div v-for="(item, index) of breadcrumb" :key="index">

                            <div class="row">
                                <div class="col-auto d-flex align-items-center">
                                    <span class="title" :class="item.menu.length > 0 ? 'has-sub-menu' : ''"
                                        v-show="item.titleURL === null">
                                        {{ item.title }}
                                    </span>
                                    <nuxt-link :to="`${item.titleURL}`" v-show="item.titleURL !== null">
                                        <span class="title" :class="item.menu.length > 0 ? 'has-sub-menu' : ''">
                                            {{ item.title }}
                                        </span>
                                    </nuxt-link>
                                </div>
                                <div class="col-auto" v-for="(item, index) of item.menu" :key="index">
                                    <div class="row">
                                        <div class="col-auto d-flex align-items-center px-0">
                                            <img src="/v3/Portal/assets/icon/ARROW_BREADCRUMB.svg">
                                        </div>
                                        <div class="col-auto d-flex align-items-center">
                                            <span class="sub-title"
                                                :class="item.menuURL !== null ? 'has-sub-menu' : ''"
                                                v-show="item.menuURL === null">
                                                {{ item.menuTitle }}
                                            </span>
                                            <nuxt-link :to="`${item.menuURL}`" v-show="item.menuURL !== null">
                                                <span class="sub-title"
                                                    :class="item.menuURL !== null ? 'has-sub-menu' : ''">
                                                    {{ item.menuTitle }}
                                                </span>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Header></Header>
                </nav>
                <nuxt id="admin-section" />
            </div>
        </div>
    </div>
</template>

<script type='text/javascript' src='https://service.force.com/embeddedservice/5.0/esw.min.js'></script>

<script>
    import Header from '@/components/v3/Portal/layouts/Header.vue';
    import Sidebar from '@/components/v3/Portal/layouts/Sidebar.vue';

    import mixins from '@/plugins/mixins.js';

    export default {
        middleware: ['isUser', 'notAuthenticated', 'liveChat'],
        mixins: [mixins],
        head() {
            return {
                script: [{
                    src: '/js/LiveChat.js',
                    body: true
                }, ],
            }
        },
        data() {
            return {
                User: {},
                headingBreadcrumb: null
            }
        },
        components: {
            'Header': Header,
            'Sidebar': Sidebar,
        },
        filters: {
            StringReplace(value) {
                if (value) {
                    return value.replace('-', ' ');
                };
            }
        },
        computed: {
            breadcrumb() {
                return this.$store.state.breadcrumb;
            }
        },
        mounted() {
            this.User = this.UserLogin();
        }
    }

</script>

<style scoped>
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
    
    .v3 .dsa-breadcrumb .title,
    .v3 .dsa-breadcrumb .sub-title {
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 24px;
        color: #2E3032;
    }

    .v3 .dsa-breadcrumb .title.has-sub-menu,
    .v3 .dsa-breadcrumb .sub-title.has-sub-menu {
        font-family: 'Poppins';
        font-weight: 400;
        font-size: 24px;
        color: #8C8F93;

        cursor: pointer;
    }

</style>
