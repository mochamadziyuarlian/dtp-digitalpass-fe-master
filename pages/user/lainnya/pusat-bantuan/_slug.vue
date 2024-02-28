<template>
    <div>
        <div class="title-container">
            <p class="title">Butuh bantuan?</p>
            <p class="subtitle">Temukan jawabanmu disini</p>
        </div>
        <div class="section-container">
            <div class="row">
                <div class="col-xl-4">
                    <div class="dropdown">
                        <div class="input-dropdown" 
                            @click="onShowOptions()"
                        >
                            <div class="selected-dropdown">
                                <img :src="'/v3/Portal/assets/images/pusat-bantuan/'+ selected.image +'.svg'" />
                                <p>{{ selected.title }}</p>
                            </div>
                            <div class="icon-dropdown">
                                <img src="/icon/form/select-icon.svg">
                            </div>
                        </div>
                        <div 
                            class="options-dropdown"
                            v-if="showOptions"
                        >
                            <div 
                                class="dropdown-item"
                                v-for="(item, index) of topic"
                                :key="index"
                                @click="onSelectTopic(item)"
                            >
                                <img :src="'/v3/Portal/assets/images/pusat-bantuan/' + item.image + '.svg'" />
                                <p>{{ item.title }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="question">
                        <div 
                            class="question-item"
                            v-for="(item, index) of faq.article"
                            :key="index"
                            :class="{'active' : index === selectedQuestion.index}"
                            @click="onSelectQuestion(item, index)"
                        >
                            {{ item.question }}
                        </div>
                    </div>
                </div>
                <div class="col-xl-8 article">
                    <p class="title">{{ selectedQuestion.question }}</p>
                    <p class="body" v-html="answerFaq(selectedQuestion.answer)"></p>
                </div>
            </div>
        </div>  
        <div class="row mt-3">
            <div class="col-xl-12">
                <div class="footer-faq">
                    <div>
                        <div class="row">
                            <div class="col-xl-12">
                                <p class="title-footer">
                                    Masih butuh bantuan?
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="hubungi-telfon">
                                    <div class="row">
                                        <div class="col-auto pr-0">
                                            <img src="/v3/Portal/assets/icon/FAQ_TELFON.svg">
                                        </div>
                                        <div class="col">
                                            <p class="mb-0">
                                                <a href="https://wa.me/082228000720" target="_blank">
                                                    +62 82228000720
                                                </a>
                                            </p>
                                            <label>WhatsApp</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="hubungi-email" style="width: 270px">
                                    <div class="row">
                                        <div class="col-auto pr-0">
                                            <img src="/v3/Portal/assets/icon/FAQ_EMAIL.svg">
                                        </div>
                                        <div class="col">
                                            <p class="mb-0">
                                                <a href="mailto:helpdesk@digitalpass.id" target="_blank">
                                                    helpdesk@digitalpass.id
                                                </a>
                                            </p>
                                            <label>Email</label>
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
        FAQ
    } from '@/config/faq';

    export default {
        layout: 'v3/Portal/default',
        mixins: [mixins],
        data() {
            return {
                topic: [
                    {
                        title: 'Akun & Keamanan',
                        image: 'account-security'
                    },
                    {
                        title: 'Layanan',
                        image: 'service'
                    },
                    {
                        title: 'Drive Dokumen',
                        image: 'drive-document'
                    },
                ],
                selected: {},
                showOptions: false,
                faq: [],
                selectedQuestion: {}
            }
        },
        computed: {
            answerFaq() {
                return (answer) => {
                    if(answer) {
                        return answer.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
                    } else {
                        return answer;
                    }
                }
            }
        },
        created() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Pusat Bantuan',
                titleURL: '/user/lainnya/pusat-bantuan',
                menu: [{
                    menuTitle: this.$route.params.slug,
                    menuURL: null
                }]
            }]);
        },
        mounted() {
            this.selected = this.topic.find(item => item.title === this.$route.params.slug);
            let findTopic = FAQ.find(item => item.topic === this.selected.title);
            let defaultTopic = {
                topic: this.$route.params.slug,
                article: []
            };
            this.faq = findTopic ? findTopic : defaultTopic;
            this.onSelectQuestion(this.faq.article[0], 0);
        },
        methods: {
            onShowOptions() {
                this.showOptions = !this.showOptions;
            },
            onSelectTopic(item) {
                window.location.href = `${window.location.origin}/user/lainnya/pusat-bantuan/${item.title}`;
            },
            onSelectQuestion(item, index) {
                this.selectedQuestion = {
                    ...item,
                    index: index
                };
            }
        }
    }

