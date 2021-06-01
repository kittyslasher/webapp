export default ({ app }) => {
    // Every time the route changes (fired on initialization too)
    app.router.afterEach((to, from, next) => {
      //do something to validate
  
      console.log('toPath', to.path)
    })
  }
  