import dayjs from "dayjs";

export interface TransactionsTableProps {
  transactions: { amount: number; date: string; type: "DEBIT" | "PROFIT" }[];
}
export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const getAmount = (amount: number, type: string) => {
    if (type === "DEBIT") {
      return <td className="text-right text-error"> $ -{amount} </td>;
    }
    return <td className="text-right text-success"> $ {amount} </td>;
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Type</th>
            <th>Date</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>{transaction.type}</td>
              <td>{dayjs(transaction.date).format("YY/MM/DD hh:mm")}</td>
              {getAmount(transaction.amount, transaction.type)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
