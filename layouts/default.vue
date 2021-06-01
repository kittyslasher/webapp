<template>
  <v-app class="dca-verify-web">
    <app-header />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppFooter from '../layout/AppFooter.vue'
import AppHeader from '../layout/AppHeader.vue'
export default {
  components: { AppHeader, AppFooter },
  data() {
    return {}
  },
}
</script>
