 
 
  <template>
  {{store.data }}
<Slider/>
<MainList/>

 </template>

<script setup lang="ts">
import MainList from './components/List/MainList.vue';
import Slider from './components/Slider.vue';
import { useDataStore } from './stores/store';
const store=useDataStore()
 
</script> 