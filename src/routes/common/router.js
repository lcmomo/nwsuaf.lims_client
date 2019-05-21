


 export const RouteConfig=[
    {
      path:'/',
      component:()=>(import('../IndexPage.js')),
      model:[],
      routes:[
        {
          path:'/login',
          component:()=>import('../User/Login.js'),
          model:[],
        },
        {
          path:'/index',
          component:()=>import('../../layouts/BaseLayout.js'),
          model:[],
          routes:[
            //消息管理
            {
              path:'/index/notice/list',
              component:()=>import('../../routes/Notice/List.js'),
              model:[import('../../models/notice')]
            },
            {
              path:'/index/notice/addNotice',
              component:()=>import('../../routes/Notice/Create.js'),
              model:[import('../../models/notice')]
            },
            // {
            //   path:'/index/notice/detailNotice',
            //   component:()=>import('../../routes/Notice/.js'),
            //   model:[import('../../models/notice')]
            // },
            //用户管理
            {
              path:'/index/user/list',
              component:()=>import('../../routes/User/List.js'),
              model:[import('../../models/user')]
            },
            {
              path:'/index/user/addUser',
              component:()=>import('../../routes/User/Create.js'),
              model:[import('../../models/user')]
            },
            {
              path:'/index/user/detail',
              component:()=>import('../../routes/User/Detail.js'),
              model:[import('../../models/user')]
            },
            //平台管理
            {
              path:'/index/plat/list',
              component:()=>import('../Plat/List.js'),
              model:[import('../../models/plat')]
            },
            {
              path:'/index/plat/addPlat',
              component:()=>import('../Plat/Create.js'),
              model:[import('../../models/plat')]
            },
            {
              path:'/index/plat/detail/:platname',
              component:()=>import('../Plat/Detail.js'),
              model:[import('../../models/plat'),import('../../models/instrument')]
            },

            //仪器管理
            {
              path:'/index/instrument/list',
              component:()=>import('../Instrument/List.js'),
              model:[import('../../models/instrument')]
            },
            
            //设备管理
            {
              path:'/index/device/list',
              component:()=>import('../Device/List.js'),
              model:[import('../../models/device')]
            },
            {
              path:'/index/device/addDevice',
              component:()=>import('../Device/Create.js'),
              model:[import('../../models/device')]
            },
            {
              path:'/index/device/updateDevice',
              component:()=>import('../Device/Update.js'),
              model:[import('../../models/device')]
            },


            //维修商管理
            {
              path:'/index/maintainer/list',
              component:()=>import('../Maintainer/List.js'),
              model:[import('../../models/maintainer')]
            },
            {
              path:'/index/maintainer/addMaintainer',
              component:()=>import('../Maintainer/Create.js'),
              model:[import('../../models/maintainer')]
            },
            {
              path:'/index/maintainer/updateMaintainer/:id',
              component:()=>import('../Maintainer/Update.js'),
              model:[import('../../models/maintainer')]
            },
            
            //生产商管理

            {
              path:'/index/producer/list',
              component:()=>import('../Producer/List.js'),
              model:[import('../../models/producer')]
            },
            {
              path:'/index/producer/addProducer',
              component:()=>import('../Producer/Create.js'),
              model:[import('../../models/producer')]
            },
            {
              path:'/index/producer/updateProducer',
              component:()=>import('../Producer/Update.js'),
              model:[import('../../models/producer')]
            },

            // 供应商管理
            {
              path:'/index/supplier/list',
              component:()=>import('../Supplier/List.js'),
              model:[import('../../models/supplier')]
            },
            {
              path:'/index/supplier/addSupplier',
              component:()=>import('../Supplier/Create.js'),
              model:[import('../../models/supplier')]
            },
            {
              path:'/index/supplier/updateSupplier',
              component:()=>import('../Supplier/Update.js'),
              model:[import('../../models/supplier')]
            },



          ]
        }
      ]
    }
  ]

  