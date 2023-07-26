<template>
  <div class="tabs">
    <el-tag
        v-for="(tag,index) in tags"
        @click="changeMenu(tag)"
        @close="handerClose(tag,index)"
        :key="tag.path"
        :closable = "tag.name != 'home'"
        :type="tag.type"
        :effect=" $route.name === tag.name ? 'dark' : 'plain'"
        size="small">
        {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'CommonTag',
    data(){
        return {}
    },
    computed:{
        ...mapState({
            // 箭头函数可使代码更简练
            tags: state => state.Tab.tabList,
        }),
    },
    methods:{
        changeMenu(tag){
            if(tag.name !== this.$route.name){
                this.$router.push({
                    name:tag.name
                })
            }

        },
        handerClose(tag,index){
            const length = this.tags.length-1
            // console.log(index)
            this.$store.commit('CLOSE',tag)
            if(tag.name !== this.$route.name){
                return
            }
            console.log(index)
            console.log(length)
            if(index === length){
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    },
    mounted(){
    //   console.log(this)  
    }
}
</script>

<style lang="less" scoped>
    .tabs{
        margin-left: 10px;
        margin-top: 10px;
        .el-tag{
            margin-left: 15px;
            
        }
    }
</style>