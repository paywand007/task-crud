<script setup lang="ts">
import Slider from './components/Slider.vue';
import MainList from './components/List/MainList.vue';
import {useDataStore} from './stores/store'
const data=useDataStore()
</script>

 
 <template>
    {{ data }}
  <Slider/>
  <MainList/>
 </template>
 
