import axiosInstance from "./axiosInstance";
import FormData from "form-data";

export const login = async (payload) => {
  try {
    const { data } = await axiosInstance.post("users/login", payload);

    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (payload) => {
  try {
    let apiPayload = new FormData();

    apiPayload.append("image", payload.imgFile);
    apiPayload.append("email", payload.email);
    apiPayload.append("password", payload.password);
    apiPayload.append("passwordConfirm", payload.confirm_password);
    apiPayload.append("firstName", payload.first_name);
    apiPayload.append("lastName", payload.last_name);
    apiPayload.append("numTel", payload.phone_number);
    apiPayload.append("adresse", payload.address);
    apiPayload.append("dob", payload.dob);
    apiPayload.append("gender", payload.gender);
    apiPayload.append("role", payload.role);

    const { data } = await axiosInstance.post("users/signup", apiPayload);

    return data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/auth/forgot-password", payload);
  } catch (error) {
    return error;
  }
};

export const resetPassword = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/auth/forgotpassword", payload);

    return data;
  } catch (error) {
    return error;
  }
};

export const getMe = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/me");
  } catch (error) {
    return error;
  }
};

export const initiateConversation = async (_id) => {
  try {
    const { data } = await axiosInstance.post('conversations/initiate', { _id: _id });

    return data;
  } catch (error) {
    throw error?.response?.data?.message || 'Quelque chose s\'est mal passé'
  }
}


export const getConversations = async () => {
  try {
    const { data } = await axiosInstance.get('conversations/myConversations');

    return data;
  } catch (error) {
    throw error?.response?.data?.message || 'Quelque chose s\'est mal passé'
  }
}

export const getMessages = async (userId) => {
  try {
    const { data } = await axiosInstance.get('conversations/messages/' + userId);

    return data;
  } catch (error) {
    throw error?.response?.data?.message || 'Quelque chose s\'est mal passé'
  }

}

// export const getServicesByRole = async (role) => {
//   try {
//     // getInfirmiereService
//     // getKineService
//     // getSageFemmeService

//     let endpoint = "";
//     switch (role) {
//       case value:

//         break;

//       default:
//         break;
//     }
//   } catch (error) {

//   }
// }

export const getProximity = async (payload) => {
  try {
    const { data } = await axiosInstance.post('appointments/getAvailablePersonnelSanteInMyzone', payload);

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export const saveLocation = async (payload) => {
  try {
    const { data } = await axiosInstance.patch("users/updateCoordinate", payload);

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export const getMyAppointmentsPersonnelSante = async () => {
  try {
    const { data } = await axiosInstance.get("appointments/getMyAppointmentsPersonnelSante");

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export const getMyAppointments = async () => {
  try {
    const { data } = await axiosInstance.get("appointments/getMyAppointments");

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export const createAppointment = async (payload) => {
  try {
    const { data } = await axiosInstance.post('appointments/createAppointment', payload);

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
}

export const cancelMyAppointmentPatient = async (id) => {
  try {
    const { data } = await axiosInstance.patch('appointments/cancelMyAppointmentPatient/' + id);

    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
}

export const ratePersonnelSante = async (payload) => {
  try {
    const { data } = await axiosInstance.patch('appointments/ratePersonnelSante', payload);

    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
}

export const acceptAppointment = async (id) => {
  try {
    const { data } = await axiosInstance.patch('appointments/acceptAppointment/' + id);

    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
}

export const refuseAppointmentPersonnelSante = (id) => {
  try {
    const { data } = axiosInstance.patch('appointments/refuseAppointmentPersonnelSante/' + id);

    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
}

export const updateWorkingTime = async (payload) => {
  try {
    const { data } = await axiosInstance.patch('users/updateWorkingTime', payload);

    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
}

export const updateProfile = async (payload) => {
  try {
    const { data } = await axiosInstance.patch('users/updateMyProfile', payload);

    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
}

export const updateUserPassword = async (payload) => {
  try {
    const { data } = await axiosInstance.patch('users/updateUserPassword', payload);

    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
}