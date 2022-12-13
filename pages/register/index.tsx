import Image from "next/image";
import { Button } from "../../src/components/Button/Button";
import { Input } from "../../src/components/Input/Input";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

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
        <h1 className="uppercase text-cyan-50 text-8xl font-light text-yellow-300 animate-bounce">
          Its time to win
        </h1>
        <h4 className="text-cyan-50 text-3xl pt-5 pr-64">
          Here you can find{" "}
          <strong className="text-yellow-300 ">one of ones</strong>
        </h4>
      </section>
      <section className="w-1/2 justify-center items-center flex flex-col h-full border relative">
        <Image
          src={require("../../src/components/assets/img/logo.png")}
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
            placeholder={"Example: 0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3"}
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
            label={"Name"}
            placeholder={"Type your name"}
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            }
          />
          <Input
            label={"Password"}
            placeholder={"Type your password"}
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
          <Button
            label={"CONFIRM"}
            query={
              "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
            }
          />
          <Button
            label={"LOGIN"}
            query={
              "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            }
            onClick={() => router.push("/")}
          />
        </div>
      </section>
    </div>
  );
}
