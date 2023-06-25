import { Accessor, For, ParentComponent, Show } from "solid-js";
import { createStore, produce } from "solid-js/store"
import { Form, FormErrors, SubmitCallback } from "../types/Forms";
import { FormHelperText } from "@suid/material";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            validate: Validator[];
        }
    }
}

type Validator = (element: HTMLInputElement, ...rest: any[]) => (form: Form) => string;
type ValidatorConfig = {element: HTMLInputElement, validators: Validator[]}

const useForm = <T extends Form> (initialForm: T) => {
    const [form, setForm] = createStore(initialForm);
    const [errors, setErrors] = createStore<FormErrors>();

    const validatorFields: {[key: string]: ValidatorConfig} = {};

    const isValid = () => {
        const keys = Object.keys(errors);
        if(keys.length === 0 ){
            return false;
        }
        return !keys.some(errorKey => {
            return errors[errorKey].length > 0; 
        })
    }

    const handleInput = (e: any) => {
        const { name, value } = e.target;
        setForm(
            name as any,
            value as any
        )
    };

    const submitForm = (submitCallback: SubmitCallback<T>) => () => {
        for(const field in validatorFields) {
            const config = validatorFields[field];
            checkValidity(config)();
        }

        if(!isValid()){
            submitCallback(form);
        }
    }

    const validate = (ref: HTMLInputElement, accessor: Accessor<Validator[]>) => {
        const validators = accessor() || [];
        let config: ValidatorConfig;

        validatorFields[ref.name] = config = {element: ref, validators};

        ref.onblur = checkValidity(config);
        ref.oninput = () => {
            if(!errors[ref.name].length) {return;}
            checkValidity(config)();
        }
    }

    const checkValidity = ({element, validators}: ValidatorConfig) => () => {
        setErrors(element.name, []);

        for(const validator of validators) {
            const message = validator(element)(form);
            
            if(!!message){
                setErrors(produce(errors => {
                    errors[element.name].push(message);
                }))
            }
        }
    }

    return {
        form,
        handleInput,
        submitForm,
        validate,
        errors,
    };
}

export default useForm;