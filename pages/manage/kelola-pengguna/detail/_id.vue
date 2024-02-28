<template>
    <div class="container-fluid">
        <div class="mb-4">
            <div class="card border-0">
                <div class="card-body">
                    <form enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5 offset-3">
                                <div class="form-group">
                                    <label>{{ form.name }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5 offset-3">
                                <div class="form-group">
                                    <label>{{ form.email }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5 offset-3">
                                <div class="form-group">
                                    <label>{{ form.phone }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5 offset-3">
                                <div class="form-group">
                                    <label v-for="(item, index) of form.role" :key="index">{{ item.role_name }}</label>
                                </div>
                            </div>
                        </div>
                    </form>
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
                form: {
                    name: null,
                    email: null,
                    phone: null,
                    role: []
                },
            }
        },
        mounted() {
            this.$store.commit('setBreadcrumb', [{
                title: 'Detail Kelola Pengguna',
                menu: []
            }]);
            this.SetValue(this.$route.params);
        },
        methods: {
            SetValue(id) {
                this.GET(`/api/v3/user/${id.id}`, 'BEARER', (data) => {
                    if (data.code === 200) {
                        this.form.name = data.content[0].name;
                        this.form.email = data.content[0].email;
                        this.form.phone = data.content[0].phone;
                        this.form.role = data.content[0].role;
                    }
                });
            }
        }
    }

</script>
