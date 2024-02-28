<template>
    <div>

        <div>
            <nav class="navbar navbar-light bg-white justify-content-between" style="height: 132px; padding: 32px;">
                <div class="navbar-brand">
                    <p class="font-size-24 text-dsa-black font-weight-600 mb-0">
                        Service Operation
                    </p>
                    <span class="font-size-20 text-dsa-danger font-weight-600">
                        {{ Filter.Product.product }}
                    </span>
                </div>
                <form class="form-inline">
                    <div class="date-picker mx-3">

                        <DatePicker type="date" v-model="Data.DateRange" range :shortcuts="ShortcutsDate"
                            @change="ChangeDateRange()" placeholder="Filter date by">
                        </DatePicker>
                    </div>

                    <div class="form-group form-dsa mr-3" style="border: 1px solid #F4F4F4; border-radius: 4px;">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <img src="/icon/filter.svg">
                                </div>
                            </div>
                            <select class="form-control font-size-14" style="height: 40px;"
                                v-model="Filter.Product.product" @change="ChangeProduct()">
                                <option v-for="(item, index) of Data.Product.data" :key="index" :value="item.appName">
                                    {{ item.product }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="mr-3">
                        <button type="button" class="btn btn-dsa-primary py-2">
                            <img src="/icon/refresh.svg">
                        </button>
                    </div>

                    <div class="profile-header-redesign">
                        <ul style="list-style-type: none; margin-bottom: 0;">
                            <li class="nav-item dropdown" id="nav-profile">
                                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <b-avatar></b-avatar>
                                    <span class="ml-2 d-none d-lg-inline font-weight-700 small text-black">
                                        adasd
                                    </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <nuxt-link to="/profile/data-pengajuan" class="dropdown-item">
                                        <em class="fas fa-file-alt fa-sm fa-fw mr-2 text-gray-400"></em>
                                        Pengajuan layanan
                                    </nuxt-link>
                                    <nuxt-link to="/profile/service-operation" class="dropdown-item">
                                        <em class="fa fa-chart-bar fa-sm fa-fw mr-2 text-gray-400"></em>
                                        Service Operation
                                    </nuxt-link>
                                    <nuxt-link to="/profile" class="dropdown-item">
                                        <em class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></em>
                                        Profile saya
                                    </nuxt-link>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item cursor-pointer" data-toggle="modal"
                                        data-target="#modalLogout">
                                        <em class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></em>
                                        Keluar
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>

                </form>
            </nav>
        </div>

        <div style="padding: 32px;">
            <div class="row">

                <div class="col-xl-9 d-none">
                    <div class="card-base">
                        <div>
                            <label class="section-label">
                                Subcategory
                            </label>
                        </div>
                        <div class="card" style="height: 470px;">
                            <div class="card-body overflow-auto">
                                <div class="row">
                                    <div class="col-xl-12">
                                        <ChartDailySubcategory :dataActivityGraph="Data.DailySubcategory.chart"
                                            :display="Data.DailySubcategory.display">
                                        </ChartDailySubcategory>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3" id="Channel">
                    <div class="card-base">
                        <div>
                            <label class="section-label">
                                Channel
                            </label>
                        </div>
                        <div class="card" style="height: 470px;">
                            <div class="card-body overflow-auto">

                                <div v-if="NoData.Channel">
                                    <div class="row text-center" style="margin-top: 100px;">
                                        <div class="col-xl-12 d-flex justify-content-center">
                                            <img src="/icon/not-found/not-found-v1.svg" class="50" alt="Data not found">
                                        </div>
                                        <div class="col-xl-12">
                                            <label style="font-size: 16px; margin-top: 1rem;">
                                                Tidak Ada Data Ditemukan
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="Loader.Channel">
                                    <div class="mb-4 d-flex justify-content-center">
                                        <b-skeleton type="avatar" width="10.5rem" height="10.5rem"></b-skeleton>
                                    </div>
                                    <div class="row section-channel" v-for="(item, index) of new Array(6)" :key="index">
                                        <div class="col-lg-6">
                                            <b-skeleton width="6rem"></b-skeleton>
                                        </div>
                                        <div class="col-lg-6">
                                            <b-skeleton width="1.5rem" class="float-right"></b-skeleton>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="!Loader.Channel && !NoData.Channel">
                                    <div class="row section-row">
                                        <div class="col-xl-12 section-chart-channel">
                                            <div class="mb-4 position-relative">
                                                <ChartChannel :dataActivityGraph="Data.Channel.chart"
                                                    :cutoutPercentage="Data.Channel.cutoutPercentage">
                                                </ChartChannel>
                                                <div class="text-percentage-chart">
                                                    <p class="label-channel">
                                                        Total Tiket
                                                    </p>
                                                    <p class="value-channel">
                                                        {{ Data.Channel.TotalTicket || '0' }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-12 section-chart-chart">
                                            <div class="row section-channel" v-for="(item, index) of Data.Channel.data"
                                                :key="index">
                                                <div class="col-xl-9 align-self-center">
                                                    <i class="fas fa-circle channel-dot"
                                                        :class="'channel-' + item.origin"></i>
                                                    <label class="channel">
                                                        {{ item.origin }}
                                                    </label>
                                                </div>
                                                <div class="col-xl-3 align-self-center d-flex justify-content-end">
                                                    <label class="value">
                                                        {{ item.count || '0' }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row d-none">
                                        <div class="col-xl-12 d-flex justify-content-center my-4">
                                            <nuxt-link to="/profile/service-operation/top-category"
                                                class="btn btn-dsa-outline-primary" style="border-radius: 100px;">
                                                <span class="font-size-14 font-weight-600">
                                                    Lihat Detail
                                                </span>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-5" id="CategoryXStatus">
                    <div class="card-base">
                        <div>
                            <label class="section-label">
                                Category X Status
                            </label>
                        </div>
                        <div class="card" style="height: 470px;">
                            <div class="card-body overflow-auto">

                                <div v-if="NoData.CategoryXStatus">
                                    <div class="row text-center" style="margin-top: 100px;">
                                        <div class="col-xl-12 d-flex justify-content-center">
                                            <img src="/icon/not-found/not-found-v1.svg" class="50" alt="Data not found">
                                        </div>
                                        <div class="col-xl-12">
                                            <label style="font-size: 16px; margin-top: 1rem;">
                                                Tidak Ada Data Ditemukan
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="Loader.CategoryXStatus">
                                    <b-skeleton width="100%" height="20rem"></b-skeleton>
                                    <div>
                                        <div class="row">
                                            <div class="col-xl-2 align-self-center ml-3 mt-3"
                                                v-for="(item, index) of new Array(10)" :key="index">
                                                <b-skeleton width="100%"></b-skeleton>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="!Loader.CategoryXStatus && !NoData.CategoryXStatus">
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <ChartCategoryXStatus :dataActivityGraph="Data.CategoryXStatus.chart">
                                            </ChartCategoryXStatus>
                                        </div>
                                    </div>
                                    <div class="d-xl-none">
                                        <div class="row label-category-x-status">
                                            <div class="align-self-center ml-3 mt-3"
                                                v-for="(item, index) of Data.CategoryXStatus.data" :key="index">
                                                <i class="fas fa-circle channel-dot"
                                                    :class="'category-index-' + index"></i>
                                                <label class="channel">
                                                    {{ item.label }}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4" id="TopCategory">
                    <div class="card-base">
                        <div>
                            <label class="section-label">
                                5 Top Category
                            </label>
                        </div>
                        <div class="card" style="height: 470px;">
                            <div class="card-body overflow-auto">

                                <div v-if="NoData.TopCategory">
                                    <div class="row text-center" style="margin-top: 100px;">
                                        <div class="col-xl-12 d-flex justify-content-center">
                                            <img src="/icon/not-found/not-found-v1.svg" class="50" alt="Data not found">
                                        </div>
                                        <div class="col-xl-12">
                                            <label style="font-size: 16px; margin-top: 1rem;">
                                                Tidak Ada Data Ditemukan
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="Loader.TopCategory">
                                    <div class="category" v-for="(item, index) of new Array(6)" :key="index">
                                        <div class="row">
                                            <div class="col-lg-6 d-flex justify-content-start">
                                                <b-skeleton width="10rem"></b-skeleton>
                                            </div>
                                            <div class="col-lg-6 d-flex justify-content-end">
                                                <b-skeleton width="3rem"></b-skeleton>
                                            </div>
                                        </div>
                                        <div class="progress">
                                            <b-skeleton width="100%" height="100%"></b-skeleton>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="!Loader.TopCategory && !NoData.TopCategory">
                                    <div class="category" v-for="(item, index) of Data.TopCategory.data" :key="index">
                                        <div class="row">
                                            <div class="col-lg-6 d-flex justify-content-start">
                                                <label class="label-category">
                                                    {{ item.category }}
                                                </label>
                                            </div>
                                            <div class="col-lg-6 d-flex justify-content-end">
                                                <label class="value-category">
                                                    {{ item.count }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar"
                                                :class="'progress-category-index-' + index"
                                                :style="`width: ${item.count}%`" :aria-valuenow="40" aria-valuemin="0"
                                                aria-valuemax="1000000000000000">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row d-none">
                                        <div class="col-xl-12 d-flex justify-content-center mt-4">
                                            <nuxt-link to="/profile/service-operation/top-category"
                                                class="btn btn-dsa-outline-primary" style="border-radius: 100px;">
                                                <span class="font-size-14 font-weight-600">
                                                    Lihat Detail
                                                </span>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-12" id="DetailChannel">
                    <div class="card-base">
                        <div>
                            <label class="section-label">
                                Detail Channel
                            </label>
                        </div>
                        <div class="row">
                            <div class="col-xl-3" style="padding-bottom: 24px;"
                                v-for="(item, index) of Data.DetailChannel.data" :key="index">
                                <div class="card">
                                    <div class="card-body overflow-auto">
                                        <label class="" :class="item.class">
                                            {{ item.label }}
                                        </label>
                                        <div class="row">
                                            <div class="col-lg-6 col-sm-6">
                                                <label class="open-value">
                                                    {{ item.product.not_closed || '0' }}
                                                </label>
                                            </div>
                                            <div class="col-lg-6 col-sm-6">
                                                <label class="closed-value">
                                                    {{ item.product.closed || '0' }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-sm-6">
                                                <em class="fa fa-arrow-up mr-1"></em>
                                                <label class="open-label">Open</label>
                                            </div>
                                            <div class="col-lg-6 col-sm-6">
                                                <em class="fa fa-arrow-down mr-1"></em>
                                                <label class="closed-label">Closed</label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 d-flex justify-content-center mt-4">
                                                <nuxt-link to="/profile/service-operation/top-category"
                                                    class="btn btn-dsa-outline-primary" style="border-radius: 100px;">
                                                    <span class="font-size-14 font-weight-600">
                                                        Lihat Detail
                                                    </span>
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
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';
    import {
        LIST_PRODUCT_INTEGRATION
    } from '@/static/config/constant.js';

    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    import moment from 'moment';

    export default {
        layout: 'portal/ServiceOperation',
        mixins: [mixins],
        components: {
            'DatePicker': DatePicker,
        },
        data() {
            return {
                Data: {
                    DateRange: null,
                    DailySubcategory: {
                        data: [],
                        chart: null,
                        display: false
                    },
                    TopCategory: {
                        data: [],
                        chart: null
                    },
                    Channel: {
                        data: [],
                        chart: null,
                        TotalTicket: null,
                        cutoutPercentage: 0
                    },
                    CategoryXStatus: {
                        data: [],
                        chart: null
                    },
                    DetailChannel: {
                        data: [],
                        Email: {
                            not_closed: null,
                            closed: null
                        },
                        Phone: {
                            not_closed: null,
                            closed: null
                        },
                        WhatsApp: {
                            not_closed: null,
                            closed: null
                        },
                        Twitter: {
                            not_closed: null,
                            closed: null
                        },
                        Instagram: {
                            not_closed: null,
                            closed: null
                        },
                        Facebook: {
                            not_closed: null,
                            closed: null
                        },
                        Telegram: {
                            not_closed: null,
                            closed: null
                        },
                        App: {
                            not_closed: null,
                            closed: null
                        },
                        LiveChat: {
                            not_closed: null,
                            closed: null
                        },
                        Other: {
                            not_closed: null,
                            closed: null
                        },
                    },
                    Product: {
                        data: []
                    },
                    Dummy: {
                        Product: LIST_PRODUCT_INTEGRATION
                    }
                },
                Loader: {
                    DailySubcategory: false,
                    Channel: false,
                    CategoryXStatus: false,
                    TopCategory: false,
                    DetailChannel: false,
                },
                NoData: {
                    DailySubcategory: false,
                    Channel: false,
                    CategoryXStatus: false,
                    TopCategory: false,
                    DetailChannel: false,
                },
                Filter: {
                    Product: {
                        product: 'GAMEQOO',
                    },
                    Date: {
                        date_from: null,
                        date_to: null
                    }
                },
                ShortcutsDate: [{
                        text: 'Semua',
                        onClick() {
                            return [null, null];
                        }
                    },
                    {
                        text: 'Hari ini',
                        onClick() {
                            const firstHourOfThisDay = new Date();
                            const lastHourOfThisDay = new Date();

                            firstHourOfThisDay.setHours(0, 0, 0, 0);
                            lastHourOfThisDay.setHours(23, 59, 59, 59);

                            firstHourOfThisDay.setHours(firstHourOfThisDay.getHours() + 7);
                            lastHourOfThisDay.setHours(lastHourOfThisDay.getHours() + 7);

                            return [firstHourOfThisDay, lastHourOfThisDay];
                        }
                    },
                    {
                        text: 'Kemarin',
                        onClick() {
                            const firstHourOfYesterday = new Date();
                            const lastHourOfYesterday = new Date();

                            firstHourOfYesterday.setTime(firstHourOfYesterday.getTime() - 3600 * 1000 * 24);
                            lastHourOfYesterday.setTime(lastHourOfYesterday.getTime() - 3600 * 1000 * 24);

                            firstHourOfYesterday.setHours(0, 0, 0, 0);
                            lastHourOfYesterday.setHours(23, 59, 59, 59);

                            firstHourOfYesterday.setHours(firstHourOfYesterday.getHours() + 7);
                            lastHourOfYesterday.setHours(lastHourOfYesterday.getHours() + 7);

                            return [firstHourOfYesterday, lastHourOfYesterday];
                        }
                    },
                    {
                        text: 'Minggu ini',
                        onClick() {
                            const date = new Date;

                            const first = date.getDate() - date.getDay() + 1;
                            const last = first + 6;

                            const firstDayOfThisWeek = new Date(date.setDate(first));
                            const lastDayOfThisWeek = new Date(date.setDate(last));

                            firstDayOfThisWeek.setHours(0, 0, 0, 0);
                            lastDayOfThisWeek.setHours(23, 59, 59, 59);

                            firstDayOfThisWeek.setHours(firstDayOfThisWeek.getHours() + 7);
                            lastDayOfThisWeek.setHours(lastDayOfThisWeek.getHours() + 7);

                            return [firstDayOfThisWeek, lastDayOfThisWeek];
                        }
                    },
                    {
                        text: 'Minggu lalu',
                        onClick() {
                            const date = new Date;

                            const first = date.getDate() - date.getDay() - 6;
                            const last = first + 6;

                            const firstDayOfLastWeek = new Date(date.setDate(first));
                            const lastDayOfLastWeek = new Date(date.setDate(last));

                            firstDayOfLastWeek.setHours(0, 0, 0, 0);
                            lastDayOfLastWeek.setHours(23, 59, 59, 59);

                            firstDayOfLastWeek.setHours(firstDayOfLastWeek.getHours() + 7);
                            lastDayOfLastWeek.setHours(lastDayOfLastWeek.getHours() + 7);

                            return [firstDayOfLastWeek, lastDayOfLastWeek];
                        }
                    },
                    {
                        text: 'Bulan ini',
                        onClick() {
                            const date = new Date();

                            const firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                            const lastDayOfThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                            firstDayOfThisMonth.setHours(0, 0, 0, 0);
                            lastDayOfThisMonth.setHours(23, 59, 59, 59);

                            firstDayOfThisMonth.setHours(firstDayOfThisMonth.getHours() + 7);
                            lastDayOfThisMonth.setHours(lastDayOfThisMonth.getHours() + 7);

                            return [firstDayOfThisMonth, lastDayOfThisMonth];
                        }
                    },
                    {
                        text: 'Bulan lalu',
                        onClick() {
                            const date = new Date();

                            const firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
                            const lastDayOfLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);

                            firstDayOfLastMonth.setHours(0, 0, 0, 0);
                            lastDayOfLastMonth.setHours(23, 59, 59, 59);

                            firstDayOfLastMonth.setHours(firstDayOfLastMonth.getHours() + 7);
                            lastDayOfLastMonth.setHours(lastDayOfLastMonth.getHours() + 7);

                            return [firstDayOfLastMonth, lastDayOfLastMonth];
                        }
                    },
                    {
                        text: 'NARU',
                        onClick() {
                            const date = new Date();

                            const firstDayOfNARU = new Date(`November 22, ${date.getFullYear()} 00:00:00`);
                            const lastDayOfNARU = new Date(`January 05, ${date.getFullYear() + 1} 23:59:59`);

                            firstDayOfNARU.setHours(0, 0, 0, 0);
                            lastDayOfNARU.setHours(23, 59, 59, 59);

                            firstDayOfNARU.setHours(firstDayOfNARU.getHours() + 7);
                            lastDayOfNARU.setHours(lastDayOfNARU.getHours() + 7);

                            return [firstDayOfNARU, lastDayOfNARU];
                        }
                    }
                ],
            }
        },
        watch: {

        },
        mounted() {
            this.Init();
            this.ResponsiveView();
        },
        methods: {
            Init() {
                this.Data.Product.data = this.Data.Dummy.Product;
                this.Filter.Product.product = this.Data.Dummy.Product[1].appName;

                this.InitFunction();
            },
            InitFunction() {
                // this.GetDailySubcategory();
                this.GetChannel();
                this.GetTopCategory();
                this.GetCategoryXStatus();
                this.GetDetailChannel();
            },
            async GetDailySubcategory() {
                this.Loader.DailySubcategory = true;
                this.NoData.DailySubcategory = false;

                let params = {
                    product: this.Filter.Product.product,
                    date_from: this.Filter.Date.date_from,
                    date_to: this.Filter.Date.date_to
                };

                await this.HelperServiceOperation('POST', '/api/v2/salesforce/total-category-status-playstore',
                    params, null, null, (
                        callback) => {
                        if (callback.code === 200 && callback.totalItems !== 0) {
                            this.Loader.DailySubcategory = false;
                            this.FillChartDailySubcategory(callback);
                        } else {
                            this.Loader.DailySubcategory = false;
                            this.NoData.DailySubcategory = true;
                        };
                    });

            },
            FillChartDailySubcategory(callback) {
                var c = document.getElementById('horizontalbar-chart').getContext('2d');
                var gradient = c.createLinearGradient(600, 0, 200, 0);
                gradient.addColorStop(0, '#FF6121');
                gradient.addColorStop(1, '#D7281E');

                callback.content.datasets[0].backgroundColor = gradient;
                callback.content.datasets[0].borderColor = gradient;
                this.Data.DailySubcategory.chart = callback.content;
            },

            async GetChannel() {
                this.Loader.Channel = true;
                this.NoData.Channel = false;

                let params = {
                    app: this.Filter.Product.product,
                    dateFrom: this.Filter.Date.date_from,
                    dateTo: this.Filter.Date.date_to
                };

                await this.HelperServiceOperation('GET', '/query/ticket-channel-summary', params, null, null, (
                    callback) => {
                    if (callback.code === 200 && callback.content.data.length !== 0) {
                        this.Loader.Channel = false;
                        this.Data.Channel.data = callback.content.data;
                        this.FillChartChannel(callback);
                    } else {
                        this.Loader.Channel = false;
                        this.NoData.Channel = true;
                    };
                });
            },
            FillChartChannel(callback) {
                // find if have origin
                const findEmail = callback.content.data.find(x => {
                    return x.channel === 'EMAIL';
                });
                const findPhone = callback.content.data.find(x => {
                    return x.channel === 'PHONE';
                });
                const findWhatsApp = callback.content.data.find(x => {
                    return x.channel === 'WHATSAPP';
                });
                const findTwitter = callback.content.data.find(x => {
                    return x.channel === 'TWITTER';
                });
                const findInstagram = callback.content.data.find(x => {
                    return x.channel === 'INSTAGRAM';
                });
                const findFacebook = callback.content.data.find(x => {
                    return x.channel === 'FB';
                });
                const findTelegram = callback.content.data.find(x => {
                    return x.channel === 'TELEGRAM';
                });
                const findApp = callback.content.data.find(x => {
                    return x.channel === 'APP';
                });
                const findLiveChat = callback.content.data.find(x => {
                    return x.channel === 'LIVE_CHAT';
                });
                const findOther = callback.content.data.find(x => {
                    return x.channel === 'OTHER';
                });
                // find if have origin

                // handle if have or not
                const Email = findEmail !== undefined ? findEmail.count : 0;
                const Phone = findPhone !== undefined ? findPhone.count : 0;
                const WhatsApp = findWhatsApp !== undefined ? findWhatsApp.count : 0;
                const Twitter = findTwitter !== undefined ? findTwitter.count : 0;
                const Instagram = findInstagram !== undefined ? findInstagram.count : 0;
                const Facebook = findFacebook !== undefined ? findFacebook.count : 0;
                const Telegram = findTelegram !== undefined ? findTelegram.count : 0;
                const App = findApp !== undefined ? findApp.count : 0;
                const LiveChat = findLiveChat !== undefined ? findLiveChat.count : 0;
                const Other = findOther !== undefined ? findOther.count : 0;
                // handle if have or not

                // count ticket
                this.Data.Channel.TotalTicket = null;
                let objTotal = {
                    Email: Email,
                    Phone: Phone,
                    WhatsApp: WhatsApp,
                    Twitter: Twitter,
                    Instagram: Instagram,
                    Facebook: Facebook,
                    Telegram: Telegram,
                    App: App,
                    LiveChat: LiveChat,
                    Other: Other
                };
                this.Data.Channel.TotalTicket = this.HelperSUM(objTotal);
                // count ticket

                this.Data.Channel.chart = {
                    labels: [
                        'Email', 'Phone', 'WhatsApp', 'Twitter', 'Instagram', 'Facebook', 'Telegram', 'App',
                        'Live Chat', 'Other'
                    ],
                    datasets: [{
                        backgroundColor: [
                            '#FF464C',
                            '#DC807E',
                            '#81BD60',
                            '#2F95F5',
                            '#D63699',
                            '#676DDC',
                            '#2F95F5',
                            '#EA90E9',
                            '#F2A94B',
                            '#3B3D39',
                        ],
                        data: [
                            Email,
                            Phone,
                            WhatsApp,
                            Twitter,
                            Instagram,
                            Facebook,
                            Telegram,
                            App,
                            LiveChat,
                            Other
                        ],
                        labels: [
                            'Email', 'Phone', 'WhatsApp', 'Twitter', 'Instagram', 'Facebook',
                            'Telegram', 'App', 'Live Chat', 'Other'
                        ],
                    }]
                };
            },
            async GetCategoryXStatus() {
                this.Loader.CategoryXStatus = true;
                this.NoData.CategoryXStatus = false;

                let params = {
                    app: this.Filter.Product.product,
                    dateFrom: this.Filter.Date.date_from,
                    dateTo: this.Filter.Date.date_to
                };
                await this.HelperServiceOperation('GET', '/query/ticket-category-status', params, null,
                    null, (
                        callback) => {
                        if (callback.code === 200 && callback.content.data.datasets.length !== 0) {
                            this.Loader.CategoryXStatus = false;
                            this.Data.CategoryXStatus.data = callback.content.data.datasets;
                            this.FillChartCategoryXStatus(callback);
                        } else {
                            this.Loader.CategoryXStatus = false;
                            this.NoData.CategoryXStatus = true;
                        };
                    });
            },
            FillChartCategoryXStatus(callback) {
                const coolors = ['#BBBAFE', '#EA90E9', '#FE6965', '#3B3D39', '#9DD7FB', '#FCCE8A', '#F3A086', '#7590ED',
                    '#BBBAFE', '#EA90E9', '#FE6965'
                ];

                const obj = callback.content.data.datasets;
                obj.map((x, index) => {
                    x.backgroundColor = coolors[index];
                    x.borderColor = coolors[index];
                });

                this.Data.CategoryXStatus.chart = {
                    labels: callback.content.data.labels,
                    datasets: obj
                };
            },
            async GetTopCategory() {
                this.Loader.TopCategory = true;
                this.NoData.TopCategory = false;

                let params = {
                    app: this.Filter.Product.product,
                    dateFrom: this.Filter.Date.date_from,
                    dateTo: this.Filter.Date.date_to,
                    top: '5'
                };
                await this.HelperServiceOperation('GET', '/query/ticket', params, null, null,
                    (
                        callback) => {
                        if (callback.code === 200 && callback.content.data.length !== 0) {
                            this.Loader.TopCategory = false;
                            this.Data.TopCategory.data = callback.content.data;
                        } else {
                            this.Loader.TopCategory = false;
                            this.NoData.TopCategory = true;
                        };
                    });
            },


            async HelperGetDetailChannel(origin, status, returnCallback) {
                this.Loader.DetailChannel = true;

                let params = {
                    app: this.Filter.Product.product,
                    dateFrom: this.Filter.Date.date_from,
                    dateTo: this.Filter.Date.date_to,
                    status: status,
                    channel: origin
                };

                await this.HelperServiceOperation('GET', '/query/ticket-total-origin', params, null, null, (
                    callback) => {
                    if (callback.code === 200) {
                        this.Loader.DetailChannel = false;
                        return returnCallback(callback);
                    } else {
                        this.Loader.DetailChannel = false;
                    };
                });
            },
            GetDetailChannel() {
                this.Data.DetailChannel.Email.not_closed = null;
                this.Data.DetailChannel.Email.closed = null;
                this.Data.DetailChannel.Phone.not_closed = null;
                this.Data.DetailChannel.Phone.closed = null;
                this.Data.DetailChannel.WhatsApp.not_closed = null;
                this.Data.DetailChannel.WhatsApp.closed = null;
                this.Data.DetailChannel.Twitter.not_closed = null;
                this.Data.DetailChannel.Twitter.closed = null;
                this.Data.DetailChannel.Instagram.not_closed = null;
                this.Data.DetailChannel.Instagram.closed = null;
                this.Data.DetailChannel.Facebook.not_closed = null;
                this.Data.DetailChannel.Facebook.closed = null;
                this.Data.DetailChannel.Telegram.not_closed = null;
                this.Data.DetailChannel.Telegram.closed = null;
                this.Data.DetailChannel.App.not_closed = null;
                this.Data.DetailChannel.App.closed = null;
                this.Data.DetailChannel.LiveChat.not_closed = null;
                this.Data.DetailChannel.LiveChat.closed = null;
                this.Data.DetailChannel.Other.not_closed = null;
                this.Data.DetailChannel.Other.closed = null;


                // Email
                this.HelperGetDetailChannel('EMAIL', 'NOT CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Email.not_closed = this.HelperKFormater(x.count);
                    });
                });

                this.HelperGetDetailChannel('EMAIL', 'CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Email.closed = this.HelperKFormater(x.count);
                    });
                });
                // Email

                // Phone
                this.HelperGetDetailChannel('PHONE', 'NOT CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Phone.not_closed = this.HelperKFormater(x.count);
                    });
                });

                this.HelperGetDetailChannel('PHONE', 'CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Phone.closed = this.HelperKFormater(x.count);
                    });
                });
                // Phone

                // WhatsApp
                this.HelperGetDetailChannel('WHATSAPP', 'NOT CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.WhatsApp.not_closed = this.HelperKFormater(x.count);
                    });
                });

                this.HelperGetDetailChannel('WHATSAPP', 'CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.WhatsApp.closed = this.HelperKFormater(x.count);
                    });
                });
                // WhatsApp

                // Twitter
                this.HelperGetDetailChannel('TWITTER', 'NOT CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Twitter.not_closed = this.HelperKFormater(x.count);
                    });
                });

                this.HelperGetDetailChannel('TWITTER', 'CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Twitter.closed = this.HelperKFormater(x.count);
                    });
                });
                // Twitter

                // Instagram
                this.HelperGetDetailChannel('INSTAGRAM', 'NOT CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Instagram.not_closed = this.HelperKFormater(x.count);
                    });
                });

                this.HelperGetDetailChannel('INSTAGRAM', 'CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Instagram.closed = this.HelperKFormater(x.count);
                    });
                });
                // Instagram

                // Facebook
                this.HelperGetDetailChannel('FB', 'NOT CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Facebook.not_closed = this.HelperKFormater(x.count);
                    });
                });

                this.HelperGetDetailChannel('FB', 'CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Facebook.closed = this.HelperKFormater(x.count);
                    });
                });
                // Facebook

                // Telegram
                this.HelperGetDetailChannel('TELEGRAM', 'NOT CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Telegram.not_closed = this.HelperKFormater(x.count);
                    });
                });

                this.HelperGetDetailChannel('TELEGRAM', 'CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Telegram.closed = this.HelperKFormater(x.count);
                    });
                });
                // Telegram

                // App
                this.HelperGetDetailChannel('APP', 'NOT CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.App.not_closed = this.HelperKFormater(x.count);
                    });
                });

                this.HelperGetDetailChannel('APP', 'CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.App.closed = this.HelperKFormater(x.count);
                    });
                });
                // App

                // Live Chat
                this.HelperGetDetailChannel('LIVE_CHAT', 'NOT CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.LiveChat.not_closed = this.HelperKFormater(x.count);
                    });
                });

                this.HelperGetDetailChannel('LIVE_CHAT', 'CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.LiveChat.closed = this.HelperKFormater(x.count);
                    });
                });
                // Live Chat

                // Other
                this.HelperGetDetailChannel('OTHER', 'NOT CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Other.not_closed = this.HelperKFormater(x.count);
                    });
                });

                this.HelperGetDetailChannel('OTHER', 'CLOSED', (callback) => {
                    callback.content.data.map(x => {
                        this.Data.DetailChannel.Other.closed = this.HelperKFormater(x.count);
                    });
                });
                // Other

                this.Data.DetailChannel.data = [];
                this.Data.DetailChannel.data = [{
                        product: this.Data.DetailChannel.Email,
                        label: 'Email',
                        channel: 'EMAIL',
                        class: 'email'
                    },
                    {
                        product: this.Data.DetailChannel.Phone,
                        label: 'Phone',
                        channel: 'PHONE',
                        class: 'phone'
                    },
                    {
                        product: this.Data.DetailChannel.WhatsApp,
                        label: 'WhatsApp',
                        channel: 'WHATSAPP',
                        class: 'whatsapp'
                    },
                    {
                        product: this.Data.DetailChannel.Twitter,
                        label: 'Twitter',
                        channel: 'TWITTER',
                        class: 'twitter'
                    },
                    {
                        product: this.Data.DetailChannel.Instagram,
                        label: 'Instagram',
                        channel: 'INSTAGRAM',
                        class: 'instagram'
                    },
                    {
                        product: this.Data.DetailChannel.Facebook,
                        label: 'Facebook',
                        channel: 'FB',
                        class: 'facebook'
                    },
                    {
                        product: this.Data.DetailChannel.Telegram,
                        label: 'Telegram',
                        channel: 'TELEGRAM',
                        class: 'telegram'
                    },
                    {
                        product: this.Data.DetailChannel.App,
                        label: 'App',
                        channel: 'APP',
                        class: 'app'
                    },
                    {
                        product: this.Data.DetailChannel.LiveChat,
                        label: 'LiveChat',
                        channel: 'LIVE_CHAT',
                        class: 'livechat'
                    },
                    {
                        product: this.Data.DetailChannel.Other,
                        label: 'Other',
                        channel: 'OTHER',
                        class: 'other'
                    }
                ];
            },
            ChangeDateRange() {
                if (this.Data.DateRange !== null) {
                    this.Filter.Date.date_from = moment(String(this.Data.DateRange[0])).format('YYYY-MM-DD');
                    this.Filter.Date.date_to = moment(String(this.Data.DateRange[1])).format('YYYY-MM-DD');
                };
                this.InitFunction();

            },
            ChangeProduct() {
                this.InitFunction();
            },

            ResponsiveView() {
                let getWidthDevice = $(window).width();

                // Channel
                if (getWidthDevice > 1440) {
                    this.Data.Channel.cutoutPercentage = 90;

                    this.Data.DailySubcategory.display = false;
                } else {
                    this.Data.Channel.cutoutPercentage = 85;

                    this.Data.DailySubcategory.display = true;
                };

            },


        }
    }

