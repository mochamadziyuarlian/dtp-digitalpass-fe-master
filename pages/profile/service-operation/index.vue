<template>
    <div class="container-fluid">
        <div class="row mb-4">
            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <p class="font-size-24 font-weight-bold mb-0" style="color: #3B3D39;">Service Operation</p>
                <p class="font-size-24 font-weight-bold mb-0" style="color: #3B3D39;">{{ Filter.topCategory }}</p>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <date-picker type="date" v-model="DateRange" range :shortcuts="shortcuts" placeholder="Filter date by">
                </date-picker>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                <select class="form-control" v-model="Filter.topCategory">
                    <option value="null" disabled hidden>Filter produk</option>
                    <option v-for="(item, index) of Select.product" :key="index" :value="item">
                        {{ item }}
                    </option>
                </select>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 d-flex">
                <div class="ml-2">
                    <button class="btn btn-dsa-primary font-size-14 font-weight-600" @click="GenerateReport()">
                        <em class="fa fa-long-arrow-alt-down"></em> Ekspor laporan
                    </button>
                </div>
                <div class="ml-2">
                    <button class="btn btn-dsa-primary font-size-13" @click="callAllFuntion()">
                        <em class="fa fa-sync"></em>
                    </button>
                </div>
            </div>
        </div>

        <div class="row mb-4">
            <!-- Daily Subcategory -->
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div class="card category-x-status w-100">
                    <div class="card-header py-3">
                        <span>Daily Subcategory PL Playstore</span>
                    </div>
                    <div class="card-body overflow-auto">
                        <div class="mt-4">
                            <div v-if="NoData.dataDailySubcategory">
                                <div class="d-flex justify-content-center align-items-center" style="height: 23rem;">
                                    <label class="text-center">No data</label>
                                </div>
                            </div>

                            <div v-if="Loader.dataDailySubcategory">
                                <b-skeleton animation="wave" width="100%" height="24.5rem"></b-skeleton>
                            </div>

                            <div v-if="!Loader.dataDailySubcategory && !NoData.dataDailySubcategory">
                                <ChartDailySubcategory :dataActivityGraph="chartDailySubcategory">
                                </ChartDailySubcategory>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <!-- Daily Subcategory -->
            <!-- Top category -->
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div class="card top-category w-100">
                    <div class="card-header py-3">
                        <span>5 Top Category</span>
                    </div>
                    <div class="card-body overflow-auto">
                        <div class="mt-4">

                            <div v-if="NoData.topCategory">
                                <div class="d-flex justify-content-center align-items-center" style="height: 23rem;">
                                    <label class="text-center">No data</label>
                                </div>
                            </div>

                            <div v-if="Loader.topCategory">
                                <div v-for="(item, index) of new Array(5)" :key="index" class="progress-agree">
                                    <div class="row">
                                        <div class="col mb-3">
                                            <b-skeleton animation="wave" width="90%"></b-skeleton>
                                        </div>
                                        <div class="col">
                                            <b-skeleton animation="wave" width="15%" class="float-right"></b-skeleton>
                                        </div>
                                    </div>
                                    <div class="mb-4">
                                        <b-skeleton animation="wave" width="100%"></b-skeleton>
                                    </div>
                                </div>
                            </div>

                            <div v-if="!Loader.topCategory && !NoData.topCategory">
                                <div v-for="(item, index) of topCategory" :key="index" class="progress-agree">
                                    <h4>
                                        {{ item.origin }}
                                        <span class="float-right">
                                            {{ item.total }}
                                        </span>
                                    </h4>
                                    <div class="progress mb-4">
                                        <div class="progress-bar" :class="{
                                            'progress-2E96E9' : index === 0,
                                            'progress-9D53EC' : index === 1,
                                            'progress-C09AEF' : index === 2,
                                            'progress-24ABA4' : index === 3,
                                            'progress-76B9EF' : index === 4,
                                            }" role="progressbar" :style="'width' + ':' + item.total + '%'"
                                            :aria-valuenow="item.total" aria-valuemin="0" aria-valuemax="200">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row text-center">
                            <div class="col-xl-12">
                                <nuxt-link to="/profile/service-operation/top-category"
                                    class="btn btn-dsa-outline-primary font-size-14" style="border-radius: 100px;">
                                    Lihat Detail
                                </nuxt-link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- Top category -->
        </div>
        <div class="row">
            <!-- Category x Status -->
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div class="card category-x-status w-100">
                    <div class="card-header py-3">
                        <span>Category x Status</span>
                    </div>
                    <div class="card-body overflow-auto">
                        <div class="mt-4">
                            <div v-if="NoData.dataCategoryXStatus">
                                <div class="d-flex justify-content-center align-items-center" style="height: 23rem;">
                                    <label class="text-center">No data</label>
                                </div>
                            </div>

                            <div v-if="Loader.dataCategoryXStatus">
                                <b-skeleton animation="wave" width="100%" height="18.5rem"></b-skeleton>
                                <div class="row mt-4">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 py-1"
                                        v-for="(item, index) of new Array(6)" :key="index">
                                        <div class="">
                                            <b-skeleton animation="wave" width="50%"></b-skeleton>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="!Loader.dataCategoryXStatus && !NoData.dataCategoryXStatus">
                                <ChartCategoryXStatus :dataActivityGraph="chartCategoryXStatus">
                                </ChartCategoryXStatus>
                                <div class="row mt-4">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 py-1"
                                        v-for="(item, index) of dataCategoryXStatus" :key="index">
                                        <div class="">
                                            <i class="fas fa-circle" :style="'color' + ':' + item.backgroundColor"></i>
                                            <span class="text-gray-main font-size-12 font-weight-600">
                                                {{ item.label }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row text-center">
                            <div class="col-xl-12">
                                <nuxt-link to="/profile/service-operation/top-category"
                                    class="btn btn-dsa-outline-primary font-size-14" style="border-radius: 100px;">
                                    Lihat Detail
                                </nuxt-link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- Category x Status -->
            <!-- Channel -->
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-4 d-flex justify-content-center">
                <div class="card channel w-100">
                    <div class="card-header py-3">
                        <span>Channel</span>
                    </div>
                    <div class="card-body overflow-auto">
                        <div class="mb-4">
                            <div v-if="NoData.dataChannel">
                                <div class="d-flex justify-content-center align-items-center" style="height: 28.5rem;">
                                    <label class="text-center">No data</label>
                                </div>
                            </div>

                            <div v-if="Loader.dataChannel">
                                <div class="card-body d-flex justify-content-center mt-4">
                                    <b-skeleton animation="wave" width="45%" height="11.8rem" type="avatar">
                                    </b-skeleton>
                                </div>
                                <div class="row mb-2">
                                    <div class="col d-flex justify-content-center">
                                        <b-skeleton animation="wave" width="10%"></b-skeleton>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col d-flex justify-content-center">
                                        <b-skeleton animation="wave" width="10%" height="1.7rem"></b-skeleton>
                                    </div>
                                </div>
                                <ul class="list-group list-group-flush px-3">
                                    <li class="list-group-item font-size-14 font-weight-600"
                                        v-for="(item, index) of new Array(3)" :key="index">
                                        <div class="row">
                                            <div class="col text-left">
                                                <b-skeleton animation="wave" width="40%"></b-skeleton>
                                            </div>
                                            <div class="col d-flex justify-content-end">
                                                <b-skeleton animation="wave" width="13%"></b-skeleton>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div v-if="!Loader.dataChannel && !NoData.dataChannel">
                                <div class="d-flex justify-content-center mt-4">
                                    <ChartChannel :dataActivityGraph="chartChannel">
                                    </ChartChannel>
                                </div>
                                <div class="text-center mt-3">
                                    <p class="font-size-12 font-weight-400 mb-0" style="color: #3B3D39;">Total Tiket</p>
                                    <label class="font-size-36 font-weight-700 mb-0"
                                        style="color: #3B3D39;">{{ totalTiket }}</label>
                                </div>
                                <ul class="list-group list-group-flush px-3">
                                    <li class="list-group-item font-size-14 font-weight-600 pb-2"
                                        v-if="dataLabelChannel.Email.isShow">
                                        <div class="row">
                                            <div class="col text-left">
                                                <i class="fas fa-circle channel-email"></i> Email
                                            </div>
                                            <div class="col text-right">
                                                <label>{{ dataLabelChannel.Email.total }}</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item font-size-14 font-weight-600 pb-2"
                                        v-if="dataLabelChannel.Telegram.isShow">
                                        <div class="row">
                                            <div class="col text-left">
                                                <i class="fas fa-circle channel-telegram"></i> Telegram
                                            </div>
                                            <div class="col text-right">
                                                <label>{{ dataLabelChannel.Telegram.total }}</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item font-size-14 font-weight-600 pb-2"
                                        v-if="dataLabelChannel.WhatsApp.isShow">
                                        <div class="row">
                                            <div class="col text-left">
                                                <i class="fas fa-circle channel-whatsapp"></i> WhatsApp
                                            </div>
                                            <div class="col text-right">
                                                <label>{{ dataLabelChannel.WhatsApp.total }}</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item font-size-14 font-weight-600 pb-2"
                                        v-if="dataLabelChannel.LiveChat.isShow">
                                        <div class="row">
                                            <div class="col text-left">
                                                <i class="fas fa-circle channel-live-chat"></i> Live Chat
                                            </div>
                                            <div class="col text-right">
                                                <label>{{ dataLabelChannel.LiveChat.total }}</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item font-size-14 font-weight-600 pb-2"
                                        v-if="dataLabelChannel.Facebook.isShow">
                                        <div class="row">
                                            <div class="col text-left">
                                                <i class="fas fa-circle channel-facebook"></i> Facebook
                                            </div>
                                            <div class="col text-right">
                                                <label>{{ dataLabelChannel.Facebook.total }}</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item font-size-14 font-weight-600 pb-2"
                                        v-if="dataLabelChannel.Instagram.isShow">
                                        <div class="row">
                                            <div class="col text-left">
                                                <i class="fas fa-circle channel-instagram"></i> Instagram
                                            </div>
                                            <div class="col text-right">
                                                <label>{{ dataLabelChannel.Instagram.total }}</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item font-size-14 font-weight-600 pb-2"
                                        v-if="dataLabelChannel.Playstore.isShow">
                                        <div class="row">
                                            <div class="col text-left">
                                                <i class="fas fa-circle channel-playstore"></i> Playstore
                                            </div>
                                            <div class="col text-right">
                                                <label>{{ dataLabelChannel.Playstore.total }}</label>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="row text-center">
                            <div class="col-xl-12">
                                <nuxt-link to="/profile/service-operation/top-category"
                                    class="btn btn-dsa-outline-primary font-size-14" style="border-radius: 100px;">
                                    Lihat Detail
                                </nuxt-link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <!-- Channel -->
        </div>
        <div class="">
            <div class="row mb-4">
                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12 mb-4"
                    v-for="(item, index) in layoutDraggable" :key="index" :class="item.product.isShow ? '' : 'd-none'">
                    <div class="card py-2" :class="item.product.borderColor">
                        <div class="card-body">

                            <div class="d-none">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="title mb-1">
                                            <b-skeleton animation="wave" width="20%"></b-skeleton>
                                        </div>
                                        <div class="row">
                                            <div class="col masuk">
                                                <b-skeleton animation="wave" width="50%" height="2.5rem">
                                                </b-skeleton>
                                            </div>
                                            <div class="col closed">
                                                <b-skeleton animation="wave" width="50%" height="2.5rem">
                                                </b-skeleton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="title mb-1">
                                            <span>{{ item.product.origin }}</span>
                                        </div>
                                        <div class="row">
                                            <div class="col masuk">
                                                <span>{{ item.product.masuk || 0 }}</span>
                                                <small>
                                                    <em class="fa fa-arrow-up"></em>
                                                    Open
                                                </small>
                                            </div>
                                            <div class="col closed">
                                                <span>{{ item.product.closed || 0 }}</span>
                                                <small>
                                                    <em class="fa fa-arrow-down"></em>
                                                    Closed
                                                </small>
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
    // NEW REDESING
    import mixins from '@/plugins/mixins.js';
    import ChartDailySubcategory from '@/components/Chart/ServiceOperation/ChartDailySubcategory';
    import ChartChannel from '@/components/Chart/ServiceOperation/ChartChannel';
    import ChartCategoryXStatus from '@/components/Chart/ServiceOperation/ChartCategoryXStatus';

    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    import {
        LIST_PRODUCT
    } from '@/static/config/constant.js';
    // NEW REDESIGN


    export default {
        layout: 'portal/profile',
        mixins: [mixins],
        components: {
            'ChartCategoryXStatus': ChartCategoryXStatus,
            'ChartDailySubcategory': ChartDailySubcategory,
            'ChartChannel': ChartChannel,
            DatePicker
        },
        data() {
            return {


                // NEW REDESIGN
                Data: {
                    DateRange: null,
                    Years: {
                        NARU: null,
                        RAFI: null
                    },
                    DailySubcategory: {
                        data: [],
                        chart: null,
                        display: false
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
                    TopCategory: {
                        data: [],
                        chart: null
                    },
                    DetailChannel: {
                        data: [],
                        Facebook: {
                            not_closed: null,
                            closed: null
                        },
                        Email: {
                            not_closed: null,
                            closed: null
                        },
                        WhatsApp: {
                            not_closed: null,
                            closed: null
                        },
                        Instagram: {
                            not_closed: null,
                            closed: null
                        },
                        Telegram: {
                            not_closed: null,
                            closed: null
                        },
                        Playstore: {
                            not_closed: null,
                            closed: null
                        },
                        LiveChat: {
                            not_closed: null,
                            closed: null
                        },
                    },
                    Product: {
                        data: []
                    },
                    Dummy: {
                        Product: LIST_PRODUCT
                    }
                },
                Selected: {
                    Product: {
                        product: null,
                        detailProduct: [],
                        isRedirect: false
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
                        product: null
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
                // NEW REDESIGN










                Loader: {
                    topCategory: false,
                    dataCategoryXStatus: false,
                    dataDailySubcategory: false,
                    dataChannel: false
                },
                NoData: {
                    topCategory: false,
                    dataCategoryXStatus: false,
                    dataDailySubcategory: false,
                    dataChannel: false
                },
                chartCategoryXStatus: null,
                chartDailySubcategory: null,
                chartChannel: null,
                dataChannel: [],
                dataResultOrigin: {
                    Facebook: {
                        closed: null,
                        masuk: null,
                        origin: 'Facebook',
                        isShow: false,
                        borderColor: "card-facebook"
                    },
                    Email: {
                        closed: null,
                        masuk: null,
                        origin: 'Email',
                        isShow: false,
                        borderColor: "card-email"
                    },
                    WhatsApp: {
                        closed: null,
                        masuk: null,
                        origin: 'WhatsApp',
                        isShow: false,
                        borderColor: "card-whatsapp"
                    },
                    Instagram: {
                        closed: null,
                        masuk: null,
                        origin: 'Instagram',
                        isShow: false,
                        borderColor: "card-instagram"
                    },
                    Telegram: {
                        closed: null,
                        masuk: null,
                        origin: 'Telegram',
                        isShow: false,
                        borderColor: "card-telegram"
                    },
                    Playstore: {
                        closed: null,
                        masuk: null,
                        origin: 'Playstore',
                        isShow: false,
                        borderColor: "card-playstore"
                    },
                    LiveChat: {
                        closed: null,
                        masuk: null,
                        origin: 'LiveChat',
                        isShow: false,
                        borderColor: "card-live-chat"
                    },
                },
                dataLabelChannel: {
                    Facebook: {
                        total: null,
                        isShow: false
                    },
                    Email: {
                        total: null,
                        isShow: false
                    },
                    WhatsApp: {
                        total: null,
                        isShow: false
                    },
                    Instagram: {
                        total: null,
                        isShow: false
                    },
                    Telegram: {
                        total: null,
                        isShow: false
                    },
                    Playstore: {
                        total: null,
                        isShow: false
                    },
                    LiveChat: {
                        total: null,
                        isShow: false
                    },
                },
                dataCategoryXStatus: [],
                dataDailySubcategory: [],
                topCategory: [],
                totalTiket: null,
                token: null,
                Filter: {
                    topCategory: '',
                    byDate: 'TODAY',
                    Date: {
                        start: '',
                        end: '',
                    },
                },
                masks: {
                    input: 'DD/MM/YYYY',
                },
                modelConfig: {
                    type: 'string',
                    mask: 'YYYY-MM-DD', // Uses 'iso' if missing
                },
                Product: {
                    PijarMahir: {
                        Channel: {
                            label: ['Email']
                        }
                    }
                },
                layoutDraggable: [],
                Reusable: {
                    byDate: null,
                    Date: {
                        start: null,
                        end: null,
                    }
                },
                User: {},
                Select: {
                    product: []
                },

                DateRange: null,
                shortcuts: [
                    // Semua Done
                    {
                        text: 'Semua',
                        onClick() {
                            return [null, null];
                        }
                    },
                    // Hari ini ini Done
                    {
                        text: 'Hari ini',
                        onClick() {
                            const firstHourOfThisDay = new Date();
                            const lastHourOfThisDay = new Date();

                            firstHourOfThisDay.setHours(0, 0, 0, 0);
                            lastHourOfThisDay.setHours(23, 59, 59, 59);

                            return [firstHourOfThisDay, lastHourOfThisDay];
                        }
                    },
                    // Kemarin ini ini Done
                    {
                        text: 'Kemarin',
                        onClick() {
                            const firstHourOfYesterday = new Date();
                            const lastHourOfYesterday = new Date();

                            firstHourOfYesterday.setTime(firstHourOfYesterday.getTime() - 3600 * 1000 * 24);
                            lastHourOfYesterday.setTime(lastHourOfYesterday.getTime() - 3600 * 1000 * 24);

                            firstHourOfYesterday.setHours(0, 0, 0, 0);
                            lastHourOfYesterday.setHours(23, 59, 59, 59);

                            return [firstHourOfYesterday, lastHourOfYesterday];
                        }
                    },
                    // Minggu ini ini ini Done
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

                            return [firstDayOfThisWeek, lastDayOfThisWeek];
                        }
                    },
                    // Minggu lalu ini ini Done
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

                            return [firstDayOfLastWeek, lastDayOfLastWeek];
                        }
                    },
                    // Bulan ini Done
                    {
                        text: 'Bulan ini',
                        onClick() {
                            const date = new Date();

                            const firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                            const lastDayOfThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                            lastDayOfThisMonth.setHours(23, 59, 59, 59);

                            return [firstDayOfThisMonth, lastDayOfThisMonth];
                        }
                    },
                    // Bulan lalu Done
                    {
                        text: 'Bulan lalu',
                        onClick() {
                            const date = new Date();

                            const firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
                            const lastDayOfLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);

                            lastDayOfLastMonth.setHours(23, 59, 59, 59);

                            return [firstDayOfLastMonth, lastDayOfLastMonth];
                        }
                    }
                ],
            }
        },
        watch: {
            // NEW REDESIGN
            'Data.DateRange'() {
                if (this.Data.DateRange !== null) {
                    this.Filter.Date.date_from = this.Data.DateRange[0];
                    this.Filter.Date.date_to = this.Data.DateRange[1];
                };
                this.InitFunction();
            },
            'Filter.Product.product'() {
                this.DetailProduct();
                if (this.Selected.Product.detailProduct.length === 0) {
                    this.InitFunction();
                }
            },
            // NEW REDESIGN




            'Filter.topCategory'() {
                this.callAllFuntion();
            },
            'DateRange'() {
                if (this.DateRange !== null) {
                    this.Filter.Date.start = this.DateRange[0];
                    this.Filter.Date.end = this.DateRange[1];
                    this.ChangeFilterRangeDate();
                }
            }
        },
        mounted() {
            this.checkHasAccess();
        },
        methods: {
            async checkHasAccess() {
                this.User = this.UserLogin();
                // this.Select.product = ['pedulilindungi'];
                // this.Filter.topCategory = this.Select.product[0];
                await this.HelperCheckHasAccessServiceOperation(this.User.email, (callback) => {
                    this.Select.product = callback.data.product;
                    this.Filter.topCategory = callback.data.product[0];
                    if (callback.isAccess) {
                        this.callAllFuntion();
                        this.autoRefresh();
                    } else {
                        window.location.href = `${window.location.origin}/`;
                    }
                });
            },
            callAllFuntion() {
                this.FilterDateAndDateRange();
                this.CallAllFuntionSalesForce();
                this.SetXYWHI();
            },
            autoRefresh() {
                setInterval(() => {
                    this.CallAllFuntionSalesForce();
                }, 900000);
            },
            fillchartDailySubcategory(data) {
                this.chartDailySubcategory = data;
            },
            fillchartCategoryXStatus(data) {
                this.chartCategoryXStatus = {
                    labels: data.labels,
                    datasets: []
                };
                for (let x of data.datasets) {
                    this.chartCategoryXStatus.datasets.push({
                        backgroundColor: x.backgroundColor,
                        data: x.data,
                        label: 'Total'
                    });
                }
            },
            fillchartChannel(data) {
                this.totalTiket = null;

                let Email = data.find(x => {
                    return x.origin === 'Email';
                });
                let Telegram = data.find(x => {
                    return x.origin === 'Telegram';
                });
                let WhatsApp = data.find(x => {
                    return x.origin === 'WhatsApp';
                });
                let LiveChat = data.find(x => {
                    return x.origin === 'Live Chat';
                });
                let Facebook = data.find(x => {
                    return x.origin === 'Facebook';
                });
                let Instagram = data.find(x => {
                    return x.origin === 'Instagram';
                });
                let Playstore = data.find(x => {
                    return x.origin === 'Playstore';
                });

                this.dataLabelChannel.Email.total = Email !== undefined ? Email.total : 0;
                this.dataLabelChannel.Telegram.total = Telegram !== undefined ? Telegram.total : 0;
                this.dataLabelChannel.WhatsApp.total = WhatsApp !== undefined ? WhatsApp.total : 0;
                this.dataLabelChannel.LiveChat.total = LiveChat !== undefined ? LiveChat.total : 0;
                this.dataLabelChannel.Facebook.total = Facebook !== undefined ? Facebook.total : 0;
                this.dataLabelChannel.Instagram.total = Instagram !== undefined ? Instagram.total : 0;
                this.dataLabelChannel.Playstore.total = Playstore !== undefined ? Playstore.total : 0;

                let objTotal = {
                    Email: Email !== undefined ? Email.total : 0,
                    Telegram: Telegram !== undefined ? Telegram.total : 0,
                    WhatsApp: WhatsApp !== undefined ? WhatsApp.total : 0,
                    LiveChat: LiveChat !== undefined ? LiveChat.total : 0,
                    Facebook: Facebook !== undefined ? Facebook.total : 0,
                    Instagram: Instagram !== undefined ? Instagram.total : 0,
                    Playstore: Playstore !== undefined ? Playstore.total : 0
                };
                let summed = this.SUM(objTotal);

                this.totalTiket = summed;

                // This for product Pijar Mahir Only
                this.chartChannel = {
                    labels: ['Email', 'Telegram', 'WhatsApp', 'Live Chat', 'Facebook', 'Instagram', 'Playstore'],
                    datasets: [{
                        backgroundColor: [
                            '#C5221F',
                            '#0088cc',
                            '#34A853',
                            '#dd1b14',
                            '#0B84EE',
                            '#D32C79',
                            '#04d1ff'
                        ],
                        data: [
                            Email !== undefined ? Email.total : 0,
                            Telegram !== undefined ? Telegram.total : 0,
                            WhatsApp !== undefined ? WhatsApp.total : 0,
                            LiveChat !== undefined ? LiveChat.total : 0,
                            Facebook !== undefined ? Facebook.total : 0,
                            Instagram !== undefined ? Instagram.total : 0,
                            Playstore !== undefined ? Playstore.total : 0
                        ],
                        label: [
                            'Email',
                            'Telegram',
                            'WhatsApp',
                            'Live Chat',
                            'Facebook',
                            'Instagram',
                            'Playstore'
                        ],
                    }]
                };

            },
            async CallAllFuntionSalesForce() {
                this.GetOriginProduct();
                this.GetTopCategory();
                this.CategoryXStatus();
                this.DailySubcategory();
                this.Channel();
            },
            async GetOriginProduct() {
                let params = {
                    product: this.Filter.topCategory
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/getOrigin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        // Have Facebook
                        data.content.some(x => {
                            if (x === 'Facebook') {
                                this.GetOriginFacebookClosed();
                                this.GetOriginFacebook();
                                this.dataResultOrigin.Facebook.isShow = true;
                                this.dataLabelChannel.Facebook.isShow = true;
                            }
                        });

                        // Have Email
                        data.content.some(x => {
                            if (x === 'Email') {
                                this.GetOriginEmailClosed();
                                this.GetOriginEmail();
                                this.dataResultOrigin.Email.isShow = true;
                                this.dataLabelChannel.Email.isShow = true;
                            }
                        });

                        // Have WhatsApp
                        data.content.some(x => {
                            if (x === 'WhatsApp') {
                                this.GetOriginWhatsAppClosed();
                                this.GetOriginWhatsApp();
                                this.dataResultOrigin.WhatsApp.isShow = true;
                                this.dataLabelChannel.WhatsApp.isShow = true;
                            }
                        });

                        // Have Instagram
                        data.content.some(x => {
                            if (x === 'Instagram') {
                                this.GetOriginInstagramClosed();
                                this.GetOriginInstagram();
                                this.dataResultOrigin.Instagram.isShow = true;
                                this.dataLabelChannel.Instagram.isShow = true;
                            }
                        });

                        // Have Telegram
                        data.content.some(x => {
                            if (x === 'Telegram') {
                                this.GetOriginTelegramClosed();
                                this.GetOriginTelegram();
                                this.dataResultOrigin.Telegram.isShow = true;
                                this.dataLabelChannel.Telegram.isShow = true;
                            }
                        });

                        // Have Playstore
                        data.content.some(x => {
                            if (x === 'Playstore') {
                                this.GetOriginPlaystoreClosed();
                                this.GetOriginPlaystore();
                                this.dataResultOrigin.Playstore.isShow = true;
                                this.dataLabelChannel.Playstore.isShow = true;
                            }
                        });

                        // Have LiveChat
                        data.content.some(x => {
                            if (x === 'LiveChat' || x === 'Live Chat') {
                                this.GetOriginLiveChatClosed();
                                this.GetOriginLiveChat();
                                this.dataResultOrigin.LiveChat.isShow = true;
                                this.dataLabelChannel.LiveChat.isShow = true;
                            }
                        });

                    }
                });
            },
            async GetOriginFacebook() {
                this.dataResultOrigin.Facebook.masuk = null;
                let params = {
                    origin: 'Facebook',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Not_Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.Facebook.masuk = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginEmail() {
                this.dataResultOrigin.Email.masuk = null;
                let params = {
                    origin: 'Email',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Not_Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.Email.masuk = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginWhatsApp() {
                this.dataResultOrigin.WhatsApp.masuk = null;
                let params = {
                    origin: 'WhatsApp',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Not_Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.WhatsApp.masuk = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginInstagram() {
                this.dataResultOrigin.Instagram.masuk = null;
                let params = {
                    origin: 'Instagram',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Not_Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.Instagram.masuk = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginTelegram() {
                this.dataResultOrigin.Telegram.masuk = null;
                let params = {
                    origin: 'Telegram',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Not_Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.Telegram.masuk = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginPlaystore() {
                this.dataResultOrigin.Playstore.masuk = null;
                let params = {
                    origin: 'Playstore',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Not_Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.Playstore.masuk = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginLiveChat() {
                this.dataResultOrigin.LiveChat.masuk = null;
                let params = {
                    origin: 'Live Chat',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Not_Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.LiveChat.masuk = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginFacebookClosed() {
                this.dataResultOrigin.Facebook.closed = null;
                let params = {
                    origin: 'Facebook',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.Facebook.closed = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginEmailClosed() {
                this.dataResultOrigin.Email.closed = null;
                let params = {
                    origin: 'Email',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.Email.closed = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginWhatsAppClosed() {
                this.dataResultOrigin.WhatsApp.closed = null;
                let params = {
                    origin: 'WhatsApp',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.WhatsApp.closed = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginInstagramClosed() {
                this.dataResultOrigin.Instagram.closed = null;
                let params = {
                    origin: 'Instagram',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.Instagram.closed = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginTelegramClosed() {
                this.dataResultOrigin.Telegram.closed = null;
                let params = {
                    origin: 'Telegram',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.Telegram.closed = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginPlaystoreClosed() {
                this.dataResultOrigin.Playstore.closed = null;
                let params = {
                    origin: 'Playstore',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.Playstore.closed = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetOriginLiveChatClosed() {
                this.dataResultOrigin.LiveChat.closed = null;
                let params = {
                    origin: 'Live Chat',
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    status: 'Closed'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.dataResultOrigin.LiveChat.closed = this.KFormater(data.content[0].total);
                    }
                });
            },
            async GetTopCategory() {
                this.Loader.topCategory = true;
                this.NoData.topCategory = false;
                this.topCategory = [];
                let params = {
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end,
                    limit: 5,
                    sort: 'DESC'
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-by-category', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.Loader.topCategory = false;
                        this.topCategory = data.content;
                    } else {
                        this.Loader.topCategory = false;
                        this.NoData.topCategory = true;
                    };
                });
            },
            async DailySubcategory() {
                this.Loader.dataDailySubcategory = true;
                this.NoData.dataDailySubcategory = false;
                this.dataDailySubcategory = [];
                let params = {
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-category-status-playstore', null,
                    params, 'BASIC', (data) => {
                        if (data.code === 200 && data.totalItems !== 0) {
                            this.Loader.dataDailySubcategory = false;
                            this.dataDailySubcategory = data.content.labels;
                            this.fillchartDailySubcategory(data.content);
                        } else {
                            this.Loader.dataDailySubcategory = false;
                            this.NoData.dataDailySubcategory = true;
                        };
                    });
            },
            async CategoryXStatus() {
                this.Loader.dataCategoryXStatus = true;
                this.NoData.dataCategoryXStatus = false;
                this.dataCategoryXStatus = [];
                let params = {
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-category-status', null, params,
                    'BASIC', (data) => {
                        if (data.code === 200 && data.totalItems !== 0) {
                            this.Loader.dataCategoryXStatus = false;
                            this.dataCategoryXStatus = data.content.datasets;
                            this.fillchartCategoryXStatus(data.content);
                        } else {
                            this.Loader.dataCategoryXStatus = false;
                            this.NoData.dataCategoryXStatus = true;
                        };
                    });
            },
            async Channel() {
                this.Loader.dataChannel = true;
                this.NoData.dataChannel = false;
                this.dataChannel = [];
                let params = {
                    product: this.Filter.topCategory,
                    created_date: this.Filter.byDate === null ? null : this.Filter.byDate,
                    date_from: this.Filter.Date.start === null ? null : new Date(this.Filter.Date.start),
                    date_to: this.Filter.Date.end === null ? null : new Date(this.Filter.Date.end)
                };
                this.HelperServiceOperation('POST', '/api/v2/salesforce/total-origin', null, params, 'BASIC', (
                    data) => {
                    if (data.code === 200 && data.totalItems !== 0) {
                        this.Loader.dataChannel = false;
                        this.dataChannel = data.content;
                        this.fillchartChannel(data.content);
                    } else {
                        this.Loader.dataChannel = false;
                        this.NoData.dataChannel = true;
                    };
                });
            },
            async GenerateReport() {
                let param = {
                    product: this.Filter.topCategory,
                    created_date: this.Reusable.byDate,
                    date_from: this.Reusable.Date.start,
                    date_to: this.Reusable.Date.end
                };
                await this.POST(`/api/v2/salesforce/generate-report`, param, 'BASIC', (data) => {
                    var FileSaver = require('file-saver');
                    var blob = new Blob([data], {
                        type: 'text/plain;charset=utf-8'
                    });
                    FileSaver.saveAs(blob, `Report_${this.Filter.topCategory}_${this.Reusable.byDate}.csv`);
                });
            },
            SetXYWHI() {
                this.layoutDraggable = [{
                        x: 0,
                        y: 0,
                        w: 3,
                        h: 4,
                        i: '0',
                        product: this.dataResultOrigin.Facebook
                    },
                    {
                        x: 3,
                        y: 0,
                        w: 3,
                        h: 4,
                        i: '1',
                        product: this.dataResultOrigin.Email
                    },
                    {
                        x: 6,
                        y: 0,
                        w: 3,
                        h: 4,
                        i: '2',
                        product: this.dataResultOrigin.WhatsApp
                    },
                    {
                        x: 9,
                        y: 0,
                        w: 3,
                        h: 4,
                        i: '3',
                        product: this.dataResultOrigin.Instagram
                    },
                    {
                        x: 0,
                        y: 1,
                        w: 3,
                        h: 4,
                        i: '0',
                        product: this.dataResultOrigin.Telegram
                    },
                    {
                        x: 3,
                        y: 1,
                        w: 3,
                        h: 4,
                        i: '0',
                        product: this.dataResultOrigin.Playstore
                    },
                    {
                        x: 6,
                        y: 1,
                        w: 3,
                        h: 4,
                        i: '0',
                        product: this.dataResultOrigin.LiveChat
                    },
                ];
            },
            ChangeFilterRangeDate() {
                this.Filter.byDate = null;
                this.CallAllFuntionSalesForce();
                this.FilterDateAndDateRange();
            },
            ChangeFilterByDate() {
                this.DateRange = null;
                this.Filter.Date.start = null;
                this.Filter.Date.end = null;
                this.CallAllFuntionSalesForce();
                this.FilterDateAndDateRange();
            },
            FilterDateAndDateRange() {
                this.Reusable.byDate = this.Filter.byDate === null ? null : this.Filter.byDate;
                this.Reusable.Date.start = this.Filter.Date.start === null ? null : new Date(this.Filter.Date.start);
                this.Reusable.Date.end = this.Filter.Date.end === null ? null : new Date(this.Filter.Date.end);
            }
        }
    }

</script>

<style scoped>
    .card-header {
        color: #3B3D39 !important;
        font-weight: bold !important;
        font-size: 16px !important;
        background-color: #EFF7FF !important;
    }

    #doughnut-chart .card-body,
    #bar-chart .card-body {
        display: flex !important;
        justify-content: center !important;
    }

    .card-body /deep/ canvas#doughnut-chart {
        width: auto !important;
        height: 189px !important;
    }

    .card-body /deep/ canvas#bar-chart {
        width: auto !important;
        height: 302px !important;
    }

    .progress-2E96E9 {
        background-color: #2E96E9;
    }

    .progress-9D53EC {
        background-color: #9D53EC;
    }

    .progress-C09AEF {
        background-color: #C09AEF;
    }

    .progress-24ABA4 {
        background-color: #24ABA4;
    }

    .progress-76B9EF {
        background-color: #76B9EF;
    }

    .channel-facebook {
        color: #0B84EE;
    }

    .channel-email {
        color: #C5221F;
    }

    .channel-whatsapp {
        color: #34A853;
    }

    .channel-instagram {
        color: #D32C79;
    }

    .channel-telegram {
        color: #0088cc;
    }

    .channel-playstore {
        color: #04d1ff;
    }

    .channel-live-chat {
        color: #dd1b14;
    }


    .card.card-facebook {
        border-left: .25rem solid #0B84EE;
        background: #EFF7FF;
        border-radius: 4px;
    }

    .card.card-email {
        border-left: .25rem solid #C5221F;
        background: #EFF7FF;
        border-radius: 4px;
    }

    .card.card-whatsapp {
        border-left: .25rem solid #34A853;
        background: #EFF7FF;
        border-radius: 4px;
    }

    .card.card-instagram {
        border-left: .25rem solid #D32C79;
        background: #EFF7FF;
        border-radius: 4px;
    }

    .card.card-telegram {
        border-left: .25rem solid #0088cc;
        background: #EFF7FF;
        border-radius: 4px;
    }

    .card.card-playstore {
        border-left: .25rem solid #04d1ff;
        background: #EFF7FF;
        border-radius: 4px;
    }

    .card.card-live-chat {
        border-left: .25rem solid #dd1b14;
        background: #EFF7FF;
        border-radius: 4px;
    }


    .card.card-facebook .card-body,
    .card.card-email .card-body,
    .card.card-whatsapp .card-body,
    .card.card-instagram .card-body,
    .card.card-telegram .card-body,
    .card.card-playstore .card-body,
    .card.card-live-chat .card-body {
        padding-bottom: 0 !important;
        padding-top: 1rem !important;
    }

    .card.card-facebook .title,
    .card.card-email .title,
    .card.card-whatsapp .title,
    .card.card-instagram .title,
    .card.card-telegram .title,
    .card.card-playstore .title,
    .card.card-live-chat .title {
        margin-bottom: 16px !important;
    }

    .card.card-facebook .title span,
    .card.card-email .title span,
    .card.card-whatsapp .title span,
    .card.card-instagram .title span,
    .card.card-telegram .title span,
    .card.card-playstore .title span,
    .card.card-live-chat .title span {
        font-weight: bold !important;
        font-size: 16px !important;
        color: #7F817D !important;
    }

    .card.card-facebook .masuk span,
    .card.card-facebook .closed span,
    .card.card-email .masuk span,
    .card.card-email .closed span,
    .card.card-whatsapp .masuk span,
    .card.card-whatsapp .closed span,
    .card.card-instagram .masuk span,
    .card.card-instagram .closed span,
    .card.card-telegram .masuk span,
    .card.card-telegram .closed span,
    .card.card-playstore .masuk span,
    .card.card-playstore .closed span,
    .card.card-live-chat .masuk span,
    .card.card-live-chat .closed span {
        color: #3B3D39 !important;
        font-weight: bold !important;
        font-size: 32px !important;
    }

    .card.card-facebook .masuk small,
    .card.card-email .masuk small,
    .card.card-whatsapp .masuk small,
    .card.card-instagram .masuk small,
    .card.card-telegram .masuk small,
    .card.card-playstore .masuk small,
    .card.card-live-chat .masuk small {
        color: #219653 !important;
        font-weight: bold !important;
        font-size: 11px !important;
    }

    .card.card-facebook .closed small,
    .card.card-email .closed small,
    .card.card-whatsapp .closed small,
    .card.card-instagram .closed small,
    .card.card-telegram .closed small,
    .card.card-playstore .closed small,
    .card.card-live-chat .closed small {
        color: #ED2B24 !important;
        font-weight: bold !important;
        font-size: 11px !important;
    }

    .progress-agree h4,
    .progress-digitalpass h4,
    .progress-dtp-amoeba h4,
    .progress-lainnya h4,
    .progress-non-produk h4 {
        color: #3B3D39 !important;
        font-weight: 600 !important;
        font-size: 16px !important;
    }

    .progress-agree h4 span,
    .progress-digitalpass h4 span,
    .progress-dtp-amoeba h4 span,
    .progress-lainnya h4 span,
    .progress-non-produk h4 span {
        color: #7F817D !important;
        font-weight: 600 !important;
        font-size: 16px !important;
    }

    .progress-agree .progress,
    .progress-digitalpass .progress,
    .progress-dtp-amoeba .progress,
    .progress-lainnya .progress,
    .progress-non-produk .progress {
        margin-top: 1.3rem;
    }

    .card.top-category,
    .card.category-x-status,
    .card.channel {
        height: 35rem !important;
        max-height: 35rem !important;
    }

    .card ul.list-group {
        border-top: none !important;
        border-bottom: none !important;
    }



    .mx-datepicker-range {
        width: 240px !important;
    }

</style>
