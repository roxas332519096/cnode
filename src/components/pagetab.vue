<template>
    <div>
        <ul>
            <li><button @click="toPage(1)" class="pagebtn">首页</button></li>
            <li><button @click="toPage(currentPage-1)" class="pagebtn">上一页</button></li>
            <li>
                <button v-for="btn in pagebtns" :class="[{currentPage:btn === currentPage,point:btn === '...'},'pagebtn']" @click="toPage(btn)">
                    {{btn}}
                </button>
            </li>
            <li><button @click="toPage(currentPage+1)" class="pagebtn">下一页</button></li>
        </ul>


    </div>
</template>

<script>
    export default {
        name:'pagetab',
        data(){
            return {
                pagebtns:[1,2,3,4,5,'...'],
                currentPage:1
            }
        },
        methods:{
            toPage(page){
                if(page === 1){
                    this.pagebtns = [1,2,3,4,5,'...']
                }else if(page > 1 && page < 4){
                    this.pagebtns = ['...',page,page+1,page+2,page+3,'...']
                }else if(page > 4){
                    this.pagebtns = ['...',page-1,page,page+1,page+2,'...']
                }
                this.currentPage = page;
                this.$emit('pagechange',page)
            }
        }
    }
</script>

<style scoped>
ul {
    display: flex;
    margin-top:10px;
}

.pagebtn {
    width: 50px;
    height: 25px;
    margin:5px;
    border: inherit;
    border-radius: 5px;
    background: #fff;
    font-size: 14px;
    cursor: pointer;
}

.currentPage {
    background: rgb(128, 189, 1);
    color: #fff;
}

.point {
    pointer-events: none;
}
</style>
