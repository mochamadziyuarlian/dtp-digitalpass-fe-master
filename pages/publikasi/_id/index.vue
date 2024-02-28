<template>
    <div class="bg-white">
        <div class="container" id="Laporan">
            <div class="py-5">
                <div class="row" id="SectionTitle">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12"></div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <b-breadcrumb class="bg-transparent" active-class="text-red-main" :items="breadcrumb" id="breadcrumb">
                        </b-breadcrumb>
                        <label class="text-gray-dark-1 font-size-32 font-weight-900" id="head">
                            {{ Data.DetailNews.data.heading }}
                        </label>
                        <img class="img-fluid rounded" :src="Data.DetailNews.data.thumbnail" alt="">
                        <div class="text-center pt-3 pb-4">
                            <span class="text-center text-gray-light-2 font-size-12">
                                {{ Data.DetailNews.data.heading }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="row py-5">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12" id="SectionAuthor">
                        <div class="py-2">
                            <p class="font-size-16 text-gray-light-2 mb-0">PENULIS</p>
                            <p class="font-size-16 text-gray-main font-weight-700">
                                {{ Data.DetailNews.data.publisher_name }}
                            </p>
                        </div>
                        <div class="py-2">
                            <p class="font-size-16 text-gray-light-2 mb-0">TANGGAL</p>
                            <p class="font-size-16 text-gray-main font-weight-700">
                                {{ Data.DetailNews.data.created_at | formatDate }}
                            </p>
                        </div>
                        <div class="py-2">
                            <p class="font-size-16 text-gray-light-2 mb-0">KATEGORI</p>
                            <p class="font-size-16 text-gray-main font-weight-700">Berita DOA</p>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" id="SectionContent">
                        <p id="editor" class="text-gray-main font-size-20 text-justify"
                            v-html="Data.DetailNews.data.content"></p>
                    </div>
                </div>

                <div class="py-5" v-if="Data.RecommendationNews.length !== 0" id="SectionLaporanUjiDSA">
                    <div class="row border-bottom py-3" id="SectionTitle">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <h2 class="text-gray-dark-1 font-weight-900" id="head">Rekomendasi DOA</h2>
                        </div>
                    </div>
                    <div class="row py-3">
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 my-3"
                            v-for="(item, index) in Data.RecommendationNews.data" :key="index">
                            <div class="card bg-transparent border-0">
                                <div class="row">
                                    <div class="col-auto">
                                        <img class="img-fluid" :src="item.thumbnail" :alt="item.thumbnail_name"
                                            style="height: 120px; width: 160px;">
                                    </div>
                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                        <div class="card-body p-0">
                                            <h5 class="text-gray-dark-1 font-weight-900" id="head">
                                                {{ item.heading.slice(0, 25) }} ...
                                            </h5>
                                            <p class="text-gray-main font-size-16 line-height-24" id="value">
                                                <span v-html="`${item.content.substring(0, 70)} ...`"></span>
                                            </p>
                                            <nuxt-link :to="`/publikasi/${item.id}`"  id="UnduhLaporan"
                                                class="text-red-main font-weight-700 link-dsa-hover">
                                                Baca selengkapnya >>
                                            </nuxt-link>
                                        </div>
                                    </div>
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
    import moment from 'moment';

    export default {
        layout: 'portal/default',
        mixins: [mixins],
        data() {
            return {
                Data: {
                    RecommendationNews: {
                        data: {},
                        length: 0
                    },
                    DetailNews: {
                        data: {},
                        length: 0
                    }
                },
                breadcrumb: [{
                        text: 'Publikasi',
                        to: {
                            name: 'publikasi'
                        }
                    },
                    {
                        text: 'Detail Publikasi',
                        href: '#'
                    }
                ]
            }
        },
        filters: {
            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('DD MMMM YYYY - HH:MM')
                } else {
                    return '-';
                }
            }
        },
        mounted() {
            this.GetDetailNews();
            this.GetRecommendationNews();
        },
        methods: {
            GetDetailNews() {
                this.GET(`/api/v3/portal/kegiatan/${this.$route.params.id}`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Data.DetailNews.data = data.content[0];
                        this.Data.DetailNews.length = data.content[0].length;
                    }
                });
            },
            GetRecommendationNews() {
                this.GET(`/api/v3/portal/kegiatan?flag=RECOMENDATION`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.Data.RecommendationNews.data = data.content;
                        this.Data.RecommendationNews.length = data.content.length;
                    }
                });
            }
        }
    }

</script>

<style scoped>
    #editor /deep/ img {
        width: 100%;
    }

</style>
