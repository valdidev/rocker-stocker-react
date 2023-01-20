export const validationsForm = (form) => {

    let errors = {
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    let regexText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[rockerstocker]+\.com$/;
    let regexPhone = /^[0-9]{9}$/;
    let regexPassword = /^.{8,}$/;

    // NAME
    if (!form?.name?.trim()) {
        errors.name = "Name field is required";
    } else if (!regexText.test(form.name.trim())) {
        errors.name = "Name only accepts letters";

    }

    // SURNAME
    if (Object.hasOwn(form, "surname")) {
        if (!form?.surname?.trim()) {
            errors.surname = "Surname field is required";

        } else if (!regexText.test(form.surname.trim())) {
            errors.surname = "Surname only accepts letters";

        }
    }

    // EMAIL
    if (!form?.email?.trim()) {
        errors.email = "Email field is required";

    } else if (!regexEmail.test(form.email.trim())) {
        errors.email = "Email must to be like username@rockerstocker.com";
    }

    // PASSWORD
    if (!form?.password?.trim()) {
        errors.password = "Password field is required";

    } else if (!regexPassword.test(form.password.trim())) {
        errors.password = "Password must be at least 8 characters";

    }

    // CONFIRM PASSWORD
    if (!form?.confirmPassword?.trim()) {
        errors.confirmPassword = "Confirm password field is required";

    } else if (form?.password !== form?.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";

    }

    // PHONE
    if (Object.hasOwn(form, "phone")) {
        if (!form?.phone?.trim()) {
            errors.phone = "Phone field is required";

        } else if (!regexPhone.test(form.phone.trim())) {
            errors.phone = "Phone field only accepts 9 numbers";
        }
    }

    return errors;
};