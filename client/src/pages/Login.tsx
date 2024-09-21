import FormHeader from "../components/forms/FormHeader";
import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-full w-full px-3">
      <div className="w-full max-w-[30rem] md:border-2 flex flex-col gap-7 md:shadow-custom md:px-5 py-8">
        <FormHeader
          title="Login"
          description="Login to access the this site."
        />
        <LoginForm />
      </div>
    </div>
  );
}
