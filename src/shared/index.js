import vue from "vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FormGroup from "@/components/FormGroup";
import ShimmerLoader from "@/components/ShimmerLoader";
import Pagination from "@/components/Pagination";
import ToolTip from "@/components/ToolTip";
import Button from "@/components/Button";
import GenericDialog from "@/components/GenericDialog";
import CustomToggle from "@/components/CustomToggle";
import InputText from "@/components/Input/Text"
import InputDate from "@/components/Input/Date"
import InputCounter from "@/components/Input/Counter"
import InputTextArea from "@/components/Input/TextArea"
import InputPassword from "@/components/Input/Password"
import InputSelect from "@/components/Input/Select"
import InputNumber from "@/components/Input/Number";
import StatisticsCard from "@/components/StatisticsCard";
import CustomTable from "@/components/CustomTable";
import CustomDialog from "@/components/CustomDialog";
import ImageUpload from "@/components/ImageUpload";
import ExpansionPanels from "@/components/ExpansionPanels";
import ExpansionPanelsItem from "@/components/ExpansionPanels/Item";
import ImageDialog from "@/components/ImageDialog";
import Divider from "@/components/Divider";
import DialogHeader from "@/components/DialogHeader"
import ShowDialog from "@/components/ShowDialog";

// components
vue.component("ShowDialog", ShowDialog);
vue.component("Divider", Divider);
vue.component("DialogHeader", DialogHeader);
vue.component("ImageDialog", ImageDialog);
vue.component("ExpansionPanels", ExpansionPanels);
vue.component("ExpansionPanelsItem", ExpansionPanelsItem);
vue.component("CustomTable", CustomTable);
vue.component("CustomDialog", CustomDialog);
vue.component("ImageUpload", ImageUpload);



vue.component("ValidationProvider", ValidationProvider);
vue.component("ValidationObserver", ValidationObserver);
vue.component("FormGroup", FormGroup);
vue.component("ToolTip", ToolTip);
vue.component("InputNumber", InputNumber);
vue.component("InputSelect", InputSelect);
vue.component("InputPassword", InputPassword);
vue.component("InputTextArea", InputTextArea);
vue.component("InputText", InputText);
vue.component("InputDate", InputDate);
vue.component("InputCounter", InputCounter);

vue.component("ShimmerLoader", ShimmerLoader);
vue.component("Pagination", Pagination);
vue.component("Button", Button);
vue.component("GenericDialog", GenericDialog);
vue.component("custom-toggle", CustomToggle);
vue.component('statistics-card', StatisticsCard)