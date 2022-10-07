import type { NextPage } from "next";
import { useState } from "react";
import { Button } from "../components/design/Button";
import { AccountForm } from "../components/account/AccountForm";
import {
  useGetCategoriesQuery,
  useCreateBankMutation,
} from "../graphql/client-types";

const Home: NextPage = () => {
  const [bankName, setBankName] = useState("");
  const { data, loading, error } = useGetCategoriesQuery();

  const [createBank, { loading: mutationLoading, error: mutationError }] =
    useCreateBankMutation();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const onChange = (e: any) => {
    setBankName(e.target.value);
  };

  const onClick = async () => {
    const result = await createBank({ variables: { name: bankName } });
    console.log(result);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">My Wallet App</h1>
      <ul>
        {data?.categories.map((category, i) => (
          <li key={i}>{category?.value}</li>
        ))}
      </ul>

      <input name="name" type="text" value={bankName} onChange={onChange} />

      <Button onClick={onClick}>Create Bank</Button>

      <br />
    </div>
  );
};

export default Home;
