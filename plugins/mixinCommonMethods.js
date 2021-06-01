import Vue from 'vue'

Vue.mixin({
  name: 'mixinPlugin',
  components: {},
  computed: {},
  created() {},
  methods: {
    getMethodName() {
      let error = {}
      try {
        throw new Error('')
      } catch (e) {
        error = e
      }
      // IE9 does not have .stack property
      if (error.stack === undefined) {
        return ''
      }
      let stackTrace = error.stack.split('\n')[3]
      if (/ /.test(stackTrace)) {
        stackTrace = stackTrace.trim().split(' ')[1]
      }
      if (stackTrace && stackTrace.indexOf('.') > -1) {
        stackTrace = stackTrace.split('.')[1]
      }
      return stackTrace
    },
    debug(a, ...args) {
      if (this && process.env.NODE_ENV !== 'production') {
        let methodName = this.getMethodName()
        console.log(methodName + ' | ', a, ...args)
      }
    },
    logError(a, ...args) {
      if (this) {
        console.error(a, ...args)
      } else {
        console.error(a, ...args)
      }
    },
  },
  data() {
    return {}
  },
})
