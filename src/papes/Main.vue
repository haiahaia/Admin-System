<template>
  <div>   
    <el-container>
        <el-aside :width=menuWidth >
            <CommonAside></CommonAside>
        </el-aside>
        <el-container>
            <el-header> 
                <Header></Header>
            </el-header>
            <CommonTag></CommonTag>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside'
import Header from '../components/Header'
import CommonTag from '../components/CommonTag'
export default {
    name:'Main',
    components:{
        CommonAside,
        Header,
        CommonTag
    },
    computed:{
        menuWidth(){
            return this.$store.state.Tab.menuWidth
        }
        }
    }

</script>

<style>
 .el-header
 {
    padding: 0;
 }
</style>