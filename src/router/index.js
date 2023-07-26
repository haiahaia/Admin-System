import VueRouter from 'vue-router'
import Home from '../papes/Home'
import User from '../papes/User'
import Main from '../papes/Main'
import Mall from '../papes/Mall'
import Page1 from '../papes/Page1'
import Page2 from '../papes/Page2'
import Login from '../papes/Login'
import Vedio from '../papes/Vedio'

const routes = [
    {
        path: '/',
        redirect: '/Home',
        component: Main,
        children: [
            { name:'home', path: 'Home', component: Home },
            { name:'user', path: 'User', component: User },
            { name:'mall', path: 'mall', component: Mall },
            { name:'page1', path: 'Page1', component: Page1 },
            { name:'page2', path: 'Page2', component: Page2 },
            { name:'video', path: 'video', component: Vedio },
        ]
    },
    {
        name:'login',
        path:'/login',
        component:Login
    }
]

const router = new VueRouter({
    routes
})

export default router
