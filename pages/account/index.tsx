import type { NextPage } from "next";
import Link from "next/link";
import { useGetAccountsQuery } from "../../graphql/client-types";

const AccountPage: NextPage = () => {
  const { data } = useGetAccountsQuery();

  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
      <h1 className="text-3xl font-bold">Accounts</h1>
      <ul>
        {data.accounts.map((account) => (
          <li key={account.id}>
            {account.bank.name}:{account.name}
          </li>
        ))}
      </ul>

      <Link href="/account/new">New Account</Link>
    </div>
  );
};

export default AccountPage;
