<template>
  <footer v-if="false" app color="#424242"  class="footer_poke" style="color:green !important;">
    <v-container style="height:100%;padding:0;">
      <v-row justify="space-around" class="footer-text">
        <v-col cols="4" md="4"></v-col>
        <v-col cols="4" md="4" align="center" justify="center">
          <div :ripple="false" text rounded>
            <p>©2021 Crypto Rights Reserved.</p>
          </div>
        </v-col>
        <v-col cols="4" md="4" align="left" justify="center">
          <div class="ml-1 pt-0 mt-0" style="height:100%;">
            <a target="_blank" style="color: inherit;" href="https://github.com/pokeswapper/pokeswapper.github.io/"  >
              <v-img
              style="height:100%;"
                  alt="github"
                  class="shrink mr-0 ml-md-n4"
                  contain
                  :src="require('~/assets/img/git-logo.png')"
                  transition="scale-transition"
                  width="55"
                />
            </a>
          </div>
          <div class="ml-2 mt-0" style="padding-top:4px;"> 
            <a target="_blank" style="color: inherit;" href="https://discord.com/invite/r22r88PVzD"  >
              <v-img
                  alt="discord"
                  class="shrink mr-0 ml-md-n4"
                  contain
                  :src="require('~/assets/img/discord-logo.png')"
                  transition="scale-transition"
                  width="44"
                />
            </a>
          </div>
          <div class="ml-3 pa-0 mt-0"  style="padding-top:0px;">
            <a target="_blank" style="color: inherit;" href="https://www.reddit.com/r/PokeSwapOrg/"  >
              <v-img
                  alt="telegram"
                  class="shrink mr-0 ml-md-n4"
                  contain
                  :src="require('~/assets/img/reddit-icon.png')"
                  transition="scale-transition"
                  width="46"
                />
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear(),
      langs: [
        { id: 'pt', name: 'Português' },
        { id: 'en', name: 'English' },
        { id: 'es', name: 'Español' },
      ],
    }
  },
}
</script>
<style lang="scss">


.footer-text {
    margin-top: 0%;
    color: #E9EBEE !important;
    margin-right: 0%;
    font-family: Roboto;
    font-size: 15 px;
    text-decoration: none;
    color: inherit;
}


.locale-changer {
  &.select {
    min-width: 114px !important;
    margin-top: -50px;

    .v-list {
      box-shadow: 0 2px 4px 0 var(--very-light-grey);
    }
    .v-list-item {
      min-height: unset;
      padding: 0 12px;

      color: var(--light-grey-blue) !important;
    }
    .v-list-item__content {
      padding: 4px 0;
    }
    .v-list-item__title {
      font-size: 11px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      color: var(--light-grey-blue);
    }
    .v-list-item--active {
      color: var(--teal-blue) !important;

      .v-list-item__title {
        color: var(--teal-blue);
      }

      &::before {
        opacity: 0;
      }
    }
    .v-list-item.v-list-item--highlighted::before {
      opacity: 0;
    }
  }
}
.footer_poke {
  background-color: transparent;
  padding-top: 0.2%;
  position: fixed;
  top: 94%;
  width: 100%;
  height: 6%;
  color: #f84563;
  .container {
    max-width: 1170px;
    .row {
      margin-left: -16px;
      margin-right: -16px;
    }
    .v-btn {
      text-transform: none;
      margin: 0 !important;
      padding: 10px 16px;
      &:hover::before {
        opacity: 0;
      }
    }

    p {
      margin: 0;
    }
  }
}
</style>
