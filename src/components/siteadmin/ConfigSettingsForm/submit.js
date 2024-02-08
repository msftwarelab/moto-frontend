import { updateConfigSettings } from "../../../actions/siteadmin/ConfigSettings/updateConfigSettings";

async function submit(values,dispatch){
   console.log(values);

   await dispatch(updateConfigSettings(values))
}

export default submit;