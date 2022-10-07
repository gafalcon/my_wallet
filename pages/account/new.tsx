import { AccountForm } from "../../components/account/AccountForm";
import type { NextPage } from "next";

const New: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl mb-4">New Account</h1>
      <AccountForm />
    </div>
  );
};
export default New;
