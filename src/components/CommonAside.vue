<template>
    <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <h3>{{isCollapse ? '后台':'通用后台管理系统'}}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${ item.icon }`"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>  
        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label" >
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
import Cookie from  'js-cookie'
export default {
    name:'CommonAside',
    data() {
      return {
       
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      clickMenu(item){
        // console.log(item)
        // console.log(this)
        if(item.path !== this.$route.path && !(this.$route.path === '/Home' && item.path==='/')){
            this.$router.push(item.path)
            // console.log(this)
        }
        this.$store.commit('SELECTMENU',item)
      }
    },
    computed:{
        //没有子菜单
        noChildren(){
            return this.menuData.filter(item => !item.children)
        },
        //有子菜单
        hasChildren(){
            return this.menuData.filter(item => item.children)
        },
        isCollapse(){
            return this.$store.state.Tab.isCollapse
        },
        menuData(){
            return JSON.parse(Cookie.get('menu')) || this.$store.state.Tab.menu
        }
    },
    mounted(){
        // console.log(this.$store.state.Tab)
    }
}
</script>

<style lang="less" scoped>
    .el-menu {
        height:100vh;
        border: none;
        h3 {
            color: #fff;
            text-align: center;
            font-size: 16px ;
            font-weight: 400;
            line-height: 48px;
        }
    }
    
</style>