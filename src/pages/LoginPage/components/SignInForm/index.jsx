import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { connect, useDispatch } from "react-redux";
import { loginAction } from "../../actions";
import { useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectAccessToken } from "../../../../containers/ClientContainer/selector";

const propTypes = {
  accessToken: PropTypes.string,
};


function SignInForm({ accessToken }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    username: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const cbSuccess = () => {
        toast.success("You are logged in successfully!");
        navigate('/');
  }

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { username, password } = state;
    dispatch(loginAction(username, password, cbSuccess));
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, []);


  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className="mb-2 text-black text-4xl">Sign in</h1>
        <input
          type="text"
          placeholder="Email"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <button>Sign In</button>
      </form>
    </div>
  );
}

SignInForm.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
    accessToken: selectAccessToken
})

export default connect(mapStateToProps)(SignInForm);
