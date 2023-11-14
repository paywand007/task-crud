<template>
  <div class="popup-content w-[600px]">
    <span @click="closePopup" class="close-icon">&times;</span>
    <h2 class="text-2xl font-bold mb-4">Add New Item</h2>

    <form @submit.prevent="submit">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-600 small:w-fit">Name:</label>
        <input v-model="fName.value.value" type="text" id="name" name="name" class="mt-1 p-2 border rounded-md w-full">
        <span>{{ fName.errorMessage.value }}</span>
      </div>

      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-600">Phone:</label>
        <input v-model="phoneNumber.value.value" type="tel" id="phone" name="phone" class="mt-1 p-2 border rounded-md w-full">
        <span>{{ phoneNumber.errorMessage.value }}</span>
      </div>

      <div class="mb-4">
        <label for="isOpen" class="block text-sm font-medium text-gray-600">Is Open:</label>
        <input v-model="open.value.value" type="tel" id="isOpen" name="isOpen" class="mt-1 p-2 border rounded-md w-full">
        <span>{{ open.errorMessage.value }}</span>
      </div>

      <div class="mb-4">
        <label for="file" class="block text-sm font-medium text-gray-600">Choose File:</label>
        <input type="file" @change="handleFile" id="file" name="file" class="mt-1 p-2 border rounded-md w-full">
        <span>{{ open.errorMessage.value }}</span>
      </div>

      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">{{ route.params.id ? 'Update' : 'Add' }}</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useForm, useField } from 'vee-validate';
import { useDataStore } from '@/stores/store';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const store = useDataStore();

const { handleSubmit } = useForm({
  validationSchema: {
    fName(value: string) {
      if (!value || !value.length) {
        return 'require';
      }
      return true;
    },
    phone(value: string) {
      if (!value || !value.length) {
        return 'require';
      } else if (!/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value)) {
        return 'must be a valid number';
      }
      return true;
    },
    open(value:string) {
  const isValid = value === "0" || value === "1";

  if (!isValid) {
    return 'Invalid value. Please provide either 0 or 1.';
  }

  return true;
}
  },
});

const fName = useField<string>('fName');
const phoneNumber = useField<string>('phone');
const open = useField<string>('open');
const file = ref<File | null>(null);

const handleFile = (event: Event) => {
  file.value = (event.target as HTMLInputElement).files?.[0] || null;
};

const route = useRoute();
watch(route, async () => {
  console.log("Route Params ID:", route.params.id);

  if (route.params.id) {
    try {
      await store.fetchDataById(route.params.id);
      console.log("Fetched Data:", store.dataById);

      fName.value.value = store.dataById.name;
      phoneNumber.value.value = store.dataById.phone;
      open.value.value = store.dataById.isOpen;
      file.value = store.dataById.image;

      console.log("Form Fields:", fName.value.value, phoneNumber.value.value, open.value.value, file.value);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});

const closePopup = () => {
  // Clear the form fields after closing the popup
  fName.value.value = '';
  phoneNumber.value.value = '';
  open.value.value = '';
  file.value = null;
  store.openPopup();
  router.push('/');
};
const submit = handleSubmit(async () => {
  const formD = new FormData();
  formD.append('name', fName.value.value as string);
  formD.append('phone', phoneNumber.value.value);
  formD.append('isOpen', open.value.value);
  formD.append('image', file.value as File);
  route.params.id ? await store.editData(formD,route.params.id) : await store.postData(formD)
  closePopup();
  
});


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
