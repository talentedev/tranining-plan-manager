<template>
  <div class="px-5 pt-3">
    <p>Add a traning session to the bank</p>
    <form>
      <input
        class="form-control mb-2 mr-sm-2"
        placeholder="Title"
        v-model="title"/>
      <textarea
        rows="3"
        class="form-control mb-2 mr-sm-2"
        placeholder="Description"
        v-model="description"></textarea>
      <div class="text-center">
        <button
          type="button"
          class="btn btn-success mb-2"
          @click="addSession()">Add to the bank</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'AddSession',
  data() {
    return {
      title: '',
      description: '',
      error: false,
    };
  },
  methods: {
    addSession() {
      let payload = {
        title: this.title,
        description: this.description,
      }
      this.$store.dispatch('session/createSession', payload)
        .then(() => {
          this.title = '';
          this.description = '';
        });
    }
  }
}
</script>