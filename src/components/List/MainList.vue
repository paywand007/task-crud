<template>
    <div class="group max-w-[1200px] h-[580px] w-full m-auto py-10   relative group small:w-fit medium:max-w-fit small:h-[500px] small:m-auto">
      
        <div class="popup" v-if="store.isPopupOpen">
        <AddEdit/>
        </div>
      
  
      <!-- Your table goes here -->
      <div class="container mx-auto">
        <button @click="store.openPopup()" class="bg-blue-500 text-white m-3 px-4 py-2 rounded">Add Item</button>
  <table class="min-w-full bg-white border border-gray-300">
    <thead>
      <tr>
        <th class="py-2 px-4 border-b text-left">Image</th>
        <th class="py-2 px-4 border-b text-left">Name</th>
        <th class="py-2 px-4 border-b text-left">Phone</th>
        <th class="py-2 px-4 border-b text-left">isOpen</th>
        <th class="py-2 px-4 border-b text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
        
      <tr v-for="(item, index) in items" :key="index">
        <td class="py-2 px-4 border-b">{{ item.name }}</td>
        <td class="py-2 px-4 border-b">{{ item.phone }}</td>
        <td class="py-2 px-4 border-b">{{ item.isOpen }}</td>
        <td class="py-2 px-4 border-b">{{ item.image }}</td>
        <td class="flex gap-4">
          <span @click=" " class="action-ic on"><i class="fas fa-eye"></i></span>
          <span @click=" " class="action-icon"><i class="fas fa-edit"></i></span>
          <span @click=" " class="action-icon"><i class="fas fa-trash-alt"></i></span>
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
const { handleSubmit } = useForm({
  validationSchema: {
    fName(value: string) {
      if (!value || !value.length) {
        return "require"
      }
      return true;
    },
    phone(value: string) {
        if ((!value || !value.length) ) {
      
      return "require  ";}
      else if (!/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value)) return "must be a valid number "
    
      
   return true;
    },
 open(value: boolean) {
      if (!value) return 'required';
      return true;
    },
    
    }
})
  const store=useDataStore()
  onMounted(()=>{
    store.fetchData()

  })
  
 
  const items = ref([
    { name: 'John Doe', phone: '555-1234', isOpen: 'Yes', image: 'example.jpg' },
    // Add more items as needed
  ]);
  
  
  
  
   
  </script>
  
  <style scoped>
  .popup {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
  }
  
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
  }
  </style>
  