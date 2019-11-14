import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import {
  withFormik,
  Form,
  Field,
  validateYupSchema,
  yupToFormErrors
} from "formik";

// Styling

const StyledDiv = styled.div`
  border: 1px solid blue;
  height: 400px;
  display: flex;
  flex-direction: column;
  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .submit-button {
    width: "30px";
  }
`;

function UserOnboardingForm(props) {
  console.log(props);
  return (
    <StyledDiv className="New-user-form">
      <h1>Enter New User</h1>
      <Form className="form">
        <label>
          First Name:
          <Field
            type="text"
            name="first_name"
            placeholder="Enter your first name here"
          />
        </label>{" "}
        <br />
        <label>
          Last Name:
          <Field
            type="text"
            name="last_name"
            placeholder="Enter your last name here"
          />
        </label>
        <br />
        {/* 
        <br />
        <label>
          I confirm I have read and agree to the Terms of Service
          <Field type="checkbox" name="terms of service" />
        </label> */}
        <Field className="submit-button" type="submit" />
      </Form>
    </StyledDiv>
  );
}

const UserOnboardingFormWithFormik = withFormik({
  mapPropsToValues() {
    return {
      first_name: "",
      last_name: ""
      // password: "",
    };
  },
  validationSchema: Yup.object().shape({
    first_name: Yup.string().required("Please enter first name"),
    last_name: Yup.string().required("Please enter last name")
    //   password: Yup.string().required("password is a required field")
  }),

  handleSubmit(values, tools) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log(res.data);
        tools.resetForm();
      })
      .catch(err => {
        console.log(err);
      });
  }
})(UserOnboardingForm);

export default UserOnboardingFormWithFormik;
