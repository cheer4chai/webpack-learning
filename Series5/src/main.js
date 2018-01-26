import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery'
console.log($)

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})

require.ensure([], () => {
    require('./test1.js')
}, 'test1')