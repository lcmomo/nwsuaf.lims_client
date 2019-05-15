

const userMenu=[
    {
        key:'home',
        path:'home',
        name:'个人中心' ,
        icon:'solution',
        children:
        [
            {
                key:'userinfo',
                path:'/index/user/index',
                name:'我的信息'

            }
        ]
    },
    {
        key:'notice',
        path:'notice',
        name:'消息通知',
        icon:'phone',
        children:[
            {
                key:'list',
                path:'/index/notice/index',
                name:'消息列表'

            }
        ]
        
    },
    {
        key:'order',
        path:'orderrecode',
        name:'我的预约记录',
        icon:'team',
        children:[
            {
                key:'orderlist',
                path:'/index/order/index',
                name:'预约列表'

            }
        ]
    },
    {
        key:'platinfo',
        path:'platinfo',
        name:'平台信息',
        icon:'solution',
        children:[
            {
                key:'platlist',
                path:'/index/palt/index',
                name:'平台列表'

            }
        ]
    }
]

const manageMenu=[
    {
        key:'platinfo',
        path:'/platinfo',
        name:'审核管理',
        icon:'solution'
    },
    
]

const adminMenu=[

    {
        key:'notice',
        path:'/notice',
        name:'消息管理',
        icon:'phone'
    },
]
export const getMenuData = (index) => {
   const menuData=index==='1'?userMenu:(index==='2'?manageMenu:adminMenu);
   return menuData;
};