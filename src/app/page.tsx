import SignupForm from "@/src/features/auth/ui/SignUp";
import LoginForm from "@/src/features/auth/ui/Login";

export default function loginPage() {
  return (
    <div className="">
      <LoginForm />
      <SignupForm />
    </div>
  );
}
