<template>
    <div class="group max-w-[1200px] h-[580px] w-full m-auto py-10   relative group small:w-fit medium:max-w-fit small:h-[500px] small:m-auto">
      
        <div class="popup" v-if="store.isPopupOpen">
        <AddEdit />
        </div>
        <div v-if="store.isViewPopupOpen">
          <div v-if="store.isViewPopupOpen" class="popup-content w-[600px]">
    <span @click="closeViewPopup" class="close-icon">&times;</span>
    <h2 class="text-2xl font-bold mb-4">View Item</h2>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-600 small:w-fit">Name:</label>
      <p>{{ store.dataById.name }}</p>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-600">Phone:</label>
      <p>{{ store.dataById.phone }}</p>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-600">Is Open:</label>
      <p>{{ store.dataById.isOpen }}</p>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-600">Image:</label>
      <img :src="store.dataById.image" alt="Item Image" class="w-full rounded-md">
    </div>
  </div>
    </div>
  
      <!-- Your table goes here -->
      <div class="container mx-auto">
        <button @click="store.openPopup()" class="bg-gray-900 text-white m-3 px-4 py-2 rounded">Add Item</button>
  <table class="min-w-full bg-white border border-gray-300">
    <thead>
      <tr>
        <th class="py-2 px-4 border-b text-left">Name</th>
        <th class="py-2 px-4 border-b text-left">Phone</th>
        <th class="py-2 px-4 border-b text-left">isOpen</th>
        <th class="py-2 px-4 border-b text-left">Image</th>
        <th class="py-2 px-4 border-b text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
        
      <tr v-for="(item) in store.data.data" :key="item.id">
        <td class="py-2 px-4 border-b">{{ item.name }}</td>
        <td class="py-2 px-4 border-b">{{ item.phone }}</td>
        <td class="py-2 px-4 border-b">{{ item.isOpen === "1"?'YES':'No' }}</td>
        <td class="py-2 px-4 border-b"><img :src="item.image"/></td>
        <td class="flex gap-4">
          <span @click="openView(item.id) " class="action-ic on"><i class="fas fa-eye"></i></span>
        
        
          <span @click="openEdit(item.id) " class="action-icon"><i class="fas fa-edit"></i></span>
        
        
        
          <span @click="confirmDelete(item.id as number) " class="action-icon"><i class="fas fa-trash-alt"></i></span>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <button @click="store.postData()" class="bg-[#524545]">addd</button> -->
</div>
    </div>
   

  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import {useForm,useField} from "vee-validate";
import AddEdit from './AddEdit.vue'; 
import { useDataStore } from '@/stores/store';
import { useRouter, useRoute } from "vue-router";
 



  const store=useDataStore()
 const router=useRouter()
 
  const openEdit=(id:number)=>{
    
    console.log('id',id)
    router.push(`/AddEdit/${id}`)
    store.fetchDataById(id)
    store.openPopup()
   
 
    
  }
  onMounted(()=>{
    store.fetchData()

  })
  const openView = (item:number) => {
    store.viewPopup();
   store.fetchDataById(item)
  };

  const closeViewPopup = () => {

    store.viewPopup();
  };
  const confirmDelete = (id:number) => {
  const isConfirmed = window.confirm('Are you sure you want to delete this item?');

  if (isConfirmed) {
    deleteItem(id);
    store.fetchData()
  }
};

const deleteItem = (id :number) => {
  if (id) {
    // Assuming you have a method in your store to delete data by ID
    store.deleteDataById(id);
    // Optionally, you can redirect the user to a different route or perform other actions after deletion.
   
    router.push('/');
    store.fetchData()
  }
};

 
  
  
  
  
   
  </script>
  
  <style scoped>
 .popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }  </style>
  