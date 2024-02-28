<template>
    <div class="container-fluid">
        <div class="mb-4">
            <label class="font-size-18 font-weight-400" style="color: #8C8F93;">
                Drive Dokumen
            </label>
        </div>
        <div class="mb-3">
            <!-- <label class="font-size-24 font-weight-600" style="color: #262829;">
                Pijar Mahir
            </label> -->
        </div>
        <div class="row">
            <div class="col-xl-3" v-for="(item, index) of Data.ListFolder.content" :key="index">
                <div class="card cursor-pointer mb-3" @click="GetFile(item)" style="border: 1px solid #C8CCD2; border-radius: 10px; background-color: #FFFFFF;">
                    <div class="card-body d-flex align-items-center py-3">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M29.3334 25.3333C29.3334 26.0406 29.0524 26.7189 28.5523 27.219C28.0522 27.719 27.3739 28 26.6667 28H5.33335C4.62611 28 3.94783 27.719 3.44774 27.219C2.94764 26.7189 2.66669 26.0406 2.66669 25.3333V6.66667C2.66669 5.95942 2.94764 5.28115 3.44774 4.78105C3.94783 4.28095 4.62611 4 5.33335 4H12L14.6667 8H26.6667C27.3739 8 28.0522 8.28095 28.5523 8.78105C29.0524 9.28115 29.3334 9.95942 29.3334 10.6667V25.3333Z"
                                stroke="#B1B5BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span class="font-size-18 font-weight-600 ml-3" style="color: #262829;">
                            {{item.product_name}}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xl-3" v-for="(item, index) of Data.ListFile.content" :key="index">
                <div class="card mb-4"
                    style="border: 1px solid #D9DDE3; border-radius: 10px; background-color: #FFFFFF;">
                    <div v-if="item.file_type === 'png' || item.file_type === 'jpg' || item.file_type === 'jpeg'">
                        <img class="card-img-top" :src="item.path" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'csv'">
                         <img class="card-img-top" src="https://i.ibb.co/ZJvK3Ym/csv.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'pdf'">
                         <img class="card-img-top" src="https://i.ibb.co/1nj6HVV/pdf.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'zip'">
                         <img class="card-img-top" src="https://i.ibb.co/tJhyx7C/zip.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'apk'">
                         <img class="card-img-top" src="https://i.ibb.co/1XbPCNH/apk.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'doc'">
                         <img class="card-img-top" src="https://i.ibb.co/RvFXb0j/doc.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'xlsx'">
                         <img class="card-img-top" src="https://i.ibb.co/N3B5nm8/excel.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>

                    <div v-if="item.file_type === 'json'">
                         <img class="card-img-top" src="https://i.ibb.co/bX9TNct/json.png" alt="image"
                            style="border-top-left-radius: 10px; border-top-right-radius: 10px; height: 240px; object-fit: cover;">
                    </div>
                    <div class="card-body">
                        <div class="row">

                            <div class="col">
                                <p class="font-size-18 font-weight-700 mb-0" style="color: #262829;">
                                    attachment.{{item.file_type}}
                                </p>
                                <span class="font-size-16 font-weight-400" style="color: #5C5E61;">
                                    {{ item.file_size | formatFile }}
                                </span>
                            </div>
                            <div class="col-auto d-flex justifyy-content-end align-self-center">
                                <div @click="donwload(item.path)">
                                    <i class="cursor-pointer">
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20 14.9707V18.5263C20 18.9977 19.8127 19.4499 19.4793 19.7833C19.1459 20.1167 18.6937 20.304 18.2222 20.304H5.77777C5.30628 20.304 4.8541 20.1167 4.5207 19.7833C4.1873 19.4499 4 18.9977 4 18.5263V14.9707"
                                                stroke="#E42313" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M7.55554 10.5261L12 14.9706L16.4444 10.5261" stroke="#E42313"
                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12 14.9706V4.30396" stroke="#E42313" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </i>
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
    import Cookies from 'js-cookie';

    export default {
        layout: 'portal/profile',
        mixins: [mixins],
        data() {
            return {
                Data: {
                    ListFolder: {
                        content: [],
                        meta: {}
                    },
                    ListFile: {
                        content: [],
                        meta: {}
                    },
                    FolderName: null,
                    Service: null,
                    ReturnAPI: []
                },
                typeShare: null
            }
        },
        filters: {
            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('DD MMMM YYYY')
                } else {
                    return '-';
                }
            },
            formatFile(bytes) {
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes == 0) return '0 Byte';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
            }
        },
        mounted() {
            this.GetFolder(this.$route.params);
        },
        methods: {
            GetFolder(id) {
                this.Data.ListFolder.content = [];
                this.Request('GET', '/api/portal/drive/' + id.id, null, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {
                        const type = callback.content.map(x => {
                            return x.type;
                        });
                        this.typeShare = type[0];
                        if (type[0] === 'folder') {
                            this.Data.ListFolder.content = callback.content;
                        } else {
                            this.Data.ListFile.content = callback.content;
                        }

                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            },
            GetFile(item) {
                Cookies.set('_temp_drive_dokumen', JSON.stringify(item));
                this.$router.push(`/profile/drive-dokumen/file/${this.$route.params.id}?id=${item.id}`);
            },

            donwload(file) {
                window.open(file, '_blank');
            }
        }
    }

</script>

<style scoped>

</style>
