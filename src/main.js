import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import Router from 'vue-router'
import store from './store/index'
import './api/mock'
import Cookie from 'js-cookie'


//关闭生产提示
Vue.config.productionTip = false

//注册插件
Vue.use(ElementUI)
Vue.use(Router)

// 添加全局前置路由守卫
router.beforeEach((to,from,next) =>{
  const token = Cookie.get('token')
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else{
    next()
  }
})

router.beforeEach((to,from,next) =>{
  if(!Cookie.get('menu')) {
    next()}
  const menu = JSON.parse(Cookie.get('menu'))
  const menuArray = []
  menu.forEach(item => {
    if(item.name){
      menuArray.push(item.name)
    }else if(item.children){
        item.children.forEach(item_1 => {
          if(item_1.name){
            menuArray.push(item_1.name)
          }
        } )
    }
  })
  // console.log(menu)
  console.log(menuArray)
  if(menuArray.indexOf(to.name) !== -1){
    next()
  }else{
    console.log(1)
    next({name: from.name})
  }

})



new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})