<template>
    <div>
        <div class="container page-container">
            <div class="row mb-5">
                <div class="col-xl-10">
                    <img src="/v3/Portal/assets/icon/LOGO_DSA.svg" />
                </div>
                <div class="col-xl-2 d-flex justify-content-end">
                    <nuxt-link to="/user/dashboard">
                        <img src="/v3/Portal/assets/icon/PENGAJUAN_ICON_BAN.svg" />
                    </nuxt-link>
                </div>
            </div>
            <div class="modal-container">
                <p class="title">Detail Pengajuan Berjalan</p>
                <p class="subtitle">Saat ini, terdapat <b class="red-text">{{ data.request.meta.totalData || 0 }} pengajuan</b> Anda yang sedang berjalan. Tim evaluator Kami melakukan pengujian sesuai dengan kategori layanan yang sudah dipilih oleh Pengaju. Detail tahapan dan proses yang sedang berlangsung dapat dilihat pada tabel di bawah.</p>
                <div class="service-count">
                    <div 
                        class="count-item"
                        v-for="(item, index) of data.services"
                        :key="index"
                    >
                        <div class="indicator" :class="{'indicator-gray' : item.count == 0}"></div>
                        <p class="counter">{{ item.count }}</p>
                        <p class="label">
                            {{ item.name }}
                            <img :src="item.count > 0 ? '/v3/Portal/assets/icon/CHECK_MARK.svg' : '/v3/Portal/assets/icon/X_MARK.svg'">
                        </p>
                    </div>
                </div>
                <div class="title-table">
                    <img src="/v3/Portal/assets/icon/LIST_REQUEST.svg" />
                    <p>Cek daftar pengajuanmu yang sedang berjalan</p>
                </div>
                <div class="row">
                    <div class="col-xl-12">
                        <div class="table-responsive v3 mb-4">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Layanan</th>
                                        <th>Produk</th>
                                        <th>Nama Pengajuan</th>
                                        <th>Detail Tahapan</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) of data.request.content" :key="index">
                                        <td>{{ item.service_name || '-' }}</td>
                                        <td>{{ item.product_name || '-' }}</td>
                                        <td>{{ item.nama_pengajuan || '-' }}</td>
                                        <td>
                                            <span
                                                v-if="item.status_user === 'Jadwal pemaparan produk sudah tersedia'">
                                                Menunggu Jadwal Pemaparan
                                            </span>
                                            <span v-else>
                                                {{ item.status_user || '-' }}
                                            </span>
                                        </td>
                                        <td>
                                            <nuxt-link :to="'/user/monitoring/pengajuan-layanan/detail/' + item.id">
                                                <button type="button" class="btn btn-detail">
                                                    <img src="/v3/Portal/assets/icon/DETAIL.svg">
                                                    Detail Pengajuan
                                                </button>
                                            </nuxt-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';

    export default {
        layout: '/v3/Portal/blank',
        middleware: ['isUser', 'notAuthenticated', 'liveChat'],
        mixins: [mixins],
        data() {
            return {
                data: {
                    user: null,
                    services: [],
                    request: {
                        content: [],
                        meta: {}
                    }
                }
            }
        },
        mounted() {
            this.data.user = this.UserLogin();
            this.getRequest();
            this.getListServices();
        },
        methods: {
            async getListServices() {
                const params = {
                    userId: this.data.user.id
                }

                var summary = [];

                await this.Request('GET', '/api/v3/request-dashboard/findByUserSummary', params, null, 'BASIC', (res) => {
                    if (res.code === 200) {
                        for (const item of res.content) {
                            if(item.type == "in_progress") {
                                summary.push({
                                    ...item
                                });
                            }
                        }
                    }
                });

                this.Request('GET', '/api/v3/service', null, null, 'BASIC', (res) => {
                    if (res.code === 200) {
                        for (const item of res.content) {
                            var count = summary.find((data) => data.service_name === item.name).data;

                            this.data.services.push({
                                ...item,
                                count: count
                            });
                        }
                    }
                })
            },
            getRequest() {
                const params = {
                    status: "'SUBMIT_DATA_PENGAJUAN','VERIFIKASI_DATA_PENGAJUAN','JADWAL_PEMAPARAN','PROSES_PENGUJIAN','LAPORAN_PENGUJIAN','PROSES_PERBAIKAN'"
                }

                const body = {
                    requested_by: this.data.user.id,
                };

                this.Request('POST', '/api/v3/request/findByUser', params, body, 'BASIC', (res) => {
                    if (res.code === 200) {
                        // this.data.request.content = res.content;
                        for (const item of res.content) {
                            this.data.request.content.push({
                                ...item,
                                service_name: item.service ? item.service.name : "-"
                            })
                        }
                        this.data.request.meta = res.meta;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .page-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-top: 24px;
        padding-bottom: 24px;
    }
    .modal-container {
        background-color: #fff;
        padding: 32px 68px;
        border-radius: 8px;
        overflow-y: auto;
    }
    .modal-container .title {
        color: #3B3D39;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 28px;
    }
    .modal-container .subtitle {
        color: #656664;
        font-size: 16px;
    }
    .modal-container .red-text {
        color: #E42313;
    }

    .modal-container .service-count {
        width: 100%;
        display: flex;
        margin-bottom: 24px;
    }
    .modal-container .service-count .count-item {
        width: 100%;
        padding: 4px;
    }
    .modal-container .service-count .count-item:first-child {
        padding-left: 0;
    }
    .modal-container .service-count .count-item:last-child {
        padding-right: 0;
    }
    .modal-container .service-count .count-item .indicator {
        width: 100%;
        height: 8px;
        background-color: #52BD94;
        border-radius: 8px;
        margin-bottom: 4px;
    }
    .modal-container .service-count .count-item .indicator-gray {
        background-color: #D9DDE3;
    }
    .modal-container .service-count .count-item .counter {
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: #2E3032;
        margin-bottom: 0;
    }
    .modal-container .service-count .count-item .label {
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        color: #8C8F93;
        margin-bottom: 0;
    }
    .modal-container .title-table {
        border-radius: 4px;
        padding: 12px;
        background-color: #E42313;
        display: flex;
        align-items: center;
        margin-bottom: 12px;
    }
    .modal-container .title-table p {
        margin-bottom: 0;
        margin-left: 12px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: #fff;
    }
    .modal-container .table .btn-detail {
        background-color: #FFEFE9;
        color: #FF6121;
        font-size: 16px;
        padding: 8px 12px;
    }
    .modal-container .table .btn-detail img {
        margin-right: 8px;
    }
    .modal-container .table  tr td:last-child {
        width: 1%;
        white-space: nowrap;
    }
</style>