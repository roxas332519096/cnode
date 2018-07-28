<template>
    <div class="slidebar">
        <div class="contanier">
            <div class="bar">
                作者
            </div>
             <router-link :to="{name:'userinfo',params:{username:user.loginname}}">
                <img :src="user.avatar_url" alt="">
             </router-link>
            <router-link :to="{name:'userinfo',params:{username:user.loginname}}">
                {{user.loginname}}
            </router-link>
            <span class="score">积分 {{user.score}}</span>
        </div>
        <div class="contanier">
            <div class="bar">最近创建话题</div>
            <ul>
                <li v-for="(user,index) in user.recent_topics" :key="user.id" v-if="index<5">
                    <router-link :to="{name:'post',params:{id:user.id,username:user.author.loginname}}" class="title">
                        {{user.title | Title}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="contanier">
            <div class="bar">最近参与话题</div>
            <ul>
                <li v-for="(user,index) in user.recent_replies" :key="user.id" v-if="index<5">
                    <router-link :to="{name:'post',params:{id:user.id,username:user.author.loginname}}" class="title">
                        {{user.title | Title}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                user:{
                
                }
            }
        },
        methods:{
            getData(username){
                this.$http.get('https://cnodejs.org/api/v1/user/'+username)
                    .then((res)=>{
                       this.user = res.data.data
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }
        },
        watch:{
            $route(to,from){
                this.getData(to.params.username);
            }
        },
        beforeMount() {
            this.getData(this.$route.params.username)
        },
    }
</script>

<style scoped>
.slidebar{
    margin-left: 10px;
    font-size: 14px;
}

img{
    margin-left: 10px;
    width: 48px;
    height: 48px;
}

.score {
    display: block;
    padding:10px;
    color: #333;
}

.bar {
    margin-top: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 290px;
    padding-left: 10px;
    background: rgb(246, 246, 246);
    height: 40px;
    line-height: 40px;
}

.contanier {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 290px;
    background: #fff;
    color: #778087;
}

li {
    padding: 10px;
    width: 290px;
    overflow: hidden;
    text-overflow: ellipsis;
}

li a {
    display: block;
    font-size: 12px;
    white-space: nowrap;
    text-overflow:ellipsis; 
    overflow:hidden;
    color: #778087;
}
</style>

