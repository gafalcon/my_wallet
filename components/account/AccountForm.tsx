import {
  useGetBanksQuery,
  useCreateAccountMutation,
} from "../../graphql/client-types";
import { Button } from "../design/Button";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  name: string;
  bankId: string;
  total_amount: string;
}

export const AccountForm = () => {
  const { data } = useGetBanksQuery();
  const [createAccount] = useCreateAccountMutation();

  const banks = data?.banks || [];

  const NewAccountSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    bankId: Yup.number().min(1).required("Required"),
    total_amount: Yup.number(),
  });

  const onSubmit = async (
    { name, bankId, total_amount }: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const variables = {
      name,
      bankId: parseInt(bankId),
      total_amount: parseFloat(total_amount),
    };
    const result = await createAccount({ variables });
    console.log(result.data);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        bankId: "",
        total_amount: "",
      }}
      validationSchema={NewAccountSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <label className="mt-3 font-bold" htmlFor="name">
            Account Name
          </label>
          <Field type="text" name="name" />
          <ErrorMessage className="text-red-500" name="name" component="div" />

          <label className="mt-3 font-bold" htmlFor="bank">
            Bank
          </label>
          <Field as="select" id="" name="bankId">
            <option value={0}>Select Bank</option>
            {banks.map((bank) => (
              <option key={bank!.id} value={bank!.id}>
                {bank!.name}
              </option>
            ))}
          </Field>

          <label className="mt-3 font-bold" htmlFor="total_amount">
            Total Amount
          </label>
          <Field type="number" name="total_amount" />
          <ErrorMessage
            className="text-red-500"
            name="total_amount"
            component="div"
          />

          <Button className="mt-4 mx-0" type="submit" disabled={isSubmitting}>
            Create Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};
