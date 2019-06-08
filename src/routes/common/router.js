


 export const RouteConfig=[
    {
      path:'/',
      component:()=>(import('../IndexPage.js')),
      model:[],
      routes:[
        {
          path:'/login',
          component:()=>import('../User/Login.js'),
          model:[import('../../models/user')],
        },
        {
          path:'/register',
          component:()=>import('../User/Register.js'),
          model:[import('../../models/user')],
        },
        {
          path:'/forgetPassword',
          component:()=>import('../User/ForgetPassword.js'),
          model:[import('../../models/user')],
        },

        {
          path:'/index',
          component:()=>import('../../layouts/BaseLayout.js'),
          model:[import('../../models/unread')],
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
            {
              path:'/index/plat/usechart/:id',
              component:()=>import('../Plat/useChart.js'),
              model:[import('../../models/plat'),import('../../models/instrument')]
            },
            

            //仪器管理
            {
              path:'/index/instrument/list',
              component:()=>import('../Instrument/List.js'),
              model:[import('../../models/instrument')]
            },
            {
              path:'/index/instrument/addInstrument',
              component:()=>import('../Instrument/Create.js'),
              model:[import('../../models/instrument')]
            },
            {
              path:'/index/instrument/updateInstrument',
              component:()=>import('../Instrument/Update.js'),
              model:[import('../../models/instrument')]
            },
            {
              path:'/index/instrument/instrumentData',
              component:()=>import('../Instrument/InstrumentData.js'),
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
              path:'/index/device/updateDevice/:id',
              component:()=>import('../Device/Update.js'),
              model:[import('../../models/device')]
            },
            {
              path:'/index/device/deviceData',
              component:()=>import('../Device/DeviceData.js'),
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


            //预约管理
            {
              path:'/index/order/list',
              component:()=>import('../Order/List.js'),
              model:[import('../../models/order')]
            },

            {
              path:'/index/order/addOrder/:instrName',
              component:()=>import('../Order/AddOrder.js'),
              model:[import('../../models/order')]
            },
            //用户预约记录
            {
              path:'/index/order/userlist',
              component:()=>import('../Order/UserList.js'),
              model:[import('../../models/order')]
            },


            //维修管理

            {
              path:'/index/repair/list',
              component:()=>import('../Repair/List.js'),
              model:[import('../../models/repair')]
            },

            {
              path:'/index/repair/addRepair',
              component:()=>import('../Repair/Create.js'),
              model:[import('../../models/repair')]
            },
            {
              path:'/index/repair/updateRepair/:id',
              component:()=>import('../Repair/Update.js'),
              model:[import('../../models/repair')]
            },
            // {
            //   path:'/index/repair/repairData/',
            //   component:()=>import('../Repair/RepairDeviceData.js'),
            //   model:[import('../../models/repair')]
            // },

            {
              path:'/index/repair/repairDeviceData/',
              component:()=>import('../Repair/RepairDeviceData.js'),
              model:[import('../../models/repair')]
            }, 
            {
              path:'/index/repair/repairInstrumentData/',
              component:()=>import('../Repair/RepairInstrumentData.js'),
              model:[import('../../models/repair')]
            },            


          ]
        }
      ]
    }
  ]

  