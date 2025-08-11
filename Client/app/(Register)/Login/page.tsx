import { Button } from "antd";



const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function Login() {

  await delay(3000);


  return (
    <section className="w-full h-screen bg-yellow-300 flex justify-center items-center">
      <form action="" className="w-[40%] h-[80%] bg-red-300 overflow-hidden p-5 rounded-md">
        <Button type="primary" href="/">Main page</Button>
      </form>
    </section>
  );
}
