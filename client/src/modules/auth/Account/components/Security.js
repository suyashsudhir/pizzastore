import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axios } from "../../../../utils";
import {Loader} from "semantic-ui-react";


function Security({ user }) {
    const [updatingPassword, setupdatingPassword] = useState(false);
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm();
  const handleChangePassword = (values) => {
    console.log(values)
      setupdatingPassword(true);
    if (values.password === "" || !values.password) {
      setError("password", {
        type: "required",
        message: "Current Password is required",
      });
      setupdatingPassword(false);
    } else if (values.newPass === "" || !values.newPass) {
      setError("newPass", {
        type: "required",
        message: "A Password is required",
      });
      setupdatingPassword(false);
    } else if (values.confirmPass === "" || !values.confirmPass) {
      setError("confirmPass", {
        type: "required",
        message: "Confirm Password ",
      });
      setupdatingPassword(false);
    } else if (values.confirmPass !== values.newPass) {
      setError("confirmPass", {
        type: "validate",
        message: "Passwords do not match",
      });
      
      setError("newPass", {
        type: "validate",
        message: "Passwords do not match",
      });
      setupdatingPassword(false);
    } else {
      axios
        .post("/users/updatePassword", {
          userid: user.id,
          password: values.password,
          email: user.email,
          newPassword: values.newPass,
        })
        .then((data) => {
          setupdatingPassword(false);
          if (data.data === "invalid password") {
            setError("password", {
              type: "validate",
              message: "Current Password is incorrect",
            });
          } else {
            window.localStorage.removeItem("token");
            window.location.reload();
          }
        })
        .catch((e) => setupdatingPassword(false));
    }
  };
  return (
    <div>
      <h2>Change Your Password</h2>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <div className="text-center ">
          <input
            type="password"
            style={{ width: "100%" }}
            className={errors.password ? "brand-input-error" : "brand-input"}
            placeholder="Current Password"
            {...register("password")}
          />
          {errors.password && (
            <div className="mt-1 text-red">{errors.password.message}</div>
          )}
        </div>
        <div className="text-center mt-3">
          <input
            type="password"
            style={{ width: "100%" }}
            className={errors.newPass ? "brand-input-error" : "brand-input"}
            placeholder="New Password"
            {...register("newPass")}
          />
          {errors.newPass && (
            <div className="mt-1 text-red">{errors.newPass.message}</div>
          )}
        </div>
        <div className="text-center mt-3">
          <input
            type="password"
            style={{ width: "100%" }}
            className={errors.confirmPass ? "brand-input-error" : "brand-input"}
            placeholder="Confirm Password"
            {...register("confirmPass")}
          />
          {errors.confirmPass && (
            <div className="mt-1 text-red">{errors.confirmPass.message}</div>
          )}
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="brand-btn" style={{ width: "100%" }}>
            {updatingPassword ? (
              <Loader
                active={true}
              />
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Security;
