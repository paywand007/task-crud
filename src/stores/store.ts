// stores/counter.js
import { defineStore } from 'pinia'
 import axios from 'axios'
import type UeserData from '@/components/Types'
export const useDataStore = defineStore('store', {
  state: () => {
    return {
      
      data:[{}] as UeserData[], 
      SECRET_TOKEN:'paywand9182bf' ,
    fd: new FormData(),
    isPopupOpen:false,
  }
    
  },
 
  actions: {
    openPopup(){
      this.isPopupOpen = !this.isPopupOpen;
    },
    
    fetchData(){
      axios.get( `https://testing.myrtle-co.me/api/resorts?token=${this.SECRET_TOKEN}`).then((res)=>
      {
      this.data=res.data
      }
      )
    },
    async postData(formData:FormData) {
    
        await axios.post(`https://testing.myrtle-co.me/api/resorts?token=${this.SECRET_TOKEN}`, formData
       )
        
        .then((res)=>{  return this.data=res.data;})
  this.fetchData()
    
      
    },
  async  deleteData(){
      await axios.delete(`https://testing.myrtle-co.me/api/resorts/140?token=${this.SECRET_TOKEN}`).then(response => {
        console.log(`Deleted post with ID 106`);
        this.fetchData()
    })
    .catch(error => {
        console.error(error);
    });

    }
  },
})