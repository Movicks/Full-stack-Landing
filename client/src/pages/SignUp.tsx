import FormHeader from "../components/forms/FormHeader";
import SignupForm from "../components/forms/SignupForm";

type Props = {};

export default function SignUp({}: Props) {
  return (
    <div className="flex items-center justify-center h-full w-full px-3">
      <div className="w-full max-w-[30rem] md:border-2 flex flex-col gap-7 md:shadow-custom md:px-5 py-8">
        <FormHeader
          title="Sign Up"
          description="Create an account to access the this site."
        />
        <SignupForm />
      </div>
    </div>
  );
}
