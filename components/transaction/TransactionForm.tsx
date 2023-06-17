import { Button } from "../design/Button";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
/* import { useRouter } from "next/router"; */
import {
  useGetAccountsQuery,
  useCreateTransactionMutation,
  TransactionType,
} from "../../graphql/client-types";

interface FormValues {
  amount: string;
  accountId: string;
  type: TransactionType;
}

export const TransactionForm = () => {
  /* const router = useRouter(); */
  const { data } = useGetAccountsQuery();
  const [createTransaction] = useCreateTransactionMutation();

  const accounts = data?.accounts || [];

  console.log({ accounts });
  const NewTransactionSchema = Yup.object().shape({
    accountId: Yup.number().min(1).required("Required"),
    amount: Yup.number().required("Required"),
    type: Yup.string().required(),
  });

  const onSubmit = async (
    { accountId, amount, type }: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const variables = {
      type,
      accountId: parseInt(accountId),
      amount: parseFloat(amount),
    };
    const result = await createTransaction({ variables });
    console.log(result.data);
    setSubmitting(false);
    /* router.push("/transaction"); */
  };

  return (
    <Formik
      initialValues={{
        type: TransactionType.Debit,
        accountId: "",
        amount: "0",
      }}
      validationSchema={NewTransactionSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <label className="mt-3 font-bold" htmlFor="type">
            Type of transaction
          </label>
          <Field type="text" name="type" />
          <ErrorMessage className="text-red-500" name="name" component="div" />

          <label className="mt-3 font-bold" htmlFor="bank">
            Bank
          </label>
          <Field as="select" id="" name="accountId">
            <option value={0}>Select Account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id!}>
                {acc.name}
              </option>
            ))}
          </Field>

          <label className="mt-3 font-bold" htmlFor="amount">
            Amount
          </label>
          <Field type="number" name="amount" />
          <ErrorMessage
            className="text-red-500"
            name="amount"
            component="div"
          />

          <Button className="mt-4 mx-0" type="submit" disabled={isSubmitting}>
            Create Transaction
          </Button>
        </Form>
      )}
    </Formik>
  );
};
