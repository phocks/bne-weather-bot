import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import faunadb from "https://esm.sh/faunadb@4.7.1";

const q = faunadb.query;

const client = new faunadb.Client({
  secret: Deno.env.get("FAUNA_DB_SECRET") || "",
  // NOTE: Use the correct endpoint for your database's Region Group.
  endpoint: "https://db.us.fauna.com/",
});

const createP = client.query(
  q.Create(q.Collection("test"), { data: { testField: "testValue" } })
);

const createTest = async () => {
  const response = await createP;

  console.log(response);
};

export { createTest };
