


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
            {
              path:'/index/notice/list',
              component:()=>import('../../routes/Notice/List.js'),
              model:[import('../../models/notice')]


            }
          ]
        }
      ]
    }
  ]

  