"use client";
import { useMetaMask } from "metamask-react";
import { ReactNode, SetStateAction, use, useEffect, useState } from "react";
import { Button } from "../../src/components/Button/Button";
import { Input } from "../../src/components/Input/Input";
import { Nav } from "../../src/components/navbar/navbar";
import { Auction } from "../../scripts/interact";
import Image from "next/image";
import { useStorageUpload } from "@thirdweb-dev/react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import Router from "next/router";

export default function DashBoard() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const [title, setTitle] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [timer, setTimer] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
  const [start, setStart] = useState<boolean>(false);
  const { mutateAsync: upload } = useStorageUpload();

  const [fileUploaded, setFileUploaded] = useState<any>("");
  const [fileDownloaded, setFileDownloaded] = useState<string>("");
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    if (status === "notConnected") {
      Router.push("/");
    }
  }, [status, fileDownloaded, fileUploaded]);

  useEffect(() => {
    getListOfOpenAuctions();
  }, [list]);

  const donwloadFromIpfs = async () => {
    let storage = new ThirdwebStorage();
    const uploadUrl = await upload({
      data: [selectedFile],
      options: {
        uploadWithoutDirectory: true,
      },
    }).catch((e) => {
      console.log(e);
    });
    console.log("upload", uploadUrl);
    setFileUploaded(uploadUrl);
    const url = await storage.downloadJSON(fileUploaded[0]).catch((e) => {
      console.log(e);
    });
    console.log("donwload", url);
    setFileDownloaded(url);
  };

  const createAuction = async () => {
    const value = await Auction.deploy({
      arguments: [account, title, price, description, fileDownloaded],
      data: "nothing",
    });
  };

  const getListOfOpenAuctions = async () => {
    const listOfAuction = await Auction.methods.returnContents().call();
    list.push(listOfAuction);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Nav />
      <section className="w-2/3 flex justify-center items-center pt-40 gap-10">
        <div className="w-1/2 flex">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center ${
                selectedFile ? "w-fit h-fit" : "w-full h-full"
              }w-full h-full border-4 border-gray-300 border-indigo-500/100 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
            >
              <div
                className={`flex flex-col items-center justify-center w-full ${
                  selectedFile ? "" : "h-80"
                } rounded`}
              >
                {selectedFile === null ? (
                  <>
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </>
                ) : (
                  <Image
                    src={URL.createObjectURL(selectedFile[0])}
                    alt="Picture of the author"
                    width={800}
                    height={400}
                    className="rounded"
                  />
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files)}
              />
            </label>
          </div>
        </div>
        <div className="w-1/3 flex flex-col">
          <Input
            label={""}
            placeholder={"Type the title"}
            icon={undefined}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <Input
            label={""}
            placeholder={"Initial price"}
            icon={undefined}
            onChange={(e) => setPrice(Number(e.currentTarget.value))}
          />
          <Input
            label={""}
            placeholder={"Description"}
            icon={undefined}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <Input
            label={""}
            placeholder={"TIMER: day:hour:second 01:02:00"}
            icon={undefined}
            onChange={(e) => setTimer(e.currentTarget.value)}
          />
          <Button
            query={
              "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm py-2.5 text-center mr-2 mb-2"
            }
            onClick={() => {
              donwloadFromIpfs();
              createAuction();
            }}
            label={"START"}
          />
        </div>
      </section>
      <section className="w-full flex flex-col items-center justify-center pt-20">
        <div className="w-2/3 flex border items-center justify-center"></div>
        <h1 className="font-bold text-4xl pt-20">Running Auctions</h1>
        <div className="w-full flex flex-col items-center justify-center pt-20 gap-5">
          {list.map((item, index) => {
            return (
              <div key={index}>
                <h1>{item[0]}</h1>
                <h1>{item[1]}</h1>
                <h1>{item[2]}</h1>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
