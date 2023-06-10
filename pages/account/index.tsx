import type { NextPage } from "next";
import Link from "next/link";
import { useGetAccountsQuery } from "../../graphql/client-types";

const AccountPage: NextPage = () => {
  const { data } = useGetAccountsQuery();

  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">My Accounts</h1>
        <Link href="/account/new" passHref>
          <a className="text-teal-600 transition duration-150 ease-in-out hover:text-teal-400 focus:text-teal-600 active:text-teal-700 dark:text-teal-400 dark:hover:text-teal-500 dark:focus:text-teal-500 dark:active:text-teal-600">
            <div>New account</div>
          </a>
        </Link>
      </div>
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Account
            </th>
            <th scope="col" className="px-6 py-4">
              Bank
            </th>
            <th scope="col" className="px-6 py-4 text-right">
              Total amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.accounts.map((account, i) => (
            <tr key={account.id} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {i + 1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 underline">
                <Link href={`/account/${account.id}`}>{account.name}</Link>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {account.bank.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right">
                {account.total_amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountPage;
