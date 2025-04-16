import { useVuelidate } from '@vuelidate/core';
import { reactive, toRefs } from "vue";
import {commentSchema} from "~/validations/comment.validation";

const schemas = {
    comment: commentSchema
}

export function useFormValidation(formKey: keyof typeof schemas, initialData: Record<string, any>) {
    const form = reactive({ ...initialData });
    const rules = schemas[formKey];
    const validation$ = useVuelidate(rules, form);

    const error = (field: keyof typeof form): string[] | undefined => {
        const f = validation$.value[field];
        if (!f || !f.$error) return undefined;
        return f.$errors.map(e => e.$message || e.$validator);
    }

    return {
        ...toRefs(form),
        validation$,
        error
    }
}
