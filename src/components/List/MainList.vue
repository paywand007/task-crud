<template>
    <div class="group max-w-[1200px] h-[580px] w-full m-auto py-10   relative group small:w-fit medium:max-w-fit small:h-[500px] small:m-auto">
      

      <div v-if="isPopupOpen" class="popup ">
        <div class="popup-content w-[600px]">
          <span @click="closePopup" class="close-icon">&times;</span>
          <h2 class="text-2xl font-bold mb-4">Add New Item</h2>
          <!-- Your form for adding data goes here -->
          <form   @submit.prevent="submit" >
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600 small:w-fit">Name:</label>
            <input      v-model="fName.value.value" type="text" id="name" name="name" class="mt-1 p-2 border rounded-md w-full">
            <span>{{ fName.errorMessage.value }}</span>
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-600">Phone:</label>
            <input v-model="phoneNumber.value.value" type="tel" id="phone" name="phone" class="mt-1 p-2 border rounded-md w-full">
            <span>{{ phoneNumber.errorMessage.value }}</span>
        </div>
        <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-600">Is Open :</label>
            <input v-model="open.value.value" type="tel" id="phone" name="phone" class="mt-1 p-2 border rounded-md w-full">
            <span>{{ open.errorMessage.value }}</span>
        </div>
        <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-600">Is Open :</label>
            <input type="file" id="phone" name="phone" class="mt-1 p-2 border rounded-md w-full">
         
        </div>
          <!-- Add more fields as needed -->
  
          <button  type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add</button>
        </form>
        </div>
      </div>
  
      <!-- Your table goes here -->
      <div class="container mx-auto">
        <button @click="openPopup" class="bg-blue-500 text-white m-3 px-4 py-2 rounded">Add Item</button>
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
          <span @click=" " class="action-icon"><i class="fas fa-eye"></i></span>
          <span @click=" " class="action-icon"><i class="fas fa-edit"></i></span>
          <span @click=" " class="action-icon"><i class="fas fa-trash-alt"></i></span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import {useForm,useField} from "vee-validate";
 
 
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
    const fName = useField("fName");
    const phoneNumber = useField("phone");
    const open = useField("open");
  const isPopupOpen = ref(false);
  
 
  const items = ref([
    { name: 'John Doe', phone: '555-1234', isOpen: 'Yes', image: 'example.jpg' },
    // Add more items as needed
  ]);
  
  const openPopup = () => {
    isPopupOpen.value = true;
  };
  
  const closePopup = () => {
    isPopupOpen.value = false;
    // Clear the form fields after closing the popup
   
  };
  
  const addItem = () => {
    // Validate and add the new item to the items array
    items.value.push({ name: 'paywand ', phone: '1234', isOpen: 'Yes', image: 'example.jpg' });
    // Close the popup after adding the item
    closePopup();
  };
  
  // ... rest of your methods
  const submit = handleSubmit(async () => { addItem()})
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
  