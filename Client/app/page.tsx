import { Button } from "antd";


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function Home() {
    await delay(1000);

  return (
    <>
      This is main page.
      <Button type="primary" href="/Login">Login page</Button>
    </>
  );
}
