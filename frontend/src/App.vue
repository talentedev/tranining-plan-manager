<template>
    <router-view></router-view>
</template>

<script>
    import axios from 'axios';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

    export default {
        name: 'App',
        created () {
            let redirect = this.$route.query.redirect;
            if (this.$store.getters['security/isAuthenticated']) {
                if (!this.$store.getters['security/hasError']) {
                    if (typeof redirect !== 'undefined' && redirect !== '/') {
                        this.$router.push({path: redirect});
                    } else {
                        this.$router.push({path: '/'});
                    }
                }
            }

            // Add a request interceptor
            axios.interceptors.request.use(function (config) {
                const token = localStorage.getItem("token");
                config.headers.Authorization =  "Bearer " + token;

                return config;
            });

            axios.interceptors.response.use(undefined, (err) => {
                return new Promise(() => {
                    if (err.response.status === 403) {
                        this.$router.push({path: '/login'}).then(
                            this.$router.go(0)
                        );
                    } else if (err.response.status === 500) {
                        document.open();
                        document.write(err.response.data);
                        document.close();
                    }
                    throw err;
                });
            });
        },
        computed: {
            isAuthenticated () {
                return this.$store.getters['security/isAuthenticated']
            },
        }
    }
</script>

<style>
  @import './assets/styles/global.css';
</style>