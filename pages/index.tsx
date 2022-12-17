import Image from "next/image";
import { Button } from "../src/components/Button/Button";
import { Input } from "../src/components/Input/Input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Auction } from "../scripts/interact";
import { useMetaMask } from "metamask-react";

export default function Home() {
  const router = useRouter();
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [userRegistered, setUserRegisterd] = useState<boolean>(false);
  const [userExists, setUserExists] = useState<boolean>(false);

  useEffect(() => {
    if (status === "connected") {
      router.push("/dashboard");
    }
  }, [status, userExists, userRegistered]);

  const signUp = async () => {
    return Auction.methods.register(account, "teste", "teste").call();
  };

  const signIn = async () => {
    return Auction.methods.login(account, "teste").call();
  };

  const logIn = async () => {
    await connect();
    if (status === "connected") {
      signIn().then((value) => {
        setUserExists(value);
      });
      if (userExists === true) {
        console.log("user exists");
        router.push("/dashboard");
      } else {
        signUp().then((value) => {
          setUserRegisterd(value);
        });

        if (userRegistered === true) {
          console.log("user registered");
          router.push("/dashboard");
        }
      }
    } else {
      return;
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <section
        className="w-1/2 bg-gradient-to-r
    from-blue-400
    via-blue-600
    to-blue-700
    background-animate
    flex
    flex-col
    items-center
    justify-center
    "
      >
        <h1 className="uppercase text-8xl font-light text-yellow-300 animate-bounce">
          Its time to win
        </h1>
        <h4 className="text-cyan-50 text-3xl pt-5">
          Here you can find and sell
          <strong className="text-yellow-300 "> everything</strong>
        </h4>
      </section>
      <section className="w-1/2 justify-center items-center flex flex-col h-full border relative">
        <Image
          src={require("../src/components/assets/img/logo.png")}
          alt={"logo of the auction website"}
          width={100}
          height={100}
          className="absolute top-20"
        />

        <div className="w-1/2 flex flex-col ">
          <h2 className="uppercase pb-10 font-bold text-4xl text-blue-700">
            LOGIN
          </h2>

          <Button
            label={"CONNECT WITH METAMASK"}
            query={
              "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
            }
            onClick={() => {
              logIn();
            }}
          />
        </div>
      </section>
    </div>
  );
}
