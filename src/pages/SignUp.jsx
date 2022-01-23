import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  // instead of having multiple state for each field we have an OBJ that contains everything
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // then use them destructured
  const { name, email, password } = formData;
  const navigate = useNavigate();

  // On change of input
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value, // here we get whatever id (mail, pw) and change it's value
    }));
  };

  // onSubmit functionality
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // get the user from user CREDENTIAL
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      }); // get the current user

      // form data copy cuz we dont wanna change the state
      const formDataCopy = { ...formData };
      // we dont want pw to be registered in DB
      delete formDataCopy.password;
      // and set the date when we submit it
      formDataCopy.timestamp = serverTimestamp();

      // add everything in thee DB
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Oups! Check your infos");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome to the fam</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="name"
              className="nameInput"
              placeholder="Full name"
              id="name"
              value={name}
              onChange={onChange}
            />

            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* Google auth */}
          <Link to="/sign-in" className="registerLink">
            Already have an account ? signUp
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
