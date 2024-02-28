<template>
    <div id="wrapper">
        <div class="parent-ul d-none d-sm-block">
            <ul class="navbar-nav sidebar sidebar-light accordion sidebar-minimize" id="accordionSidebar"
                style="height: 100%; transition: 0.4s; border: 1px solid #F4F4F4;">
                <a href="javascript:void(0);"
                    class="sidebar-brand d-flex align-items-center justify-content-center mt-2">
                    <div class="sidebar-brand-icon" @click="ToggleSidebar(true)">
                        <img src="/icon/sidebar/sidebar_toggle_mini.svg">
                    </div>
                    <div class="sidebar-brand-text">
                        <div class="d-flex">
                            <div @click="clickLogo()">
                                <img class="logo" src="/img/logo.svg">
                            </div>
                            <div class="icon align-self-center ml-2" @click="ToggleSidebar(false)">
                                <img src="/icon/sidebar/sidebar_toggle_arrow.svg">
                            </div>
                        </div>
                    </div>
                </a>
                <div class="mt-5"></div>
                <li class="nav-item" @click="click()" id="menu0">
                    <nuxt-link class="nav-link" to="/">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2.22656C6.486 2.22656 2 6.70928 2 12.2192V16.3592C2 17.3825 2.897 18.2149 4 18.2149H5C5.26522 18.2149 5.51957 18.1096 5.70711 17.9222C5.89464 17.7348 6 17.4806 6 17.2156V12.0764C6 11.8113 5.89464 11.5572 5.70711 11.3698C5.51957 11.1824 5.26522 11.0771 5 11.0771H4.092C4.648 7.20991 7.978 4.2251 12 4.2251C16.022 4.2251 19.352 7.20992 19.908 11.0771H19C18.7348 11.0771 18.4804 11.1824 18.2929 11.3698C18.1054 11.5572 18 11.8113 18 12.0764V17.2156V20.5465C18 21.2127 17.6667 21.5458 17 21.5458H14V21.2127C14 20.8447 13.7015 20.5465 13.3333 20.5465H10.6667C10.2985 20.5465 10 20.8447 10 21.2127V22.2119C10 22.9478 10.597 23.5443 11.3333 23.5443H17.3333C19.3333 23.5443 20 22.8781 20 20.8796V18.2149C21.103 18.2149 22 17.3825 22 16.3592V12.2192C22 6.70928 17.514 2.22656 12 2.22656Z"
                                fill="#ED2B24" />
                        </svg>
                        <span class="ml-2">
                            Pengajuan Layanan
                        </span>
                    </nuxt-link>
                </li>
                <li class="nav-item" @click="click()" id="menu1">
                    <nuxt-link class="nav-link" to="/business-operation">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 10.832L8 16.8276" stroke="#7F8C93" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M12 12.832V16.8291" stroke="#7F8C93" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M16 8.83398V16.8281" stroke="#7F8C93" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <rect x="3" y="4.83789" width="18" height="15.9883" rx="2" stroke="#7F8C93"
                                stroke-width="2" />
                        </svg>
                        <span class="ml-2">
                            Service Operation
                        </span>
                    </nuxt-link>
                </li>
                <li class="nav-item" @click="click()" id="menu2">
                    <nuxt-link class="nav-link" to="/infrastruktur">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.09607 8.80676L8.07683 9.00199L8.07683 9.00199L7.09607 8.80676ZM8.03323 6.73992L7.2401 6.13088V6.13088L8.03323 6.73992ZM9.78856 5.30042L10.2306 6.19742L10.2306 6.19742L9.78856 5.30042ZM14.2114 5.30042L13.7694 6.19742L13.7694 6.19742L14.2114 5.30042ZM15.9668 6.73992L15.1736 7.34896L15.1736 7.34896L15.9668 6.73992ZM16.9039 8.80676L17.8847 8.61153V8.61153L16.9039 8.80676ZM7.02527 9.27978L6.03033 9.1793L7.02527 9.27978ZM7.92311 16.1609L8.84622 16.5455L7.92311 16.1609ZM7.38454 16.6995L7.76908 17.6226L7.38454 16.6995ZM16.6155 16.6995L17 15.7764L16.6155 16.6995ZM16.0769 16.1609L15.1538 16.5455L16.0769 16.1609ZM16.9747 9.27978L15.9798 9.38027L16.9747 9.27978ZM17.5026 10.7815C18.8819 10.7815 20 11.8996 20 13.2789H22C22 10.7951 19.9864 8.7815 17.5026 8.7815V10.7815ZM20 13.2789C20 14.6582 18.8819 15.7764 17.5026 15.7764V17.7764C19.9864 17.7764 22 15.7628 22 13.2789H20ZM17 15.2738V12.8356H15V15.2738H17ZM17 12.8356C17 11.731 16.1046 10.8356 15 10.8356V12.8356H17ZM15 10.8356H9V12.8356H15V10.8356ZM9 10.8356C7.89543 10.8356 7 11.731 7 12.8356H9V10.8356ZM7 12.8356V15.2738H9V12.8356H7ZM6.49744 15.7764C5.11814 15.7764 4 14.6582 4 13.2789H2C2 15.7628 4.01357 17.7764 6.49744 17.7764V15.7764ZM4 13.2789C4 11.8996 5.11814 10.7815 6.49744 10.7815V8.7815C4.01357 8.7815 2 10.7951 2 13.2789H4ZM6.11532 8.61153C6.07785 8.79973 6.04953 8.9892 6.03033 9.1793L8.02021 9.38027C8.033 9.25363 8.05187 9.12739 8.07683 9.00199L6.11532 8.61153ZM7.2401 6.13088C6.67977 6.86057 6.2949 7.70934 6.11532 8.61153L8.07683 9.00199C8.19649 8.40088 8.45293 7.83528 8.82637 7.34896L7.2401 6.13088ZM9.34653 4.40341C8.52116 4.81014 7.80042 5.40119 7.2401 6.13088L8.82637 7.34896C9.19982 6.86263 9.68026 6.46861 10.2306 6.19742L9.34653 4.40341ZM12 3.78516C11.0798 3.78516 10.1719 3.99669 9.34653 4.40341L10.2306 6.19742C10.7809 5.92622 11.3863 5.78516 12 5.78516V3.78516ZM14.6535 4.40341C13.8281 3.99669 12.9202 3.78516 12 3.78516V5.78516C12.6137 5.78516 13.2191 5.92622 13.7694 6.19742L14.6535 4.40341ZM16.7599 6.13088C16.1996 5.40119 15.4788 4.81014 14.6535 4.40341L13.7694 6.19742C14.3197 6.46861 14.8002 6.86263 15.1736 7.34896L16.7599 6.13088ZM17.8847 8.61153C17.7051 7.70934 17.3202 6.86057 16.7599 6.13088L15.1736 7.34896C15.5471 7.83528 15.8035 8.40088 15.9232 9.00199L17.8847 8.61153ZM17.9697 9.1793C17.9505 8.9892 17.9221 8.79973 17.8847 8.61153L15.9232 9.00199C15.9481 9.12739 15.967 9.25362 15.9798 9.38027L17.9697 9.1793ZM6.49744 10.7815C7.34971 10.7815 7.94714 10.1038 8.02021 9.38027L6.03033 9.1793C6.04762 9.0081 6.20028 8.7815 6.49744 8.7815V10.7815ZM7 15.2738C7 15.5217 6.99945 15.6573 6.99273 15.7554C6.98663 15.8443 6.97897 15.8269 7 15.7764L8.84622 16.5455C8.94413 16.3104 8.97492 16.0835 8.98805 15.8922C9.00055 15.7099 9 15.4942 9 15.2738H7ZM6.49744 17.7764C6.71786 17.7764 6.93351 17.7769 7.11582 17.7644C7.30717 17.7513 7.53403 17.7205 7.76908 17.6226L7 15.7764C7.05047 15.7554 7.06796 15.763 6.97899 15.7691C6.88097 15.7758 6.74537 15.7764 6.49744 15.7764V17.7764ZM7 15.7764L7.76908 17.6226C8.25616 17.4197 8.64331 17.0325 8.84622 16.5455L7 15.7764ZM17.5026 15.7764C17.2546 15.7764 17.119 15.7758 17.021 15.7691C16.932 15.763 16.9495 15.7554 17 15.7764L16.2309 17.6226C16.466 17.7205 16.6928 17.7513 16.8842 17.7644C17.0665 17.7769 17.2821 17.7764 17.5026 17.7764V15.7764ZM15 15.2738C15 15.4942 14.9995 15.7099 15.012 15.8922C15.0251 16.0835 15.0559 16.3104 15.1538 16.5455L17 15.7764C17.021 15.8269 17.0134 15.8443 17.0073 15.7554C17.0005 15.6573 17 15.5217 17 15.2738H15ZM17 15.7764L15.1538 16.5455C15.3567 17.0325 15.7438 17.4197 16.2309 17.6226L17 15.7764ZM17.5026 8.7815C17.7997 8.7815 17.9524 9.0081 17.9697 9.1793L15.9798 9.38027C16.0529 10.1038 16.6503 10.7815 17.5026 10.7815V8.7815Z"
                                fill="#7F8C93" />
                            <rect x="8" y="11.7793" width="8" height="9.99269" rx="2" stroke="#7F8C93"
                                stroke-width="2" />
                            <path d="M11.5 16.7754H12.5" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        <span class="ml-2">
                            Profile Saya
                        </span>
                    </nuxt-link>
                </li>
                <li class="nav-item" @click="click()" id="menu3">
                    <a class="nav-link"
                        href="https://telkomind-my.sharepoint.com/:x:/g/personal/hartanto_prabowo_telkom_co_id/ETZKncXGcQFJt-jdjHNXMDkBigrxJ1KhyUUMDQEECM23-g?e=BTJpsQ"
                        target="_blank">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                stroke="#CCD2E3" stroke-width="2" />
                            <path d="M9 13L15 13" stroke="#CCD2E3" stroke-width="2" stroke-linecap="round" />
                            <path d="M9 17L13 17" stroke="#CCD2E3" stroke-width="2" stroke-linecap="round" />
                            <path d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                stroke="#CCD2E3" stroke-width="2" />
                        </svg>
                        <span class="ml-2">
                            Ubah Kata Sandi
                        </span>
                    </a>
                </li>
            </ul>
        </div>
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <div class="">
                    <nuxt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        // middleware: ['notAuthenticated'],
        mounted() {
            switch (window.location.pathname) {
                case '/':
                    $('#menu0').addClass('active');
                    break;
                case '/business-operation':
                    $('#menu1').addClass('active');
                    break;
                case '/infrastruktur':
                    $('#menu2').addClass('active');
                    break;
            }
            this.click();
        },
        methods: {
            clickLogo() {
                $('.nav-item').removeClass('active');
                $('#menu0').addClass('active');
                this.$router.push('/');
            },
            click() {
                var selector, elems, makeActive;
                selector = '.parent-ul #accordionSidebar .nav-item';
                elems = document.querySelectorAll(selector);
                makeActive = function () {
                    for (var i = 0; i < elems.length; i++)
                        elems[i].classList.remove('active');
                    this.classList.add('active');
                };
                for (var i = 0; i < elems.length; i++)
                    elems[i].addEventListener('mousedown', makeActive);
            },
            ToggleSidebar(isOpen) {
                if (isOpen) {
                    $('.sidebar').removeClass('sidebar-minimize');

                    $('.sidebar-brand-icon').css('display', 'none');
                    $('.sidebar-brand-text').css('display', 'block');
                } else {
                    $('.sidebar').addClass('sidebar-minimize');

                    $('.sidebar-brand-icon').css('display', 'block');
                    $('.sidebar-brand-text').css('display', 'none');
                }
            }

        }
    }

</script>

<style scoped>
    .navbar-nav.sidebar {
        background-color: white !important;
    }

    .sidebar .nav-item .nav-link span {
        font-weight: 600 !important;
        font-size: 16px !important;
        line-height: 22px !important;

        color: #a8a7a7 !important;
    }

    .sidebar .nav-item.active .nav-link span {
        color: #ED2B24 !important;
    }

    .sidebar .nav-item.active {
        border-left: 2px solid #ED2B24;
    }

    .sidebar .nav-item .nav-link svg {
        filter: invert(60%) sepia(23%) saturate(174%) hue-rotate(157deg) brightness(86%) contrast(85%);
    }

    .sidebar .nav-item.active .nav-link svg {
        filter: invert(32%) sepia(73%) saturate(4229%) hue-rotate(346deg) brightness(97%) contrast(106%);
    }

    .sidebar .nav-item .nav-link {
        padding: 1.1rem;
    }

</style>
