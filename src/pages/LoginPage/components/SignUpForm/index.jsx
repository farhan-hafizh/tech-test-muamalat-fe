import React from "react";
import { validatePassword, validateUsername } from "../../../../utils/validationHelper";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerAction } from "../../actions";
function SignUpForm() {
  const [state, setState] = React.useState({
    username: "",
    password: ""
  });
  const dispatch = useDispatch();

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const cbSuccess = () => { 
    toast.success("You are registered successfully!");
  }

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { username, password } = state;

    const emailIsValid = validateUsername(username);
    const passwordIsValid = validatePassword(password);

    if (emailIsValid && passwordIsValid) {
        dispatch(registerAction(username, password, cbSuccess));
    } else {
      let errorMessage = "";
      if (!emailIsValid) {
        errorMessage += "Invalid email format. ";
      }
      if (!passwordIsValid) {
        errorMessage +=
          "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a symbol. ";
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className="text-black text-4xl mb-2 w-1/2">Create Account</h1>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
        />
        
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
