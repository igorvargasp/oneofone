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
          <strong className="text-yellow-300 "> Your things</strong>
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

          <Input
            label={"Public Address"}
            placeholder={"type your address"}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                ></path>
              </svg>
            }
          />
          <Input
            label={"Password"}
            placeholder={"type your password"}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            }
          />

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
