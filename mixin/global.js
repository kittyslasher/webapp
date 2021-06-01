/* eslint-disable */
const mixinPlugin = {
    name: 'mixinPlugin',
    components: {},
    computed: {},
    created() {},
    methods: {
      debug(a, ...args) {
        if (this) {
          let methodName = this.getMethodName()
  
          this.$log.debug(methodName + ' | ', a, ...args)
        } else {
          console.log(a, ...args)
        }
      },
      logError(a, ...args) {
        if (this) {
          this.$log.error(a, ...args)
        } else {
          console.error(a, ...args)
        }
      },
    },
    data() {
      return {}
    },
  }
  
  /* eslint-enable */
  export default mixinPlugin
  