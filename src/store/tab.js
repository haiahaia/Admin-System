import Cookie from "js-cookie"
export default {
    state: {
        isCollapse: false,
        menuWidth: '200px',
        tabList:[
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],//面包屑
        menu:[]
    },
    mutations: {
        COLLAPSEMENU(state) {
            state.isCollapse = !state.isCollapse
            state.menuWidth === '200px' ? (state.menuWidth  = 'auto') : (state.menuWidth  = '200px')
        },
        //更新面包屑数据
        SELECTMENU(state,val){
            // 判断添加数据是否为首页
            if(val.name !== 'home'){
                const index = state.tabList.findIndex(item => item.name === val.name)
                if(index === -1){
                    state.tabList.push(val)
                }
            }
        },
        CLOSE(state,tag){
            const index  = state.tabList.findIndex(item => item.name === tag.name)
            state.tabList.splice(index,1)
            // console.log(tag)
        },
        SETMENU(state,val){
            console.log(val)
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        // 动态设置路由
        // ADDROUTER(state,router){
        //     if(!Cookie.get('menu')) return
        //     const menu  = JSON.stringify(Cookie.get('menu'))
        //     state.menu = menu
        //     const menuArray = []
        //     menu.forEach(item => {
        //         if(item.children){
        //             item.children.map(item => {
        //                 item.component = () => import(`../pages/${item.url}`)
        //                 return item
        //             })
        //             menuArray.push(...item.children)
        //         }else{
        //             item.component = () => import(`../pages/${item.url}`)
        //             menuArray.push(...item.children)
        //         }
        //     })
        //     console.log(menuArray)
        // }
    }
}