</script>

<style scoped>
    .hubungi-telfon p a,
    .hubungi-email p a {
        font-family: 'Poppins';
        color: #151718;
        font-weight: 600;
        font-size: 14px;
    }

    .hubungi-telfon span,
    .hubungi-email span {
        font-family: 'Poppins';
        color: #8C8F93;
        font-weight: 400;
        font-size: 14px;
    }

    .hubungi-telfon,
    .hubungi-email {
        background-color: #FFFFFF;
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        padding: 16px;
    }


    .title-container {
        background-image: url('../../../../static/v3/Portal/assets/images/pusat-bantuan/banner.svg');
        background-size: cover;
        padding: 80px 40px;
    }

    .title-container .title {
        font-family: 'Poppins', sans-serif;
        font-size: 48px;
        font-weight: 600;
        color: #FDF7F7;
        text-align: center;
    }

    .title-container .subtitle {
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        color: #FDF7F7;
        text-align: center;
        margin-bottom: 0;
    }

    .article {
        padding-left: 60px;
    }

    .article .title {
        font-family: 'Poppins', sans-serif;
        font-size: 28px;
        font-weight: 600;
        color: #000;
        text-align: left;
        margin-bottom: 24px;
    }

    .article .body {
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        color: #000;
        text-align: left;
        margin-bottom: 0;
    }

    .article .body /deep/ ol {
        margin: 1rem 0;
    }

    .article .body /deep/ a {
        color: #E42313;
    }

    .dropdown .input-dropdown {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #F2F4F6;
        border-radius: 10px;
        padding: 12px;
        cursor: pointer;
    }

    .dropdown .input-dropdown .selected-dropdown {
        display: flex;
        align-items: center;
    }

    .dropdown .input-dropdown .selected-dropdown img,
    .dropdown .options-dropdown .dropdown-item img {
        width: 40px;
        height: 40px;
    }

    .dropdown .input-dropdown .selected-dropdown p,
    .dropdown .options-dropdown .dropdown-item p {
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        font-weight: 500;
        color: #000;
        margin-left: 12px;
        margin-bottom: 0;
    }

    .dropdown .input-dropdown .icon-dropdown {
        background-color: #D9DDE3;
        padding: 4px;
        width: 24px;
        height: 24px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dropdown .input-dropdown .icon-dropdown img {
        width: 8px;
        height: 8px;
    }

    .dropdown .options-dropdown {
        background-color: #FFF;
        border: 2px solid #D9DDE3;
        border-radius: 8px;
        margin-top: 8px;
        width: 100%;
        overflow-y: auto;
        overflow: hidden;
        position: absolute;
        z-index: 9;
    }

    .dropdown .options-dropdown .dropdown-item {
        display: flex;
        align-items: center;
        padding: 12px;
        border-bottom: 2px solid #D9DDE3;
        cursor: pointer;
    }

    .dropdown .options-dropdown .dropdown-item:hover,
    .dropdown .options-dropdown .dropdown-item:focus,
    .dropdown .options-dropdown .dropdown-item:active {
        background-color: #F2F4F6 !important;
    }

    .dropdown .options-dropdown .dropdown-item:last-child {
        border: none;
    }

    .question {
        margin-top: 48px;
    }

    .question .question-item {
        padding: 16px 0;
        border-bottom: 1px solid #D9DDE3;
        font-size: 16px;
        color: #000;
        font-weight: 600;
        cursor: pointer;
    }

    .question .question-item.active {
        color: #E42313;
    }

    .question .question-item:hover {
        color: #E42313;
    }

    .footer-faq {
        background-color: #D9D9D933;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 60px 100px;
    }

    .footer-faq .title-footer {
        font-family: 'Poppins', sans-serif;
        color: #000;
        font-size: 30px;
        font-weight: 600;
        margin-bottom: 24px;
    }
</style>
