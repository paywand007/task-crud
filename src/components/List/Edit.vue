<template>
    
    <div class="popup-content w-[600px]">
      <!-- <span @click="  closePopup" class="back-icon"> </span>
     -->
 <div class="flex justify-between">   
     <h2 class="text-2xl font-bold mb-4">Update  Item</h2>
     <button @click="  closePopup" class=" py-2 px-3 rounded-full bg-black">
        
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
  <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill="black"/>
</svg>
    
    </button>
</div>
      <form   @submit.prevent="submit" >
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-600 small:w-fit">Name:</label>
          <input      v-model="fName.value.value" type="text" id="name" name="name" class="mt-1 p-2 border rounded-md w-full">
          <span>{{ fName.errorMessage.value }}</span>
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-600">Phone:</label>
          <input v-model="phoneNumber.value.value" type="tel" id="phone" name="phone" class="mt-1 p-2 border rounded-md w-full">
          <span class="text-[#ff5151] font-bold">{{ phoneNumber.errorMessage.value }}</span>
      </div>
      <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-600">Is Open :</label>
          <input v-model="open.value.value" type="text" id="phone" name="phone" class="mt-1 p-2 border rounded-md w-full">
          <span>{{ open.errorMessage.value }}</span>
      </div>
      <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-600">Image( Optional) :</label>
          <input  type="file" @change="handleFile" id="phone" name="phone" class="mt-1 p-2 border rounded-md w-full">
 
      </div>
  

        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>

</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref ,watch} from 'vue';
import { useForm, useField } from 'vee-validate';
import { useDataStore } from '@/stores/store';
import { useRouter,useRoute } from 'vue-router';


const router=useRouter()
const store=useDataStore()

const { handleSubmit } = useForm({
validationSchema: {
  fName(value: string) {
    if (!value || !value.length) {
      return "The Name is require"
    }
    return true;
  },
  phone(value: string) {
      if ((!value || !value.length) ) {
    
    return " The phone Number is require  ";}
    else if (!/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value)) return "must be a valid number "
  
    
 return true;
  },
  open(value: string) {
  if (value !== '0' && value !== '1') {
    return 'Enter 0 for NO and 1 for Yes';
  }
  
  return true;
},
  
  }
})


const fName = useField<string>("fName");
  const phoneNumber = useField<string>("phone");
  const open = useField<string>("open");
  const file=ref<File|null>(null)
  const handleFile = (event: Event) => {

file.value = (event.target as HTMLInputElement).files?.[0] || null;
};



const { id} = useRoute().params;
onMounted( () => {

id && store.fetchDataById(id ) 
fName.value.value = store.dataById.name;
 phoneNumber.value.value=store.dataById.phone;
 open.value.value=store.dataById.isOpen;
 file.value=store.dataById.image
});

const submit = handleSubmit( () => {
const formD =new FormData()
formD.append('name',fName.value.value as string)
formD.append('phone',phoneNumber.value.value)
formD.append('isOpen',open.value.value)
formD.append('image',file.value as File)
store.editData(formD,185)
closePopup()
});
const closePopup = () => {
store.editPopup()
 // Clear the form fields after closing the popup
  fName.value.value=''
  phoneNumber.value.value=''
  open.value.value=''
  file.value=null
  router.push('/')
   
};
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
  margin: auto;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
svg {
    fill: black;
}
</style>
