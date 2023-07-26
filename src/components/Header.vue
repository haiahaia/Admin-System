<template>
  <div class="header-container">
    <div class="l-content">
        <el-button style="margin-right: 20px;" size="mini" icon="el-icon-menu" @click="handerMenu"></el-button>
        <el-breadcrumb  separator="/">
            <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: `${item.path}`}">{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
               <img class="user" src="../images/user.png" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    name:'Header',
    methods:{
        handerMenu(){
            this.$store.commit('COLLAPSEMENU')
            //console.log(this.$store)
        },
        changMenu(){
            // console.log(1)
            // if(item.name !== this.route.name){
            //     thit.$router.push({
            //         name:item.name
            //     })
            // }
        },
        handleCommand(command){
            if(command === 'logout'){
                // console.log(1)
                Cookie.remove('token')
                Cookie.remove('menu')
                this.$router.push('/login')
            }
        }
    },
    computed:{
        ...mapState({
            // 箭头函数可使代码更简练
            tags: state => state.Tab.tabList,
        }),
    },
    mounted(){
    }
}
</script>

<style lang="less" scoped>
    .header-container {
        background-color: #333;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20PX;
    }
    .text {
        font-size: 14px;
        color: #fff;
        margin-left: 10px;
    }
    .header-container{
        .user{
            height: 40px;
            width: 40px;
            border-radius: 50%;
        }
    }
    .l-content{
        display: flex;
        align-items:center;
        /deep/.el-breadcrumb__item{

            .el-breadcrumb__inner {
                font-weight: normal;
                &.is-link{
                    color: #666;
                }
            }
            &:last-child{
                .el-breadcrumb__inner{
                color: #fff;
                }
            }
        }
    }
</style>