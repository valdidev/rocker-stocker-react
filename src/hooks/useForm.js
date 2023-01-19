import { useState } from "react";
import { validationsForm } from "../utils/validationForm";

export const useForm = (initialForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validationsForm(form));
    };


    return {
        form,
        errors,
        handleChange,
        handleBlur,
    };
};