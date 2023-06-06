import { FormProps, UserData } from "../types";

export const validate = (
  errorData: UserData,
  setErrorData: (arg0: UserData) => void,
  userData: UserData
) => {
  let value;
  if (!userData.firstname) {
    const errors = { ...errorData};
    errors.firstname = "First Name is required";
    setErrorData(errors);
  }
  if (!userData.lastname) {
    const errors = { ...errorData};
    errors.lastname = "Last Name is required";
    setErrorData(errors);
  }
  const person: any = errorData;
  if (Object.keys(errorData).filter((k) => person[k]).length) {
    value = true;
  } else {
    value = false;
  }
  return value;
};

/**
 *
 * @param param0
 * @param userData
 * @param setUserData
 * @param errorData
 * @param setErrorData
 *
 */

export const handleInputChange = async (
  { name, value, error }: FormProps,
  userData: UserData,
  setUserData: (userData: UserData) => void,
  errorData: UserData,
  setErrorData: (errorData: UserData) => void
) => {
  const fields: any = { ...userData};
  const fieldErrors: any = { ...errorData};
  fields[name] = value;
  fieldErrors[name] = error;
  setUserData(fields);
  setErrorData(fieldErrors);
};

export const initialData = {
  firstname: "",
  lastname: "",
};

export const initialErrorData = {
  firstname: "",
  lastname: "",
};
