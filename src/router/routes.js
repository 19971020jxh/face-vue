export default [
  {
    path: "/",
    name: 'index',
    component: () => import("@/components/index")
  },
  {
    path: "/project",
    name: 'project',
    component: () => import("@/components/project")
  },
  {
    path:'/teachAdmin',
    name:'teachAdmin',
    component:()=>import("@/components/teachAdmin"),
    children:[
      {
        path:'/teachAdmin/signInfo',
        name:'signInfo',
        component:()=>import("@/teachFrame/signInfo"),
      },
      {
        path:'/teachAdmin/signManage',
        name:'signManage',
        component:()=>import("@/teachFrame/signManage"),
      },
      {
        path:'/teachAdmin/classManage',
        name:'classManage',
        component:()=>import("@/teachFrame/classManage"),
      },
      {
        path:'/teachAdmin/studentProblem',
        name:'studentProblem',
        component:()=>import("@/teachFrame/studentProblem"),
      },
      {
        path:'/teachAdmin/teachInfo',
        name:'teachInfo',
        component:()=>import("@/teachFrame/teachInfo"),
      }
    ]
  },
  {
    path:'/signManage',
    name:'signManage',
    component:()=>import("@/teachFrame/signManage")
  },
  {
    path:'/classManage',
    name:'classManage',
    component:()=>import("@/teachFrame/classManage")
  },
  {
    path:'/stuAdmin',
    name:'stuAdmin',
    component:()=>import("@/components/stuAdmin"),
    children:[
      {
        path:'/stuAdmin/stuSignInfo',
        component: () => import("@/stuFrame/stuSignInfo"),
      },
      {
        path:'/stuAdmin/stuSigManage',
        component: () => import("@/stuFrame/stuSigManage"),
      },
      {
        path:'/stuAdmin/stuSignLeave',
        component: () => import("@/stuFrame/stuSignLeave"),
      },
      {
        path:'/stuAdmin/stuInfo',
        component: () => import("@/stuFrame/stuInfo"),
      }
    ]
  },


];
