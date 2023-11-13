import { defineRule } from "vee-validate";
import { required} from "@vee-validate/rules";
defineRule('required', required)
 
defineRule("phone",( value: string)=> {
  if ((!value || !value.length) ) {

return "require  ";}
else if (!/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value)) return "must be a valid number "


return true;
});
