<template>
    <div id="wrapper" class="parent-ul">
        <ul class="navbar-nav bg-white sidebar sidebar-dark accordion border-right" id="child-ul">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div class="sidebar-brand-icon rotate-n-15">
                    <em class="fas fa-laugh-wink"></em>
                </div>
                <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>
            <!-- <li class="nav-item nav-li" v-for="(item, index) of sidebar" :key="index" @click="click()"
                :id="'menu' + index">
                <nuxt-link :to="item.link" class="nav-link">
                    <em :class="item.icon"></em>
                    <span class="ml-2">{{ item.title }}</span>
                </nuxt-link>
            </li> -->
            <li class="nav-item nav-li" @click="click()" id="menu0">
                <nuxt-link to="/profile/data-pengajuan" class="nav-link">
                    <em class="fa fa-file-alt"></em>
                    <span class="ml-2">Pengajuan Layanan</span>
                </nuxt-link>
            </li>
            <li class="nav-item nav-li" @click="click()" id="menu4">
                <nuxt-link to="/profile/drive-dokumen" class="nav-link">
                    <em class="fa fa-clipboard"></em>
                    <span class="ml-2">Drive Dokumen</span>
                </nuxt-link>
            </li>
            <li class="nav-item nav-li" @click="click()" id="menu1">
                <nuxt-link to="/profile/service-operation" class="nav-link" v-if="hasAccess">
                    <em class="fa fa-chart-bar"></em>
                    <span class="ml-2">Service Operation</span>
                </nuxt-link>
            </li>
            <li class="nav-item nav-li" @click="click()" id="menu2">
                <nuxt-link to="/profile" class="nav-link">
                    <em class="fa fa-address-card"></em>
                    <span class="ml-2">Profile Saya</span>
                </nuxt-link>
            </li>
            <li class="nav-item nav-li" @click="click()" id="menu3">
                <nuxt-link to="/profile/ubah-kata-sandi" class="nav-link">
                    <em class="fa fa-lock"></em>
                    <span class="ml-2">Ubah Kata Sandi</span>
                </nuxt-link>
            </li>
        </ul>
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <app-header style="padding-bottom: 70px;"></app-header>
                <div style="padding: 40px;">
                    <nuxt />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import mixins from '@/plugins/mixins.js';
    import Header from '@/components/layouts/HeaderPortal.vue';
    import {
        PROFILE
    } from '@/config/menu/portal.js';

    export default {
        middleware: ['isUser', 'notAuthenticated'],
        mixins: [mixins],
        data() {
            return {
                sidebar: PROFILE,
                User: {},
                hasAccess: false
            };
        },
        components: {
            'app-header': Header,
        },
        mounted() {
            this.User = this.UserLogin();
            this.HelperCheckHasAccessServiceOperation(this.User.email, (callback) => {
                this.hasAccess = callback.isAccess;
            });
            switch (window.location.pathname) {
                case '/profile/data-pengajuan':
                    $('#menu0').addClass('active');
                    break;
                case '/profile/service-operation':
                    $('#menu1').addClass('active');
                    break;
                case '/profile':
                    $('#menu2').addClass('active');
                    break;
                case '/profile/ubah-kata-sandi':
                    $('#menu3').addClass('active');
                    break;
            }
            this.click();
        },
        methods: {
            click() {
                var selector, elems, makeActive;
                selector = '.parent-ul #child-ul .nav-li';
                elems = document.querySelectorAll(selector);
                makeActive = function () {
                    for (var i = 0; i < elems.length; i++)
                        elems[i].classList.remove('active');
                    this.classList.add('active');
                };
                for (var i = 0; i < elems.length; i++)
                    elems[i].addEventListener('mousedown', makeActive);
            }
        }
    };

</script>

<style scoped>
    #wrapper ul li a,
    #wrapper ul li em {
        color: #C2D1D9 !important;
    }

    #wrapper ul li.active {
        background: #FFF0EF;
        border-left: 3px solid #ED2B24;
    }

    #wrapper ul li {
        border-left: 3px solid transparent;
    }

    #wrapper ul li.active a,
    #wrapper ul li.active em {
        color: #ED2B24 !important;
    }

    #wrapper .border-right {
        border-right: 2px solid #e3e6f0 !important;
    }

    .sidebar {
        width: 16rem !important;
    }

</style>
