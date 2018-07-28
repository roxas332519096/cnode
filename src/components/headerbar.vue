<template>
    <div class="header">
        <a href="/">
            <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="">
        </a>
        <ul>
            <li><a href="/">首页</a></li>
            <li><a href="https://cnodejs.org/getstart" target="_blank">新手入门</a></li>
            <li><a href="https://cnodejs.org/api" target="_blank">API</a></li>
            <li><a href="https://cnodejs.org/about" target="_blank">关于</a></li>
            <li><a href="#">注册</a></li>
            <li><a href="#">登录</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'headerbar',
        data(){
            return {
                
            }
        }
    }
</script>

<style scoped>
div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-width: 800px;
    height: 50px;
    padding:0 13%;
    background: rgb(68, 68, 68);
}

img{
    width: 120px;
    height: 34px;
}

ul {
    display: flex;
}

li {
    padding: 15px;
}

a {
    color: #ddd;
    font-size: 13px;
}

a:hover{
    color: #fff;
}
</style>
