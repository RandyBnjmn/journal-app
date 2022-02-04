const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const getDayMonthYear = (dateString) => {
    
    const date = new Date(dateString)

    const day = days[date.getDate()]
    const month = months [date.getMonth()] 
    const year = `${date.getFullYear()}, ${days[date.getDay()]}`

    return {day, month, year}
}



// sortText(){
//     return this.entry.text.length > 120 ? this.entry.text.substring(0,120)+'...' : this.entry.text
// },
// day(){
//     const date = new Date(this.entry.date)
//     return date.getDate()
// },
// month(){
//     const date = new Date(this.entry.date)
//     return months[date.getMonth()]
// },
// year(){
//     const date = new Date(this.entry.date)
//     return `${date.getFullYear()}, ${days[date.getDay()]}`
// },