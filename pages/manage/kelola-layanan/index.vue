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
                                            <th>Layanan</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) of Data.ListLayanan.content" :key="index">
                                            <td>{{ item.name || '-' }}</td>
                                            <td>
                                                <nuxt-link :to="'kelola-layanan/ubah/' + item.id"
                                                    class="btn btn-dsa-warning px-2 ml-1"
                                                    v-if="PermissionsAccess.EditLayanan">
                                                    <img src="/icon/table/edit.svg">
                                                </nuxt-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr v-if="Data.ListLayanan.content.length === 0" class="text-center">
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
                module: 'Layanan',
                Data: {
                    ListLayanan: {
                        content: []
                    }
                },
                IsLoading: false,
                PermissionsAccess: []
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Kelola Layanan',
                menu: []
            }]);
            this.HelperAccessPermissions((data) => {
                this.PermissionsAccess = data;
            });
            this.GetDataLayanan();
        },
        methods: {
            GetDataLayanan() {
                this.Data.ListLayanan.content = [];
                this.Request('GET', '/api/v3/service', null, null, 'BASIC', (callback) => {
                    if (callback.code === 200) {
                        this.Data.ListLayanan.content = callback.content;
                    } else {
                        this.HelperErrorCode(callback);
                    };
                });


            }
        }
    }

</script>
