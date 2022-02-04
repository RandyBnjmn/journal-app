export default {

    name: 'daybook',
    component: () => import('@/modules/daybook/layouts/DayBookLayout.vue'),
    children:[
        {
            path:'',
            name:'no-entry',
            component: ()=> import('../views/NoEntrySelected')
        },
        {
            path:':id',
            name:'entry',
            component:()=>import('@/modules/daybook/views/EntryView'),
            props:( route )=>{
                return {
                    id: route.params.id
                }
            }
        }

    ]
}