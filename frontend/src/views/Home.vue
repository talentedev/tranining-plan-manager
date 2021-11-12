<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-0 h1">Novos</span>
      <span class="navbar-text">
        Signed in as {{ email }}
        <button class="btn" @click="logout">sign out</button>
      </span>
    </nav>
    <add-session/>
    <sessions/>
  </div>
</template>

<script>
import AddSession from '../components/AddSession';
import Sessions from '../components/Sessions';

export default {
  name: 'Home',
  components: {
    AddSession,
    Sessions
  },
  methods: {
    logout() {
        this.$store.dispatch('security/logout').then(() => {
            this.$router.push({path: '/login'})
        })
    }
  },
  computed: {
    email() {
      return this.$store.getters['security/email']
    }
  }
}
</script>