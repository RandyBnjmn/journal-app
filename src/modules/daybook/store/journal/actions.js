
// export const myAction = async({commit})=>{

// }

import journalApi from '@/api/journalApi'



export const loadEntries = async({commit})=>{
    const {data} = await journalApi.get('/entries.json')

    if(!data){
        commit('setEntries', [])
        return
    }
    const entries = []


    for(let id of Object.keys(data)){
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries', entries)
}


export const updateEntries = async({commit}, entry)=>{

    const {date, text, picture } = entry
   
    await  journalApi.put(`/entries/${entry.id}.json`, {date, text, picture})

    commit('updateEntries',entry)
    
    
}
export const createEntries = async({commit}, entry)=>{

    console.log(entry)
    const {data} = await journalApi.post('/entries.json', entry)

    const {name} = data

    const newEntry = {
        id:name,
        date: entry.date,
        text:entry.text
    }
    

    commit('addEntries', newEntry)
    return newEntry.id
    
}

export const deleteEntry = async ({commit}, id)=>{

    await journalApi.delete(`/entries/${id}.json`)

    commit('deleteEntry', id)
}
