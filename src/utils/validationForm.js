export const validationsForm = (form) => {
    let errors = {};

    let regexText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPhone = /^[0-9]{9}$/;

    if (!form.name.trim()) {
        errors.name = "Name field is required";
    } else if (!regexText.test(form.name.trim())) {
        errors.name = "Only accepts letters and white spaces";
    }

    if (!form.surname.trim()) {
        errors.surname = "Surname field is required";
    } else if (!regexText.test(form.surname.trim())) {
        errors.surname = "Only accepts letters and white spaces";
    }

    if (!form.phone.trim()) {
        errors.phone = "Phone field is required";
    } else if (!regexPhone.test(form.phone.trim())) {
        errors.phone = "Phone field only accepts 9 numbers";
    }

    return errors;
};