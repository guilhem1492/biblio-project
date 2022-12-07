import FormSignIn from "../components/Forms/FormSignIn";
import BackButton from "../components/BackButton/BackButton";
import "../styles/SignPages.css";

const Signin = () => {
  return (
    <div className="sign-pages">
      <BackButton />
      <FormSignIn />
    </div>
  );
};

export default Signin;
