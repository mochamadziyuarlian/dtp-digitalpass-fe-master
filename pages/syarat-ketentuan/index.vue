<template>
    <div>
        <div class="bg-white">
            <div class="container" style="padding-top: 8rem; padding-bottom:8rem;">
                <div class="text-center">
                    <label class="text-gray-main font-size-60 line-height-36 font-weight-700">
                        Syarat dan Ketentuan
                    </label>
                    <div class="my-5">
                        <h5 class="text-gray-light-1 line-height-36">
                            Syarat dan ketentuan untuk pengujian produk digital yang akan diajukan kepada kami adalah
                            sebagai berikut :
                        </h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-fafafa">
            <div class="container">
                <div style="margin-top: -6rem;">
                    <div v-for="(item, index) in faqs" :key="index">
                        <div class="m-4">
                            <div class="card shadow" id="card">
                                <a class="" data-toggle="collapse" :href="'#collapse' + index" @click="click()">
                                    <div class="card-header bg-white" style="padding:35px;">
                                        <div class="row">
                                            <div class="col-auto align-self-center">
                                                <h5 id="header-card" class="mb-0 text-gray-dark-1"
                                                    :class="index === isIndex ? 'font-weight-700' : 'font-weight-400'">
                                                    {{ item.name }}
                                                </h5>
                                            </div>
                                            <div class="col justify-content-end d-flex">
                                                <h5 class="mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor" class="bi bi-chevron-down"
                                                        viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd"
                                                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div :id="'collapse' + index" class="px-4 collapse" :class="index === 0 ? 'show' : ''">
                                    <div class="card-body px-3">
                                        <p class="text-gray-light-1 font-size-18 line-height-36">
                                            <span v-html="item.value"></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container py-5" id="AjukanLayanan">
            <div class="py-5 px-5 bg-fafafa">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <h4 class="text-gray-dark-2 font-weight-700" id="head">Siap untuk melakukan pengujian?</h4>
                        <h6 class="text-gray-light-1 font-weight-400" id="sub_head">
                            Ajukan produkmu sekarang juga!
                        </h6>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-end">
                        <button class="btn btn-red my-2" @click="ajukanLayanan">
                            <span class="font-size-16">Ajukan Layanan</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';

    export default {
        layout: 'portal/default',
        mixins: [mixins],
        data() {
            return {
                faqs: [],
                isIndex: 0
            };
        },
        watch: {
            isIndex: function () {
                this.isClick();
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.GET(`/api/v3/portal/term-condition`, 'BASIC', (data) => {
                    if (data.code === 200) {
                        this.faqs = data.content;
                    }
                });
            },
            isClick(index) {
                this.index = index;
            },
            click() {
                var selector, elems, makeActive;
                selector = '.bg-fafafa #card #header-card';
                elems = document.querySelectorAll(selector);
                makeActive = function () {
                    for (var i = 0; i < elems.length; i++)
                        elems[i].classList.remove('font-weight-700');
                    this.classList.add('font-weight-700');
                };
                for (var i = 0; i < elems.length; i++)
                    elems[i].addEventListener('mousedown', makeActive);
            },
            ajukanLayanan() {
                this.AjukanLayanan(null, null);
            }
        },
    };

</script>
