<template>
    <div id="authPage" class="container py-5">
        <div class="row no-gutter">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 d-none d-md-flex bg-image">
                <div class="row align-items-end">
                    <div class="col ml-2 align-self-start">
                        <nuxt-link to="/">
                            <img class="" src="https://minio.digitalpass.id/static/assets/logo/dtp-logo-red.png" alt=""
                                style="margin-top: 6%;margin-left: 3.8%;width: 30% !important;">
                        </nuxt-link>
                    </div>
                    <h6 class="text-black position-absolute" style="margin-bottom: 8%; margin-left: 9%;">Hak Cipta ©
                        {{ date }} MDD Telkom</h6>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 bg-white">
                <div class="login align-items-center">
                    <div class="row" style="top: 0 !important;">
                        <div class="col-md-12">
                            <div class="row" v-if="IsActiveTabs !== null">
                                <div class="col-md-6 px-0 cursor-pointer" @click="IsActiveTabs = 'login'">
                                    <ul class="nav">
                                        <li class="nav-item w-100 text-center py-2"
                                            :class="IsActiveTabs === 'login' ? 'border-bottom-4-red-main' : 'border-bottom'">
                                            <nuxt-link to="/login" class="nav-link active">
                                                <span class="font-size-20 font-weight-700"
                                                    :class="IsActiveTabs === 'login' ? 'text-red' : 'text-gray-light-1'">
                                                    Masuk
                                                </span>
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-6 px-0 cursor-pointer" @click="IsActiveTabs = 'register'">
                                    <ul class="nav">
                                        <li class="nav-item w-100 text-center py-2"
                                            :class="IsActiveTabs === 'register' ? 'border-bottom-4-red-main' : 'border-bottom'">
                                            <nuxt-link to="/register" class="nav-link active">
                                                <span class="font-size-20 font-weight-700"
                                                    :class="IsActiveTabs === 'register' ? 'text-red' : 'text-gray-light-1'">
                                                    Daftar
                                                </span>
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="px-5">
                                <nuxt />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: ['authenticated', 'liveChat'],
        head() {
            return {
                script: [{
                    src: '/js/LiveChat.js',
                    body: true
                }]
            }
        },
        data() {
            return {
                date: null,
                IsActiveTabs: 'login',
                currentPath: null
            }
        },
        watch: {
            'currentPath'() {
                this.checkPathURL();
            }
        },
        mounted() {
            const d = new Date();
            this.date = d.getFullYear();
            this.checkPathURL();
        },
        methods: {
            checkPathURL() {
                this.currentPath = this.$route.path;

                if (this.currentPath === '/login') {
                    this.$router.push('/login');
                    this.IsActiveTabs = 'login';
                }

                if (this.currentPath === '/login/email') {
                    this.$router.push('/login/email');
                    this.IsActiveTabs = 'login';
                }

                if (this.currentPath === '/register') {
                    this.$router.push('/register');
                    this.IsActiveTabs = 'register';
                }

                if (this.currentPath === '/change-password') {
                    this.$router.push('/change-password');
                    this.IsActiveTabs = null;
                }

                if (this.currentPath === '/lupa-password') {
                    this.$router.push('/lupa-password');
                    this.IsActiveTabs = null;
                }

            }
        }
    }

</script>

<style scoped>
    .fixed-top {
        position: fixed;
        top: 30px;
        right: 0;
        left: 30px;
        z-index: 1030;
    }

    .fixed-bottom {
        position: fixed;
        bottom: 30px;
        right: 0;
        left: 30px;
        z-index: 1030;
    }

</style>
