import Vue from 'vue'
import {
    Autocomplete,
    Input,
    Button,
    ButtonGroup,
    Tooltip,
    Tag,
    Popover,
    InputNumber,
    Dialog,
    Radio,
    RadioButton,
    RadioGroup,
    MessageBox,
    Message,
    DatePicker,
    Cascader,
    Checkbox,
    Upload
    // CheckboxButton,
    // CheckboxGroup,
} from 'element-ui'
Vue.use(Autocomplete)
Vue.use(Input)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(Popover)
Vue.use(InputNumber)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(Cascader)
Vue.use(Upload)
// Vue.use(CheckboxButton)
// Vue.use(CheckboxGroup)
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