</script>

<style scoped>
    /* Channel */

    #Channel .card-body /deep/ canvas#doughnut-chart {
        width: auto !important;
        height: 162px !important;
    }


    /* for centering text in chart */
    #Channel .text-percentage-chart {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    #Channel .label-channel {
        font-weight: normal;
        font-size: 14px;
        color: #7F8C93;

        margin-bottom: 3px !important;
    }

    #Channel .value-channel {
        font-weight: 600;
        font-size: 24px;
        color: #3B3D39;

        margin-bottom: 0 !important;
    }

    /* for centering text in chart */
    #Channel div.card div.card-body i {
        font-size: 11px;

        margin-right: 10px;
    }

    #Channel div.card div.card-body label {
        font-weight: normal;
        font-size: 14px;
        margin-bottom: 0 !important;
    }

    #Channel div.card div.card-body label.channel {
        color: #000000;
    }

    #Channel div.card div.card-body label.value {
        color: #7F8C93;
    }

    #Channel div.card div.card-body .section-channel {
        margin-bottom: 16px;
    }

    #Channel .channel-dot {
        font-size: 9px !important;
        margin-right: 0.3rem !important;
    }

    #Channel .channel-Email {
        color: #FF464C;
    }

    #Channel .channel-Phone {
        color: #DC807E;
    }

    #Channel .channel-WhatsApp {
        color: #81BD60;
    }

    #Channel .channel-Twitter {
        color: #2F95F5;
    }

    #Channel .channel-Instagram {
        color: #D63699;
    }

    #Channel .channel-Facebook {
        color: #676DDC;
    }

    #Channel .channel-Telegram {
        color: #2F95F5;
    }

    #Channel .channel-App {
        color: #EA90E9;
    }

    #Channel .channel-LiveChat {
        color: #F2A94B;
    }

    #Channel .channel-OTHER {
        color: #3B3D39;
    }


    /* Channel */



    /* 5 Top Category */
    #TopCategory .category {
        margin-bottom: 28px !important;
    }

    #TopCategory .category .progress {
        margin-top: 16px !important;
        height: 6px !important;
    }

    #TopCategory .category .label-category {
        font-weight: 600;
        font-size: 14px;
        color: #3B3D39;

        margin-bottom: 0 !important;
    }

    #TopCategory .category .value-category {
        font-weight: normal;
        font-size: 14px;
        color: #7F8C93;

        margin-bottom: 0 !important;
    }

    #TopCategory .category .progress-category-index-0 {
        background: linear-gradient(90.01deg, #BBBAFE 0%, #D9D9FF 99.99%) !important;
    }

    #TopCategory .category .progress-category-index-1 {
        background: linear-gradient(90.01deg, #EA90E9 0%, #FFD2EA 99.99%) !important;
    }

    #TopCategory .category .progress-category-index-2 {
        background: linear-gradient(90.01deg, #9DD7FB 0%, #CAE5FE 99.99%) !important;
    }

    #TopCategory .category .progress-category-index-3 {
        background: linear-gradient(90.01deg, #FCCE8A 0%, #FCCF8D 27.6%, #FFF3E4 99.99%) !important;
    }

    #TopCategory .category .progress-category-index-4 {
        background: linear-gradient(90.01deg, #7590ED 0%, #C4C3FE 99.99%) !important;
    }


    /* ini yang dirubah nnti minta dulu ke tim UI untuk warna nya */
    #TopCategory .category .progress-category-index-5 {
        background: linear-gradient(90.01deg, #BBBAFE 0%, #D9D9FF 99.99%) !important;
    }

    #TopCategory .category .progress-category-index-6 {
        background: linear-gradient(90.01deg, #EA90E9 0%, #FFD2EA 99.99%) !important;
    }

    #TopCategory .category .progress-category-index-7 {
        background: linear-gradient(90.01deg, #9DD7FB 0%, #CAE5FE 99.99%) !important;
    }

    #TopCategory .category .progress-category-index-8 {
        background: linear-gradient(90.01deg, #FCCE8A 0%, #FCCF8D 27.6%, #FFF3E4 99.99%) !important;
    }

    #TopCategory .category .progress-category-index-9 {
        background: linear-gradient(90.01deg, #7590ED 0%, #C4C3FE 99.99%) !important;
    }

    /* 5 Top Category */






    /* Detail Channel */
    #DetailChannel .open-value,
    #DetailChannel .closed-value {
        font-weight: 600 !important;
        font-size: 24px !important;
        color: #3B3D39 !important;
    }

    #DetailChannel .open-label,
    #DetailChannel .closed-label {
        font-weight: normal !important;
        font-size: 16px !important;
    }

    #DetailChannel .open-label,
    #DetailChannel .fa-arrow-up {
        color: #ED2B24 !important;
    }

    #DetailChannel .closed-label,
    #DetailChannel .fa-arrow-down {
        color: #20AE50 !important;
    }

    #DetailChannel .email,
    #DetailChannel .phone,
    #DetailChannel .whatsapp,
    #DetailChannel .twitter,
    #DetailChannel .instgram,
    #DetailChannel .facebook,
    #DetailChannel .telegram,
    #DetailChannel .app,
    #DetailChannel .livechat,
    #DetailChannel .other {
        font-weight: 600 !important;
        font-size: 16px !important;
    }

    #DetailChannel .email {
        color: #FF464C;
    }

    #DetailChannel .phone {
        color: #DC807E;
    }

    #DetailChannel .whatsapp {
        color: #81BD60;
    }

    #DetailChannel .twitter {
        color: #2F95F5;
    }

    #DetailChannel .instagram {
        color: #D63699;
    }

    #DetailChannel .facebook {
        color: #676DDC;
    }

    #DetailChannel .telegram {
        color: #2F95F5;
    }

    #DetailChannel .app {
        color: #EA90E9;
    }

    #DetailChannel .livechat {
        color: #F2A94B;
    }

    #DetailChannel .other {
        color: #3B3D39;
    }

    /* Detail Channel */


    /* Category x Status */

    #CategoryXStatus div.card div.card-body label {
        font-weight: normal;
        font-size: 14px;
        margin-bottom: 0 !important;
    }

    #CategoryXStatus div.card div.card-body label.channel {
        color: #000000;
    }

    #CategoryXStatus .category-index-0 {
        color: #BBBAFE;
    }

    #CategoryXStatus .category-index-1 {
        color: #EA90E9;
    }

    #CategoryXStatus .category-index-2 {
        color: #FE6965;
    }

    #CategoryXStatus .category-index-3 {
        color: #3B3D39;
    }

    #CategoryXStatus .category-index-4 {
        color: #9DD7FB;
    }

    #CategoryXStatus .category-index-5 {
        color: #FCCE8A;
    }

    #CategoryXStatus .category-index-6 {
        color: #F3A086;
    }

    #CategoryXStatus .category-index-7 {
        color: #7590ED;
    }

    /* ini yang dirubah nnti minta dulu ke tim UI untuk warna nya */
    #CategoryXStatus .category-index-8 {
        color: #BBBAFE;
    }

    #CategoryXStatus .category-index-9 {
        color: #EA90E9;
    }

    #CategoryXStatus .category-index-10 {
        color: #FE6965;
    }

    /* Category x Status */


    .loader {
        /* display: none; */

        overflow: unset !important;
    }


    /* Date Picker */
    .date-picker /deep/ .mx-datepicker-range {
        width: 230px !important;
    }

    .date-picker /deep/ input {
        border: 1px solid #F4F4F4 !important;
        border-radius: 4px !important;
        height: 40px !important;
    }

    /* Date Picker */

    /* Profile Header */
    .profile-header-redesign .nav-item.dropdown .dropdown-toggle::after {
        transform: rotate(90deg) !important;
        color: #656664 !important;
        margin-top: 7px;
        margin-left: 15px;

    }

    .profile-header-redesign .nav-item.dropdown.show .dropdown-toggle::after {
        transform: rotate(180deg) !important;
    }

    .profile-header-redesign .nav-item.dropdown.show .dropdown-toggle::after,
    .profile-header-redesign .nav-item.dropdown.show .dropdown-toggle::after {
        content: '\f107';
    }

    .profile-header-redesign .nav-item.dropdown .dropdown-toggle::after,
    .profile-header-redesign .nav-item.dropdown .dropdown-toggle::after {
        width: 1rem;
        text-align: center;
        float: right;
        vertical-align: 0;
        border: 0;
        font-weight: 900;
        content: '\f105';
        font-family: 'Font Awesome 5 Free';
    }

    /* Profile Header */

</style>
