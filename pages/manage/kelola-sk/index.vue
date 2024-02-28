<template>
    <div>
        <div class="mb-4">
            <div class="card border-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Judul S&K</th>
                                            <th>Tipe</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListSK.content" :key="index">
                                            <td>{{ item.name || '-' }}</td>
                                            <td>{{ item.type }}</td>
                                            <td>
                                                <nuxt-link :to="'kelola-sk/ubah/' + item.type"
                                                    class="btn btn-dsa-warning px-2 ml-1"
                                                    v-if="PermissionsAccess.EditSK">
                                                    <img src="/icon/table/edit.svg">
                                                </nuxt-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListSK.content.length === 0" class="text-center">
                                            <td colspan="5">
                                                Data tidak ditemukan
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
    </div>
</template>

<script>
    import mixins from '@/plugins/mixins.js';

    export default {
        layout: 'cms/default',
        mixins: [mixins],
        data() {
            return {
                module: 'Syarat & Ketentuan',
                Data: {
                    ListSK: {
                        content: [],
                    }
                },
                IsLoading: false,
                PermissionsAccess: []
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Kelola Syarat dan Ketentuan',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetIndex();
        },
        methods: {
            GetIndex() {
                this.GetSyaratKetentuan();
            },
            GetSyaratKetentuan() {
                this.Data.ListSK.content = [];
                this.Request('GET', '/api/v3/term-condition', null, null, 'BEARER', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListSK.content = callback.content;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });
            }
        }
    }

</script>
