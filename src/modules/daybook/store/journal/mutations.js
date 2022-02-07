// export const myAction = (state)=>{

// }


export const setEntries = (state, payload)=>{    
    state.entries = [...state.entries, ...payload.sort((a,b)=> new Date(b.date) - new Date(a.date))]
    
}

export const updateEntries = (state, entry)=>{
    
    const idx =  state.entries.map(e => e.id).indexOf(entry.id)
    state.entries[idx] = entry
}

export const addEntries = (state, entry)=>{

    state.entries.push(entry)
}

export const deleteEntry = (state, id)=>{
    state.entries = state.entries.filter( entry => entry.id!==id )
}