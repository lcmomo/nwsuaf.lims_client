

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
                path:'/index/user/detail',
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
                path:'/index/notice/list',
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
                path:'/index/order/userlist',
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
                path:'/index/plat/list',
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
        path:'notice',
        name:'消息通知',
        icon:'phone',
        children:[
            {
                key:'list',
                path:'/index/notice/list',
                name:'消息列表'

            }
        ]
        
    },

    {
        key:'home',
        path:'home',
        name:'用户管理' ,
        icon:'solution',
        children:
        [
            {
                key:'userinfo',
                path:'/index/user/list',
                name:'用户列表'
            },
            
        ]
    },
    
    {
        key:'order',
        path:'orderrecode',
        name:'预约管理',
        icon:'team',
        children:[
            {
                key:'orderlist',
                path:'/index/order/list',
                name:'预约列表'

            }
        ]
    },
    {
        key:'platinfo',
        path:'platinfo',
        name:'平台管理',
        icon:'solution',
        children:[
            {
                key:'platlist',
                path:'/index/plat/list',
                name:'平台列表'

            },
            {
                key:'instrument',
                path:'/index/instrument/list',
                name:'仪器管理'

            },
            {
                key:'device',
                path:'/index/device/list',
                name:'设备管理'

            },
            {
              key:'repair',
              path:'/index/repair/list',
              name:'维修管理' 
            }
        ]
    },
    {
        key:'partner',
        path:'partner',
        name:'合作商管理',
        icon:'solution',
        children:[
            {
                key:'supplier',
                path:'/index/supplier/list',
                name:'供应商管理'

            },
            {
                key:'maintainer',
                path:'/index/maintainer/list',
                name:'维修商管理'

            },
            {
                key:'producer',
                path:'/index/producer/list',
                name:'生产商管理'

            }
        ]
    }
]
export const getMenuData = (index) => {
   const menuData=index==='用户'?userMenu:(index==='负责人'?manageMenu:adminMenu);
   return menuData;
};