import type { NextPage } from "next";
import { TransactionForm } from "../../components/transaction/TransactionForm";

const TransactionPage: NextPage = () => {
  return (
    <>
      <h1>My transactions</h1>
      <TransactionForm />
    </>
  );
};

export default TransactionPage;
