
import axios from 'axios'

const journalApi = axios.create({
     baseURL: "https://journal-app-167c3-default-rtdb.firebaseio.com"
 })


 export default journalApi;