import Moralis from "moralis";

async function uploadToIpfs() {
  await Moralis.start({
    apiKey: "k51qzi5uqu5dlzg332ji1zgyjx0vx03xf02ewfy25ixuy675c5iepg9191qogq",
  });
}


uploadToIpfs();