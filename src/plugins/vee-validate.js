import vue from "vue";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import FormGroup from "@/components/FormGroup";
import * as rules from "vee-validate/dist/rules";

import i18n from "@/lang";

vue.component("ValidationProvider", ValidationProvider);
vue.component("ValidationObserver", ValidationObserver);
vue.component("FormGroup", FormGroup);
//messages for all rules
const customMessages = {
  getMessage(_, values) {
    let mimesRule;
    if (typeof values == "object") {
      const spreadData = (({ _field_, _value_, _rule_, ...values }) => values)(
        values
      );
      mimesRule = Object.values(spreadData).join(",");
    }

    return i18n.t(`validation.${values._rule_}`, {
      field: i18n.t(`fields.${values._field_}`),
      max: values.length,
      min: values.length,
      max_value: values.max,
      comparedField: i18n.t(`fields.${values.comparedField}`),
      mimes: mimesRule,
      size : values.size
    });
  }
};

// extend("phoneOrEmail", phoneOrEmailRule);
//All rules
Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule],
    message: customMessages.getMessage
  });
});
