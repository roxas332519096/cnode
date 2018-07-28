<template>
    <div class="userinfo">
        <div class="user">
            <div class="tab">
                <a href="/">主页</a><span> /</span>
            </div>
            <div class="usermsg">
                <div class="login">
                    <img :src="user.avatar_url" alt="">
                    <span>{{user.loginname}}</span>
                </div>
                <div class="point">{{user.score}} 积分</div>
                <div class="github"><a :href="'https://github.com/'+ user.githubUsername">@{{user.githubUsername}}</a></div>
                <div class="creatat">注册时间 {{user.create_at | Date}}</div>
            </div>
        </div>
        <div class="create">
            <div class="tab">最近创建话题</div>
            <div class="postlist">
                <ul>
                    <li v-for="(post,index) in user.recent_topics" :key="post.id" v-if="index<5">
                        <a href="#">
                            <img :src="post.author.avatar_url" alt="">
                        </a>
                        <div class="post">
                            <router-link :to="{name:'post',params:{id:post.id,username:post.author.loginname}}" class="title">
                                {{post.title | Title}}
                            </router-link>
                        </div>
                        <span class="time">
                            {{post.last_reply_at | Date}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="reply">
            <div class="tab">最近参与话题</div>
            <div class="postlist">
                <ul>
                    <li v-for="post in user.recent_replies" :key="post.id">
                        <a href="#">
                            <img :src="post.author.avatar_url" alt="">
                        </a>
                        <div class="post">
                            <router-link :to="{name:'post',params:{id:post.id,username:post.author.loginname}}" class="title">
                                {{post.title | Title}}
                            </router-link>
                        </div>
                        <span class="time">
                            {{post.last_reply_at | Date}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                user:{}
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
        beforeMount() {
            this.getData(this.$route.params.username)
        },
    }
</script>

<style scoped>

.tab {
    width: 78%;
    min-width: 900px;
    background: rgb(246, 246, 246);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: 10px;
    font-size: 14px;
    height:40px ;
    line-height: 40px;
    color: #444;
}

.tab a {
    color:#80bd01;
}
.tab a:hover{
    text-decoration: underline;
}

.usermsg {
    padding: 10px;
    width: 78%;
    min-width: 900px;
    background: #fff;
    font-size: 14px;
    color: #778087;
}

.login,.point,.github {
    padding: 5px 0;
}

.usermsg .point {
    color: #333;
}

.usermsg .creatat {
    padding: 10px 0;
    color: #ababab;
}


.login img {
    width: 40px;
    height: 40px;
}

.create,.reply{
    margin-top:10px;
}

.postlist{
    width: 78%;
    min-width: 900px;
}

.postlist > ul > li {
    width: 100%;
    display: flex;
    align-items: center;
    height: 51.3px;
    padding: 10px;
    background: #fff;
    border-top: 1px solid rgb(245, 245, 245);
}

.postlist >ul > li:hover {
    background: rgb(245, 245, 245);
}

.postlist > ul > li  img {
    display: block;
    width: 30px;
    height: 30px;
}

.postlist > ul > li .reply {
    font-size: 13px;
    color: #9e78c0;
}

.postlist > ul > li .post {
    flex-grow: 1;
    margin-left: 10px;
}

.postlist > ul > li .post .count  {
    display: inline-block;
    text-align: center;
    width: 70px;
}

.postlist > ul > li .visit {
    font-size: 9px;
    color: #b4b4b4;
}

.postlist > ul > li .tabs {
    text-align: center;
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 3px;
    background: #ddd;
    color: #999;
}

.postlist > ul > li .tabs.good,
.postlist > ul > li .tabs.top{
    color: #fff;
    background: #80bd01;
}

.postlist > ul >li a {
    color: #08c;
}
.postlist > ul > li a:hover{
    text-decoration: underline;
}

.postlist > ul > li .time {
    font-size: 11px;
    color: #778087;
}
</style>
