<template>
    <ul class="navbar-nav sidebar sidebar-dark accordion" :class="isActive ? 'toggled' : ''"
        style="background-color: #FFFFFF; transition: 0.4s;" id="accordionSidebar">
        <nuxt-link class="sidebar-brand bg-white d-flex align-items-center"
            style="margin-left: 6px; height: 88px !important; border-right: 1px solid #F4F4F4;" to="/manage/dashboard">
            <div v-if="!isActive">
                <div class="sidebar-brand-text">
                    <img class="img-fluid" src="/image/logo/logo-dsa.svg" alt="dtp-dsa-logo" />
                    <img class="sidebar-brand-icon" @click="isActive = !isActive"
                        src="/icon/sidebar/sidebar_toggle_arrow.svg" style="margin-top: 5px;">
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

                <li class="nav-item" v-if="PermissionsAccess.Dashboard" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/dashboard">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5 12.7595C5 11.4018 5 10.7229 5.27446 10.1262C5.54892 9.52943 6.06437 9.08763 7.09525 8.20401L8.09525 7.34687C9.95857 5.74974 10.8902 4.95117 12 4.95117C13.1098 4.95117 14.0414 5.74974 15.9047 7.34687L16.9047 8.20401C17.9356 9.08763 18.4511 9.52943 18.7255 10.1262C19 10.7229 19 11.4018 19 12.7595V16.9999C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 20.9999 16.8856 20.9999 15 20.9999H9C7.11438 20.9999 6.17157 20.9999 5.58579 20.4142C5 19.8284 5 18.8856 5 16.9999V12.7595Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path
                                    d="M14.5 21V16C14.5 15.4477 14.0523 15 13.5 15H10.5C9.94772 15 9.5 15.4477 9.5 16V21"
                                    stroke="#7F8C93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Dashboard
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.DataPengajuan" @click="ClickMenu()">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pengajuan"
                        aria-expanded="true" aria-controls="collapseTwo">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5 4.86914C16.9045 4.86914 17.6067 4.86914 18.1111 5.19732C18.3295 5.33939 18.517 5.52195 18.6629 5.73458C19 6.22573 19 6.90946 19 8.27692V17.5266C19 19.3625 19 20.2805 18.4142 20.8508C17.8284 21.4212 16.8856 21.4212 15 21.4212H9C7.11438 21.4212 6.17157 21.4212 5.58579 20.8508C5 20.2805 5 19.3625 5 17.5266V8.27692C5 6.90946 5 6.22573 5.33706 5.73458C5.48298 5.52195 5.67048 5.33939 5.88886 5.19732C6.39331 4.86914 7.09554 4.86914 8.5 4.86914"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path
                                    d="M9 4.86918C9 3.79371 9.89543 2.92188 11 2.92188H13C14.1046 2.92188 15 3.79371 15 4.86918C15 5.94464 14.1046 6.81648 13 6.81648H11C9.89543 6.81648 9 5.94464 9 4.86918Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path d="M9 11.6836L15 11.6836" stroke="#7F8C93" stroke-width="2"
                                    stroke-linecap="round" />
                                <path d="M9 15.5781L13 15.5781" stroke="#7F8C93" stroke-width="2"
                                    stroke-linecap="round" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Data Pengajuan
                            </span>
                        </div>

                    </a>
                    <div id="pengajuan" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="py-2 collapse-inner rounded" style="background-color: #FFF7F7 !important;">
                            <nuxt-link class="text-decoration-none sub-menu" to="/manage/data-pengajuan"
                                v-if="PermissionsAccess.DaftarPengajuan">
                                <span class="collapse-item font-size-16">
                                    Daftar Pengajuan
                                </span>
                            </nuxt-link>
                            <nuxt-link class="text-decoration-none sub-menu" to="/manage/jadwal-agenda"
                                v-if="PermissionsAccess.JadwalAgenda">
                                <span class="collapse-item font-size-16">
                                    Jadwal Agenda
                                </span>
                            </nuxt-link>
                            <nuxt-link class="text-decoration-none sub-menu" to="/manage/arsip-lampiran"
                                v-if="PermissionsAccess.ArsipLampiran">
                                <span class="collapse-item font-size-16">
                                    Arsip Lampiran
                                </span>
                            </nuxt-link>
                        </div>
                    </div>
                </li>

                <li class="nav-item"
                    v-if="PermissionsAccess.KelolaFAQ || PermissionsAccess.KelolaSK || PermissionsAccess.KelolaLayanan"
                    @click="ClickMenu()">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#kontent"
                        aria-expanded="true" aria-controls="collapseTwo">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="4" width="14" height="17" rx="2" stroke="#7F8C93" stroke-width="2" />
                                <path d="M9 9H15" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                                <path d="M9 13H15" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                                <path d="M9 17H13" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Konten
                            </span>
                        </div>

                    </a>
                    <div id="kontent" class="collapse " aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="py-2 collapse-inner rounded" style="background-color: #FFF7F7 !important;">
                            <nuxt-link class="text-decoration-none sub-menu" to="/manage/kelola-faq"
                                v-if="PermissionsAccess.KelolaFAQ">
                                <span class="collapse-item font-size-16">
                                    Kelola FAQ
                                </span>
                            </nuxt-link>
                            <nuxt-link class="text-decoration-none sub-menu" to="/manage/kelola-sk"
                                v-if="PermissionsAccess.KelolaSK">
                                <span class="collapse-item font-size-16">
                                    Kelola S&K
                                </span>
                            </nuxt-link>
                            <nuxt-link class="text-decoration-none sub-menu" to="/manage/kelola-layanan"
                                v-if="PermissionsAccess.KelolaLayanan">
                                <span class="collapse-item font-size-16">
                                    Kelola Layanan
                                </span>
                            </nuxt-link>
                        </div>
                    </div>
                </li>

                <li class="nav-item" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/drive-dokumen">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3 10C3 7.17157 3 5.75736 3.87868 4.87868C4.75736 4 6.17157 4 9 4H15C17.8284 4 19.2426 4 20.1213 4.87868C21 5.75736 21 7.17157 21 10V14C21 16.8284 21 18.2426 20.1213 19.1213C19.2426 20 17.8284 20 15 20H9C6.17157 20 4.75736 20 3.87868 19.1213C3 18.2426 3 16.8284 3 14V10Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path
                                    d="M8 4V4C8.73962 4 9.10944 4 9.43492 4.11591C9.7015 4.21085 9.9449 4.36128 10.149 4.55726C10.3983 4.79654 10.5637 5.12731 10.8944 5.78885L11.8944 7.78885C12.4323 8.86469 12.7013 9.4026 13.1846 9.7013C13.6679 10 14.2693 10 15.4721 10H17C18.8856 10 19.8284 10 20.4142 10.5858C21 11.1716 21 12.1144 21 14V16"
                                    stroke="#7F8C93" stroke-width="2" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Drive Dokumen
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.KelolaKegiatan" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/kelola-kegiatan">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M18.9997 13.5864L18.9794 13.566C18.5898 13.1764 18.2537 12.8402 17.9536 12.5874C17.6367 12.3203 17.2917 12.0854 16.8665 11.9572C16.3014 11.7867 15.6986 11.7867 15.1335 11.9572C14.7083 12.0854 14.3633 12.3203 14.0464 12.5874C13.7463 12.8402 13.4102 13.1764 13.0206 13.566L12.9921 13.5946C12.6852 13.9014 12.5046 14.0805 12.3645 14.1964L12.3443 14.2128L12.3317 14.1901C12.2447 14.0305 12.1435 13.7971 11.9726 13.3982L11.9191 13.2736L11.8971 13.2221L11.897 13.222C11.5411 12.3914 11.2422 11.694 10.9464 11.1683C10.6416 10.6267 10.2618 10.1188 9.66982 9.82203C9.17604 9.57449 8.6235 9.46809 8.07311 9.51453C7.41323 9.57022 6.87197 9.90075 6.38783 10.2904C5.98249 10.6167 5.52754 11.0608 5 11.5869V13.0009C5 13.5176 5.0003 13.9857 5.00308 14.412L6.117 13.2981C6.80615 12.6089 7.26639 12.1506 7.64186 11.8484C8.01276 11.5499 8.17233 11.5133 8.24128 11.5074C8.42475 11.492 8.60893 11.5274 8.77352 11.6099C8.83539 11.641 8.96994 11.7342 9.20344 12.1492C9.43981 12.5692 9.69693 13.1656 10.0809 14.0614L10.1343 14.1861L10.1506 14.2242C10.2995 14.5717 10.4378 14.8946 10.5759 15.1477C10.7206 15.413 10.9308 15.7308 11.2847 15.9499C11.702 16.2082 12.1997 16.3041 12.6831 16.2192C13.093 16.1473 13.4062 15.9302 13.6391 15.7376C13.8613 15.5539 14.1096 15.3055 14.3769 15.0381L14.377 15.0381L14.4063 15.0088C14.8325 14.5826 15.1083 14.308 15.3353 14.1167C15.5526 13.9335 15.6552 13.8888 15.7112 13.8719C15.8995 13.8151 16.1005 13.8151 16.2888 13.8719C16.3448 13.8888 16.4474 13.9335 16.6647 14.1167C16.8917 14.308 17.1675 14.5826 17.5937 15.0088L18.9441 16.3592C18.9902 15.6413 18.9983 14.7489 18.9997 13.5864Z"
                                    fill="#7F8C93" />
                                <circle cx="16.5" cy="7.5" r="1.5" fill="#7F8C93" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Kelola Kegiatan
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.KelolaLaporan" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/kelola-laporan">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 10L8 16" stroke="#7F8C93" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M12 12V16" stroke="#7F8C93" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M16 8V16" stroke="#7F8C93" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <rect x="3" y="4" width="18" height="16" rx="2" stroke="#7F8C93" stroke-width="2" />
                            </svg>


                            <span class="ml-2 font-size-16">
                                Kelola Laporan
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.AuditTrail" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/audit-trail">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.1716 21H7C5.11438 21 4.17157 21 3.58579 20.4142C3 19.8284 3 18.8856 3 17V7C3 5.11438 3 4.17157 3.58579 3.58579C4.17157 3 5.11438 3 7 3H17C18.8856 3 19.8284 3 20.4142 3.58579C21 4.17157 21 5.11438 21 7V14.1716C21 14.5803 21 14.7847 20.9239 14.9685C20.8478 15.1522 20.7032 15.2968 20.4142 15.5858L15.5858 20.4142C15.2968 20.7032 15.1522 20.8478 14.9685 20.9239C14.7847 21 14.5803 21 14.1716 21Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path
                                    d="M14 21V16.3333C14 15.2334 14 14.6834 14.3417 14.3417C14.6834 14 15.2334 14 16.3333 14H21"
                                    stroke="#7F8C93" stroke-width="2" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Audit Trail
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.KelolaPengguna" @click="ClickMenu()">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pengguna"
                        aria-expanded="true" aria-controls="collapseTwo">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path d="M9 13L15 13" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                                <path d="M9 17L13 17" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                                <path d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                    stroke="#7F8C93" stroke-width="2" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Kelola Pengguna
                            </span>
                        </div>

                    </a>
                    <div id="pengguna" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="py-2 collapse-inner rounded" style="background-color: #FFF7F7 !important;">
                            <nuxt-link class="text-decoration-none sub-menu" to="/manage/approval/menunggu-persetujuan"
                                v-if="PermissionsAccess.VerifikasiPengguna">
                                <span class="collapse-item font-size-16">
                                    Menunggu Persetujuan
                                </span>
                            </nuxt-link>
                            <nuxt-link class="text-decoration-none sub-menu" to="/manage/kelola-pengguna"
                                v-if="PermissionsAccess.ListPengguna">
                                <span class="collapse-item font-size-16">
                                    Kelola Pengguna
                                </span>
                            </nuxt-link>
                            <!-- <nuxt-link class="text-decoration-none sub-menu" to="/manage/kelola-akses-ido"
                                v-if="PermissionsAccess.ListPengguna">
                                <span class="collapse-item font-size-16">
                                    Kelola Akses IDO
                                </span>
                            </nuxt-link> -->
                        </div>
                    </div>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.DataRating" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/rating">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.1443 6.62704C10.931 4.66605 11.3243 3.68555 12.0006 3.68555C12.6769 3.68555 13.0702 4.66605 13.8568 6.62705L13.8934 6.71836C14.3378 7.82623 14.56 8.38016 15.0129 8.71685C15.4657 9.05354 16.0602 9.10678 17.2491 9.21326L17.464 9.2325C19.4099 9.40677 20.3828 9.4939 20.5909 10.1129C20.7991 10.7319 20.0766 11.3892 18.6316 12.7039L18.1493 13.1427C17.4178 13.8082 17.052 14.1409 16.8815 14.5771C16.8497 14.6584 16.8233 14.7418 16.8024 14.8266C16.6903 15.2813 16.7975 15.764 17.0117 16.7295L17.0783 17.03C17.472 18.8043 17.6688 19.6915 17.3252 20.0741C17.1967 20.2171 17.0298 20.3201 16.8444 20.3707C16.3482 20.5061 15.6437 19.932 14.2348 18.7839C13.3096 18.0301 12.847 17.6531 12.3159 17.5683C12.107 17.535 11.8941 17.535 11.6852 17.5683C11.1541 17.6531 10.6915 18.0301 9.76638 18.7839C8.35742 19.932 7.65295 20.5061 7.15675 20.3707C6.97133 20.3201 6.80442 20.2171 6.676 20.0741C6.33232 19.6915 6.52915 18.8043 6.92283 17.03L6.9895 16.7295C7.20371 15.764 7.31082 15.2813 7.19876 14.8266C7.17786 14.7418 7.15142 14.6584 7.11962 14.5771C6.94915 14.1409 6.5834 13.8082 5.85189 13.1427L5.36961 12.7039C3.92456 11.3892 3.20204 10.7319 3.41022 10.1129C3.6184 9.4939 4.59131 9.40677 6.53712 9.2325L6.75206 9.21326C7.94097 9.10678 8.53543 9.05354 8.98828 8.71685C9.44113 8.38016 9.66333 7.82623 10.1077 6.71836L10.1443 6.62704Z"
                                    stroke="#7F8C93" stroke-width="2" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Data Rating
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.KelolaPageAuthorization" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/page-authorization">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 13C4 11.1144 4 10.1716 4.58579 9.58579C5.17157 9 6.11438 9 8 9H16C17.8856 9 18.8284 9 19.4142 9.58579C20 10.1716 20 11.1144 20 13V15C20 17.8284 20 19.2426 19.1213 20.1213C18.2426 21 16.8284 21 14 21H10C7.17157 21 5.75736 21 4.87868 20.1213C4 19.2426 4 17.8284 4 15V13Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path d="M16 8V7C16 4.79086 14.2091 3 12 3V3C9.79086 3 8 4.79086 8 7V8" stroke="#7F8C93"
                                    stroke-width="2" stroke-linecap="round" />
                                <circle cx="12" cy="15" r="2" fill="#7F8C93" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Page Authorization
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/kelola-produk">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 12C2 10.1308 2 9.19615 2.40192 8.5C2.66523 8.04394 3.04394 7.66523 3.5 7.40192C4.19615 7 5.13077 7 7 7H17C18.8692 7 19.8038 7 20.5 7.40192C20.9561 7.66523 21.3348 8.04394 21.5981 8.5C22 9.19615 22 10.1308 22 12C22 13.8692 22 14.8038 21.5981 15.5C21.3348 15.9561 20.9561 16.3348 20.5 16.5981C19.8038 17 18.8692 17 17 17H7C5.13077 17 4.19615 17 3.5 16.5981C3.04394 16.3348 2.66523 15.9561 2.40192 15.5C2 14.8038 2 13.8692 2 12Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path d="M19 4C19 2.89543 18.1046 2 17 2H7C5.89543 2 5 2.89543 5 4" stroke="#7F8C93"
                                    stroke-width="2" />
                                <path d="M19 20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20"
                                    stroke="#7F8C93" stroke-width="2" />
                                <rect x="5.5" y="10.5" width="5" height="1" rx="0.5" stroke="#7F8C93" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Kelola Produk
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/kelola-tribe">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 12C2 10.1308 2 9.19615 2.40192 8.5C2.66523 8.04394 3.04394 7.66523 3.5 7.40192C4.19615 7 5.13077 7 7 7H17C18.8692 7 19.8038 7 20.5 7.40192C20.9561 7.66523 21.3348 8.04394 21.5981 8.5C22 9.19615 22 10.1308 22 12C22 13.8692 22 14.8038 21.5981 15.5C21.3348 15.9561 20.9561 16.3348 20.5 16.5981C19.8038 17 18.8692 17 17 17H7C5.13077 17 4.19615 17 3.5 16.5981C3.04394 16.3348 2.66523 15.9561 2.40192 15.5C2 14.8038 2 13.8692 2 12Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path d="M19 4C19 2.89543 18.1046 2 17 2H7C5.89543 2 5 2.89543 5 4" stroke="#7F8C93"
                                    stroke-width="2" />
                                <path d="M19 20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20"
                                    stroke="#7F8C93" stroke-width="2" />
                                <rect x="5.5" y="10.5" width="5" height="1" rx="0.5" stroke="#7F8C93" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Kelola Tribe
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.KelolaSLA" @click="ClickMenu()">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#sla"
                        aria-expanded="true" aria-controls="collapseTwo">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path d="M9 13L15 13" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                                <path d="M9 17L13 17" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                                <path d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                                    stroke="#7F8C93" stroke-width="2" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Kelola SLA
                            </span>
                        </div>

                    </a>
                    <div id="sla" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="py-2 collapse-inner rounded" style="background-color: #FFF7F7 !important;">
                            <nuxt-link class="text-decoration-none sub-menu" to="/manage/mini-survey"
                                v-if="PermissionsAccess.ListMiniSurvey">
                                <span class="collapse-item font-size-16">
                                    Mini Survey
                                </span>
                            </nuxt-link>
                            <nuxt-link class="text-decoration-none sub-menu" to="/manage/kelola-sla"
                                v-if="PermissionsAccess.ListSLA">
                                <span class="collapse-item font-size-16">
                                    SLA
                                </span>
                            </nuxt-link>
                        </div>
                    </div>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.KelolaPeran" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/kelola-peran">

                        <div>
                            <svg width="33" height="24" viewBox="0 0 33 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471"
                                    stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                                <circle cx="12" cy="8" r="4" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                                <path
                                    d="M28.7274 20.4471C28.4003 19.5316 27.7887 18.6872 26.9426 17.9831C26.0966 17.279 25.0401 16.7353 23.8599 16.3965C22.6796 16.0577 21.4091 15.9334 20.1525 16.0338C18.8958 16.1342 17.6888 16.4564 16.6302 16.9742"
                                    stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                                <circle cx="21" cy="8" r="4" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Kelola Peran
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.ReportAnalytics" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/report-analytics">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                                    stroke="#7F8C93" stroke-width="2" />
                                <path
                                    d="M9.00049 11.4998L11.0536 13.9912C11.4545 14.4777 12.2001 14.4763 12.5993 13.9884L15.5781 10.3477"
                                    stroke="#7F8C93" stroke-width="1.5" stroke-linecap="round" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Report Analytics
                            </span>
                        </div>

                    </nuxt-link>
                </li>

                <li class="nav-item" v-if="PermissionsAccess.Profile" @click="ClickMenu()">
                    <nuxt-link class="nav-link" to="/manage/profile">

                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471"
                                    stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                                <circle cx="12" cy="8" r="4" stroke="#7F8C93" stroke-width="2" stroke-linecap="round" />
                            </svg>

                            <span class="ml-2 font-size-16">
                                Profile
                            </span>
                        </div>

                    </nuxt-link>
                </li>

            </ul>
        </div>

    </ul>
</template>

<script>
    import mixins from '@/plugins/mixins.js';

    export default {
        mixins: [mixins],
        data() {
            return {
                PermissionsAccess: [],
                isActive: false
            }
        },
        mounted() {
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
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
    ul li a.nav-link span {
        color: #7F8C93 !important;
        font-weight: 600;
        font-size: 16px;
    }


    /* not active */



    /* active */
    ul li.active a.nav-link {
        border-left: 2px solid #ED2B24;
    }

    ul li.active a.nav-link span {
        color: #ED2B24 !important;
    }

    ul li.active a.nav-link svg {
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
        
        .sidebar.toggled .nav-item .nav-link {
            width: 84px !important;
        }

        .sidebar .nav-item .nav-link {
            padding-top: 20px !important;
            padding-bottom: 20px !important;
        }
    }

</style>
