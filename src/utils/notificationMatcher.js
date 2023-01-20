import { toast } from "react-hot-toast";

export const toastNotification = (response) => {
    if (response.success) {
        toast.success(response.message);
    } else {
        toast.error(response.message);
    }
};

export const axiosErrorNotification = (error) => {
    toast.error(error.message)
};