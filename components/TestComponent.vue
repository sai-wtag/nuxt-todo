<template>
  <div>
    <p>{{ fullName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    },
  },
}
</script>
