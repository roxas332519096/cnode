<template>
    <div class="postlists">
        <div class="tab">
            <ul>
                <li><a href="#" @click="tabs(null)" :class="{active:!tab}">全部</a></li>
                <li><a href="#" @click="tabs('good')" :class="{active:tab==='good'}">精华</a></li>
                <li><a href="#" @click="tabs('share')" :class="{active:tab==='share'}">分享</a></li>
                <li><a href="#" @click="tabs('ask')" :class="{active:tab==='ask'}">回答</a></li>
                <li><a href="#" @click="tabs('job')" :class="{active:tab==='job'}">招聘</a></li>
            </ul>
        </div>
        <div class="postlist">
            <ul>
                <li v-for="post in posts" :key="post.id">
                    <router-link  :to="{name:'userinfo',params:{username:post.username}}">
                        <img :src="post.touxiang" alt="">
                    </router-link>
                   <div class="post">
                       <span class="count">
                            <span class="reply">{{post.reply}}/</span>
                            <span class="visit">{{post.visit}}</span>
                       </span>
                        <span v-if="post.top" class="tabs top">
                            <span>置顶</span>
                        </span>
                        <span v-else-if="post.good" class="tabs good">
                            <span>精华</span>
                        </span>
                        <span v-else class="tabs">
                            <span v-if="post.tab === 'ask'">问答</span>
                            <span v-else-if="post.tab === 'share'">分享</span>
                            <span v-else>招聘</span>
                        </span>
                        <router-link :to="{name:'post',params:{id:post.id,username:post.username}}" class="title">
                            {{post.title | Title}}
                        </router-link>
                   </div>
                    <span class="time">
                        {{post.time | Date}}
                    </span>
                </li>
            </ul>
        </div>
        <pagetab @pagechange="pages($event)"></pagetab>
    </div>
</template>

<script>

import pagetab from './pagetab'

export default {
  name: "postList",
  data(){
      return{
        posts:[],
        page:1,
        tab:''
      }
  },
  components:{
      pagetab
  },
  methods:{
    getData(){
        this.$http.get('https://cnodejs.org/api/v1/topics',{
            params:{
                page:this.page,
                limit:40,
                tab:this.tab
            }
        })
            .then((res)=>{
                let data = res.data.data;
                let temp = []
                for(let i = 0;i<data.length;i++){
                    this.$set(this.posts,i,{
                          id:data[i].id,
                          touxiang:data[i].author.avatar_url,
                          reply:data[i].reply_count,
                          visit:data[i].visit_count,
                          title:data[i].title,
                          time:data[i].last_reply_at,
                          tab:data[i].tab,
                          good:data[i].good,
                          top:data[i].top,
                          username:data[i].author.loginname
                    })
                }         
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    pages(page){
        this.page = page;
    },
    tabs(tab){
        this.tab = tab;
    }
  },
  watch:{
      page(){
          this.getData();
      },
      tab(){
          this.getData();
      }
  },
  beforeMount() {
      this.getData();
  },
};
</script>

<style scoped>

.tab {
    width: 78%;
    min-width: 900px;
    background: rgb(246, 246, 246);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.tab > ul {
    display: flex;
    padding-left: 10px;
    
}
.tab > ul > li {
    padding:7px 10px;
}

.tab > ul > li > a {
    font-size: 14px;
    padding: 3px 4px;
    color: rgb(128, 189, 1);
    border-radius: 3px;
}

.tab > ul > li > a.active{
    background: rgb(128, 189, 1);
    color: #fff;
}

.tab > ul > li >a:hover{
    color: #08c;
}

.tab > ul > li > a.active:hover{
    color: #fff;
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
    color: #333;
}
.postlist > ul > li a:hover{
    text-decoration: underline;
}

.postlist > ul > li .time {
    font-size: 11px;
    color: #778087;
}

</style>
