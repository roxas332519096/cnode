import router from 'vue-router'
import Vue from 'vue'
import postList from '../components/postList'
import post from '../components/post'
import userinfo from '../components/userinfo'
import sliderbar from '../components/slidebar'

Vue.use(router);

export default  new router({
    routes: [
      {
        name:'root',
        path:'/',
        components:{
          main:postList
        }
      },
      {
        name:'post',
        path:'/post/:id&author=:username',
        components:{
          main:post,
          aside:sliderbar
        }
      },
      {
        name:'userinfo',
        path:'/user/:username',
        components:{
          main:userinfo
        }
      },
    ]
  })

