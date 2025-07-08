import LoginBanner from "./LoginBanner";
import SocialLoginButtons from "./SocialLoginButtons";

const Login = () => {
  return (
    <div className="h-[100vh] flex flex-col">
      <LoginBanner />
      <SocialLoginButtons />
    </div>
  );
};
export default Login;
