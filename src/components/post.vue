<template>
    <div class="article">
        <header>
            <div class="top">
                <span v-if="post.top" class="tabs top">
                    <span>置顶</span>
                </span>
                <span v-else-if="post.good" class="tabs good">
                    <span>精华</span>
                </span>
                <span class="title">{{post.title}}</span>
            </div>
            <div class="messages">
                <span>
                    •发布于 {{post.create_at | Date}}
                </span>
                <router-link :to="{name:'userinfo',params:{username:post.author.loginname}}">
                    •作者 {{post.author.loginname}}
                </router-link>
                <span>
                    •{{post.visit_count}} 次浏览
                </span>
                <span>
                    •最后一次编辑是 {{post.last_reply_at | Date}}
                </span>
                <span v-if="post.tab==='share'">
                    •来自 分享
                </span>
                <span v-else-if="post.tab==='job'">
                    •来自 招聘
                </span>
                <span v-else>
                    •来自 问答
                </span>
            </div>


        </header>
        <main v-html="post.content"></main>
        <div class="reply">
            <div class="bar">回复</div>
            <ul>
                <li v-for="(reply,index) in post.replies" :key="index">
                    <router-link  :to="{name:'userinfo',params:{username:reply.author.loginname}}">
                        <img :src="reply.author.avatar_url" alt="">
                    </router-link>
                    <div class="replyContainer">
                        <div class="usermsg">
                            <router-link  :to="{name:'userinfo',params:{username:reply.author.loginname}}" class="username">{{reply.author.loginname}}</router-link>
                            <span class="floot">{{index +1}}楼•</span>
                            <span class="time">{{reply.create_at | Date}}</span>
                            <span class="good">赞</span>
                            <span v-if="reply.ups.length > 0">
                                {{reply.ups.length}}
                            </span>
                        </div>
                        <div class="replyContent" v-html="reply.content"></div>
                    </div>

                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'post',
        data(){
            return {
                post:{
                    author:{
                        loginname:'xxx'
                    },
                }
            }
        },
        methods:{
            getData(id){
                this.$http.get("https://cnodejs.org/api/v1/topic/"+ id)
                    .then((res)=>{
                        this.post = res.data.data
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }
        },
        watch:{
            $route(to,from){
                this.getData(to.params.id);
            }
        },
        beforeMount() {
            this.getData(this.$route.params.id);
        },
    }
</script>

<style style scoped>

.article header {
    width: 78%;
    min-width: 900px;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    padding-left: 10px;
    padding-top: 20px;
    padding-bottom: 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.article header > .top {
    padding-bottom: 10px;
}

.article header > .top > .tabs.good,.top>.tabs.top{
    text-align: center;
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    background: #80bd01;
}

.article header > .top .title {
    font-size: 22px;
    font-weight: bold;
}

.article header > .messages {
    font-size: 13px;
    color: #838383;
}

.article main {
    width: 78%;
    min-width: 900px;
    padding: 0 20px;
    background: #fff;
}

.article .reply {
    width: 78%;
    min-width: 900px;
    margin-top: 15px;
    background: #fff;
}

.article .reply .bar {
    height: 40px;
    padding-left: 10px;
    background: rgb(246, 246, 246);
    font-size: 14px;
    line-height: 40px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.article .reply li {
    display: flex;
    padding: 10px;
    overflow: hidden;
}

.article .reply li  img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
}

.article .reply li > .replyContainer{
    flex-grow: 1;
    font-size: 14px;
    color: #333;
}

.article .reply li > .replyContainer .usermsg {
    color: grey;
    font-size: 14px;
}

.article .reply li > .replyContainer .usermsg .username {
    color:#666;
    font-size: 12px;
    font-weight: bold;
}


.article .reply li > .replyContainer .usermsg .floot,
.article .reply li > .replyContainer .usermsg .time{
    font-size: 11px;
    color: #08c;
 }

 .article .reply li > .replyContainer .usermsg .good {
    color: grey;
    cursor: pointer;
 }

</style>
