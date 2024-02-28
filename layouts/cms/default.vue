<template>
    <div id="wrapper">
        <app-sidebar></app-sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content" class="font-size-14">
                <nav class="navbar navbar-expand navbar-light bg-white topbar static-top"
                    style="padding: 40px; height: 105px; border-bottom: 1px solid #F4F4F4;">
                    <div class="dsa-breadcrumb">
                        <div v-for="(item, index) of breadcrumb" :key="index">
                            <p>
                                {{ item.title }}
                            </p>

                            <!-- For page Dashboard Only -->
                            <span v-if="item.menu.length === 0 && $route.name === 'manage-dashboard'">
                                <span class="text-dsa-secondary">
                                    Hallo {{ User.name }}, Selamat Datang
                                </span>
                            </span>
                            <!-- For page Dashboard Only -->

                            <span v-if="item.menu.length !== 0">
                                <nuxt-link to="/manage/dashboard">
                                    <span class="text-dsa-danger">
                                        Dashboard
                                    </span>
                                </nuxt-link>
                                <span>/</span>
                            </span>
                            <span v-for="(menu, index) of item.menu" :key="'menu' + index">
                                <nuxt-link :to="menu.menuURL" v-if="menu.menuIsRedirect">
                                    <span :class="'text-dsa-' + menu.menuIsTextColor">
                                        {{ menu.menuTitle }}
                                    </span>
                                    <span v-if="index != Object.keys(item.menu).length - 1">/</span>
                                </nuxt-link>
                                <span v-if="!menu.menuIsRedirect">
                                    <span :class="'text-dsa-' + menu.menuIsTextColor">
                                        {{ menu.menuTitle }}
                                    </span>
                                    <span v-if="index != Object.keys(item.menu).length - 1">/</span>
                                </span>
                            </span>
                        </div>
                    </div>

                    <app-header></app-header>
                </nav>
                <nuxt id="admin-section" style="margin: 40px;" />
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/layouts/HeaderCMS.vue';
    import Sidebar from '@/components/layouts/SidebarCMS.vue';

    import mixins from '@/plugins/mixins.js';

    export default {
        middleware: ['isAdmin', 'notAuthenticated'],
        mixins: [mixins],
        data() {
            return {
                User: {},
                headingBreadcrumb: null
            }
        },
        components: {
            'app-header': Header,
            'app-sidebar': Sidebar,
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
