import { NextPage } from "next";
import { useRouter } from "next/router";
import { TransactionsTable } from "../../components/transaction/TransactionsTable";
import { useGetAccountQuery } from "../../graphql/client-types";

const AccountPage: NextPage = () => {
  const router = useRouter();
  const { accountid } = router.query;
  const { data, loading } = useGetAccountQuery({
    variables: { id: parseInt(accountid as string) },
  });
  if (loading || !data?.account) {
    return <h1>Loading...</h1>;
  }
  const { account } = data;

  return (
    <>
      <h1 className="text-3xl mb-4 text-primary-content">Account Page</h1>
      <section className="details">
        <div className="card bg-neutral text-primary-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">{account.name}</h2>
            <p>{account.bank.name}</p>
            <p className="text-2xl">${account.total_amount}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add transaction</button>
            </div>
          </div>
        </div>
      </section>
      <section className="transactions mt-4">
        <h2 className="text-2xl">Transactions</h2>
        <TransactionsTable transactions={account.transactions} />
      </section>
    </>
  );
};

export default AccountPage;
