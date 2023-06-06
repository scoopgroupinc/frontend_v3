import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AppForm = ({ initialValues, onSubmit, validationSchema, children }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { initialValues },
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  return function(control) {
  return <>{children}</>
};
};

export default AppForm;
