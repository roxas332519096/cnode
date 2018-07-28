import Vue from 'vue'
import App from './App'
import axios from 'axios'
import myRouter from './router/index'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.filter('Date',(str)=>{
  if(!str) return ''
  let date = new Date(str)
  let time = new Date().getTime() - date.getTime()
  if(time < 0) {
    return ''
  } else if((time / 1000 < 30)){
    return '刚刚'
  } else if((time /1000 < 60)){
    return parseInt(time / 1000) + '秒前'
  } else if((time /60000 < 60)) {
    return parseInt(time / 60000) + '分钟前'
  } else if ((time / 3600000 < 24)) {
    return parseInt (time / 3600000) + '小时前'
  } else if ((time / 86400000 < 31)) {
    return parseInt (time / 86400000) + '天时前'
  } else if ((time / 2592000000 < 12)) {
    return parseInt (time / 2592000000) + '月前'
  } else {
    return parseInt (time / 31536000000) + '年前'
  } 
})

Vue.filter('Title',(str)=>{
  if(str.length > 70) {
    return str.substring(0,70) + '...'
  } else {
    return str
  }
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router:myRouter
})

