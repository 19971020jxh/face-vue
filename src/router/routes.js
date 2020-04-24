export default [
  {
    path: "/indexHtml",
    name: 'indexHtml',
    component: () => import("@/components/indexHtml")
  },
  {
    path:'/',
    name:'teachAdmin',
    component:()=>import("@/components/teachAdmin")
  }
];
