// stores/counter.js
import { defineStore } from 'pinia'
import type UeserData from '@/components/Types'
 import axios from 'axios'
 
 
 export const useDataStore = defineStore('store', {
  state: () => {
    return { data:{} as UeserData[],
      dataById:[{
        
      }] as UeserData[],
      SECRET_TOKEN:'paywand9182bf' ,isPopupOpen:false,
    isPopupOpenEdit:false,
    isViewPopupOpen:false}
    
  },
 
  actions: {
    openPopup(){
      this.isPopupOpen = !this.isPopupOpen;
    },
    editPopup(){
      this.isPopupOpenEdit = !this.isPopupOpenEdit;
    },
    viewPopup(){
      this.isViewPopupOpen = !this.isViewPopupOpen;
    },
    fetchData(){
      axios.get( `https://testing.myrtle-co.me/api/resorts?token=${this.SECRET_TOKEN}`).then((res)=>
      {
   this.data=res.data
      }
      )
    }, async fetchDataById(id){
      await axios.get( `https://testing.myrtle-co.me/api/resorts/${id}?token=${this.SECRET_TOKEN}`).then((res)=>
      {
   this.dataById=res.data
    

      }
      )
    },
    
    async postData(formData:FormData) {
    
      await axios.post(`https://testing.myrtle-co.me/api/resorts?token=${this.SECRET_TOKEN}`, formData
     )
      
      .then((res)=>{  return this.data=res.data;})
this.fetchData()
  
    
  }
  ,
  async editData(formData:FormData,id:number){
this.openPopup()
await axios.put(`https://testing.myrtle-co.me/api/resorts/${id}?token=${this.SECRET_TOKEN}`, formData ).then((res)=>{  
  return this.data=res.data;
  this.editPopup()
  this.isPopupOpen=!this.openPopup
  this.fetchData()
})

  }
  ,
  async deleteDataById(id:number){
    await axios.delete(`https://testing.myrtle-co.me/api/resorts/${id}?token=${this.SECRET_TOKEN}`)

  }

  },
  
})