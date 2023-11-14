 
 
  <template>
  <nav class="flex justify-between rounded-full bg-gray-900  text-white max-w-[1200px]  my-5 m-auto">
      <div class="px-5 xl:px-12 py-6 flex w-full  items-center rounded">
        <a class="text-3xl font-bold font-heading rounded" href="#">
          CRUD APP 
        </a>
        </div>
        </nav>
<Slider/>
<MainList/>

 </template>

<script setup lang="ts">
 
import MainList from './components/List/MainList.vue';
import Slider from './components/Slider.vue';
import { useDataStore } from './stores/store';
const store=useDataStore()
 
</script> 