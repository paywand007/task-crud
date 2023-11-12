// stores/counter.js
import { defineStore } from 'pinia'
 import axios from 'axios'
 interface UeserData{
  name: String;
   phone: String;
   isOpen: String;
   image: File;
 }
export const useDataStore = defineStore('store', {
  state: () => {
    return { data:[] as UeserData[], SECRET_TOKEN:'paywand9182bf' }
    
  },
 
  actions: {
    
    fetchData(){
      axios.get( `https://testing.myrtle-co.me/api/resorts?token=${this.SECRET_TOKEN}`).then((res)=>
      {
      this.data=res.data
      }
      )
    }
  },
})