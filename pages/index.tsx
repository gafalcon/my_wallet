import type { NextPage } from "next";
import { useGetCategoriesQuery } from "../graphql/client-types";

const Home: NextPage = () => {
  const { data, loading, error } = useGetCategoriesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold underline">My Wallet App</h1>
      <ul>
        {data?.categories.map((category, i) => (
          <li key={i}>{category?.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
