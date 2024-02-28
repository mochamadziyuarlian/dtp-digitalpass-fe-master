<template>
    <ul class="navbar-nav sidebar sidebar-dark accordion" :class="isActive ? 'toggled' : ''"
        style="background-color: #FFFFFF; transition: 0.4s;" id="accordionSidebar">
        <nuxt-link class="sidebar-brand bg-white d-flex align-items-center"
            style="margin-left: 6px; height: 88px !important; border-right: 1px solid #F4F4F4;" to="/">
            <div v-if="!isActive">
                <div class="sidebar-brand-text">
                    <img class="img-fluid" src="/image/logo/logo-dsa.svg" alt="dtp-dsa-logo" />
                    <img class="sidebar-brand-icon" @click="isActive = !isActive"
                        src="/v3/Portal/assets/icon/SIDEBAR_TOGGLE.svg" style="margin-top: 3px; margin-left: 18px;">
                </div>
            </div>
            <div v-if="isActive">
                <div class="icon align-self-center ml-2" @click="isActive = !isActive">
                    <img src="/icon/sidebar/sidebar_toggle_mini.svg">
                </div>
            </div>

        </nuxt-link>

        <hr class="sidebar-divider my-0">

        <div class="parent-ul">
            <ul style="border-right: 1px solid #F4F4F4;" id="child-ul">

                <div v-for="(module, index) of menu" :key="index">
                    <div v-if="isShowMenu(module.module)">
                        <div style="padding-left: 1.25rem; color: #B1B5BA; font-size: 14px; margin-bottom: 5px; margin-top: 10px;">
                            {{ module.module }}
                        </div>

                        <li class="nav-item" v-for="(menu, index) of module.menu" :key="index" @click="ClickMenu()">
                            <nuxt-link class="nav-link" :to="menu.link">
                                <div class="row d-flex align-items-center">
                                    <div class="col-auto pr-0">
                                        <span v-html="menu.icon"></span>
                                    </div>
                                    <div class="col pl-0" style="margin-left: 0.8rem;">
                                        <p class="font-size-16 mb-0">
                                            {{ menu.title }}
                                        </p>
                                    </div>
                                </div>
                            </nuxt-link>
                        </li>
                    </div>
                </div>

            </ul>
        </div>

    </ul>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        MENU
    } from '@/static/v3/Portal/constants/menu';

    export default {
        mixins: [mixins],
        data() {
            return {
                isActive: false,
                menu: [],
                user: {}
            }
        },
        computed: {
            totalServiceSubmission() {
                return this.$store.state.totalServiceSubmission
            },
            isShowMenu() {
                return (module) => {
                    let isShow = true
                    if(this.totalServiceSubmission < 1) {
                        if(module) {
                            if(module.toLowerCase() == 'monitoring') {
                                isShow = false
                            }
                        }
                    }

                    return isShow
                }
            }
        },
        async mounted() {
            this.menu = MENU;
            this.user = this.UserLogin()
            await this.getServiceSubmission()
        },
        methods: {
            ClickMenu() {
                var selector, elems, makeActive;
                selector = '.parent-ul #child-ul .nav-item';
                elems = document.querySelectorAll(selector);
                makeActive = function () {
                    for (var i = 0; i < elems.length; i++)
                        elems[i].classList.remove('active');
                    this.classList.add('active');
                };
                for (var i = 0; i < elems.length; i++)
                    elems[i].addEventListener('mousedown', makeActive);
            },
            // get Pengajuan Layanan
            async getServiceSubmission() {
                let params = {
                    page: 1,
                    size: 10
                }
                let body = {
                    requested_by: this.user.id 
                }
                await this.Request('POST', '/api/v3/request/findByUser', params, body, 'BASIC', (res) => {
                    if(res.code == 200) {
                        this.$store.commit('setTotalServiceSubmission', res.meta.totalData)
                    } else {
                        this.$store.commit('setTotalServiceSubmission', 0)
                    }
                })
            }
        }
    }

</script>

<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }

    .sidebar-brand-text {
        letter-spacing: 5px;
    }



    /* not active */
    ul li div.collapse div.collapse-inner a.sub-menu span,
    ul li a.nav-link p {
        color: #7F8C93 !important;
        font-weight: 600;
        font-size: 16px;
    }


    /* not active */



    /* active */
    ul li.active a.nav-link {
        border-left: 2px solid #ED2B24;
    }

    ul li.active a.nav-link p {
        color: #ED2B24 !important;
    }

    ul li.active a.nav-link >>> svg {
        filter: invert(32%) sepia(73%) saturate(4229%) hue-rotate(346deg) brightness(97%) contrast(106%);
    }

    ul li div.collapse div.collapse-inner a.sub-menu.nuxt-link-active span {
        color: #ED2B24 !important;
    }

    /* active */


    /* Toggled */
    .toggled .parent-ul ul li span {
        display: none !important;
    }

    /* Toggled */


    @media (min-width: 768px) {
        .sidebar.toggled {
            overflow: visible;
            width: 84px !important;
        }
        
        .sidebar {
            width: 262px !important;
        }

        .sidebar.toggled .nav-item .nav-link {
            width: 84px !important;
        }

        .sidebar .nav-item .nav-link {
            padding-top: 15px !important;
            padding-bottom: 15px !important;
        }
    }

</style>
