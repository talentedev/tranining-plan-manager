<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <div class="card-group">
          <div class="card p-4">
            <div class="card-body">
              <h1>Traning Session Manager</h1>
              <div class="input-group mb-3">
                <input class="form-control" type="email" placeholder="Email" v-model="email">
              </div>
              <div class="input-group mb-3">
                <input class="form-control" type="password" placeholder="Password" v-model="password">
              </div>
              <div class="input-group mb-3">
                <input class="form-control" type="password" placeholder="Confirm Password" v-model="confirmPassword">
              </div>
              <div v-if="!isConfirmed" class="alert alert-danger col" role="alert">
                Password is not matched
              </div>
              <div v-if="isLoading" class="row col mb-3">
                <p>
                  Login ...
                </p>
              </div>
              <div v-if="hasError" class="mb-3" role="alert">
                <div class="alert alert-danger col" role="alert">
                  Invalid Fields
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-primary px-4" type="button"
                      @click="performRegister()"
                      :disabled="email.length === 0 || password.length === 0 || isLoading">
                    Sign Up
                  </button>
                </div>
                <div class="col-6 text-right">
                  <button class="btn btn-link px-0" type="button" @click="redirectLogin">
                    Login?
                  </button>
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
  export default {
    name: 'Register',
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    created() {
      let redirect = this.$route.query.redirect;

      if (this.$store.getters['security/isAuthenticated']) {
        if (typeof redirect !== 'undefined'  && redirect !== '/') {
          this.$router.push({path: redirect});
        } else {
          this.$router.push({path: '/home'});
        }
      }
    },
    computed: {
      isLoading() {
        return this.$store.getters['security/isLoading'];
      },
      hasError() {
        return this.$store.getters['security/hasError'];
      },
      error() {
        return this.$store.getters['security/error'];
      },
      isConfirmed() {
        return this.$data.password == this.$data.confirmPassword;
      }
    },
    methods: {
      performRegister() {
        let payload = {
          email: this.$data.email,
          password: this.$data.password,
          confirmPassword: this.$data.confirmPassword
        };

        this.$store.dispatch('security/register', payload)
          .then(() => {
            // this.$router.push({path: '/login'});
          });
      },
      redirectLogin() {
        this.$router.push({path: '/login'});
      }
    }
  }
</script>