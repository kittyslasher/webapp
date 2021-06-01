<template>
  <footer app color="#424242"  class="footer_poke" style="color : green !important;">
    <v-container class="" >
      <v-row justify="space-around" class="footer-text">
        <div>
             <img >
         </div>
        <v-spacer />
        <div :ripple="false" text rounded class=" ml-10">
          <p>©2021 Crypto Rights Reserved.</p>
        </div>
         <v-spacer />
          <div class="ml-1 pt-0 mt-0" style="">
          <a target="_blank" style="color: inherit;" href="https://github.com/pokeswapper/pokeswapper.github.io/"  >
            <v-img
                alt="github"
                class="shrink mr-0 ml-md-n4"
                contain
                :src="require('~/assets/img/git-logo.png')"
                transition="scale-transition"
                width="55"
              />
          </a>
         </div>
         <div class="ml-1 pt-0 mt-0">
           <a target="_blank"  style="color: inherit;padding-top:0px;" href="https://twitter.com/BillTheOG1"  >
            <v-img
                alt="twitter"
                class="shrink mr-0 ml-md-n4"
                contain
                :src="require('~/assets/img/twitter.jpg')"
                transition="scale-transition"
                width="44"
              />
           </a>
         </div>
         <div class="ml-2 mt-0" style="padding-top:4px;">
          <a target="_blank" style="color: inherit;" href="https://discord.gg/d2GQKttA"  >
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
  
  background-color: #424242;
  border-top: solid 1px var(--very-light-grey);
   padding: 7px 0px;
   color:  #f84563;
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
    .locale-changer {
      .v-btn__content {
        cursor: default;
        color: #424242;
        &:hover {
          color: var(--light-grey-blue);
        }
      }
      .locale-changer.v-input {
        padding-top: 0;
        margin-top: 0;
        max-width: 80px;
      }
      .v-input__slot {
        &::before,
        &::after {
          content: none;
        }
        .v-select__selection--comma {
          margin: 0;
          margin-left: 4px;
        }
        input {
          padding: 0;
        }
      }
      .v-select__selection {
        font-size: 11px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        color: var(--teal-blue);
      }
    }

    p {
      margin: 0;
    }
    .v-btn__content {
      font-size: 11px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      color: var(--light-grey-blue);
      margin: 0;
      a {
        color: var(--light-grey-blue);
        text-decoration: none;
      }

      &:hover {
        a {
          color: var(--teal-blue);
        }
      }
    }
  }
}
</style>
