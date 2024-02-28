<template>
    <div>
        <div class="row d-none">
            <div class="col-xl-4">
                <div class="form-group form-dsa">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <img src="/icon/form/search.svg">
                            </div>
                        </div>
                        <input type="text" class="form-control filter" placeholder="Cari Lampiran Dokumen"
                            @keyup="GetDetailArsipLampiran()" v-model="Filter.search">
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <div class="row">
                <div class="col-xl-12">
                    <div class="card-base">
                        <div>
                            <label class="section-label">
                                Lampiran Dokumen
                            </label>
                        </div>
                        <div class="row" v-if="attachment.length > 0">
                            <div class="col-xl-4" v-for="(item, index) of attachment" :key="index">
                                <div class="card mb-4 card-lampiran">
                                    <div class="card-body">
                                        <div class="icon-lampiran" style="background-color: #FFEDD1;">
                                            <img src="/icon/arsip-lampiran/lampiran.svg">
                                        </div>
                                        <p class="label-lampiran">
                                            <span v-if="item.name.length > 25">
                                                {{ item.name.slice(0, 25) }} ...
                                            </span>
                                            <span v-else>
                                                {{ item.name }}
                                            </span>
                                        </p>
                                        <div class="row">
                                            <div class="col-6 d-flex justify-content-start">
                                                <span class="value-lampiran text-dsa-secondary">
                                                    {{ item.file_size | formatFile }}
                                                </span>
                                            </div>
                                            <div class="col-6 d-flex justify-content-end">
                                                <a :href="item.path" target="_blank" class="cursor-pointer">
                                                    <img src="/icon/arsip-lampiran/download.svg">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" style="height: 60vh;" v-else>
                            <div class="col-xl-12 d-flex justify-content-center align-items-center">
                                <div class="text-center p-4">
                                    <img src="/icon/not-found/not-found-v1.svg">
                                    <p class="font-size-18 text-dsa-secondary font-weight-normal mt-4">
                                        Tidak Ada Data Ditemukan
                                    </p>
                                </div>
                            </div>
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
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                attachment: [],
                Filter: {
                    search: '',
                    statusFilter: '',
                },
            }
        },
        filters: {
            formatFile(bytes) {
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes == 0) return '0 Byte';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
            }
        },
        watch: {
            'Filter.statusFilter'() {
                this.GetDetailArsipLampiran();
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Arsip Lampiran',
                menu: [{
                    menuTitle: 'Arsip Lampiran',
                    menuURL: '/manage/arsip-lampiran',
                    menuIsRedirect: true,
                    menuIsTextColor: 'secondary',
                },
                {
                    menuTitle: 'Detail Lampiran',
                    menuURL: '/manage/arsip-lampiran',
                    menuIsRedirect: false,
                    menuIsTextColor: 'secondary',
                }]
            }]);
            this.GetDetailArsipLampiran();
        },
        methods: {
            GetDetailArsipLampiran() {
                const route = this.$route.params;
                let params = {
                    search: this.Filter.search,
                };
                this.Request('GET', '/api/v3/request/' + route.id, null, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {
                        this.attachment = callback.content[0].attachment;
                    };
                });
            },
        }
    }

</script>


<style scoped>
    .card-lampiran {
        border: 0;
        box-shadow: 10px 24px 30px rgba(138, 138, 138, 0.02);
        border-radius: 4px;
    }

    .card-lampiran .icon-lampiran {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;

        width: 40px;
        height: 40px;

        margin-bottom: 16px;
    }

    .card-lampiran .label-lampiran {
        font-weight: 600;
        font-size: 16px;
        color: #3B3D39;

        margin-bottom: 13px;
    }

    .card-lampiran .value-lampiran {
        font-weight: 400;
        font-size: 14px;
    }

</style>
