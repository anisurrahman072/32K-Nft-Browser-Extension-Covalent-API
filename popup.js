document.addEventListener("DOMContentLoaded", async () => {
  const bookmarksElement = document.getElementById("bookmarks");
  bookmarksElement.innerHTML = "";

  let allNftsDetails = await getNfts();

  for (let i = 0; i < allNftsDetails.length; i++) {
    let img = document.createElement("img");
    img.src = allNftsDetails[i];
    img.width = "100";
    img.height = "100";
    img.style.padding = "5";
    bookmarksElement.appendChild(img);
  }
});

async function getNfts() {
  const allNfts = await fetch(
    "https://api.covalenthq.com/v1/137/tokens/0x50EA2723f55FFe1a2AE8599b6dCD20378f4825e2/nft_token_ids/?key=ckey_5c0768b2d0374067b65337a20b1"
  );
  const result = await allNfts.json();

  let allNftsDetails = [];

  if (result && result.data && result.data.items) {
    const allNftTokenIds = result.data.items.map((nft) => nft.token_id);

    console.log("ANISSSS: ", allNftTokenIds);

    allNftsDetails = await Promise.all(
      allNftTokenIds.map(async (nftTokenId) => {
        let nftDetails = await fetch(
          `https://api.covalenthq.com/v1/137/tokens/0x50EA2723f55FFe1a2AE8599b6dCD20378f4825e2/nft_metadata/${nftTokenId}/?key=ckey_5c0768b2d0374067b65337a20b1`
        );
        let nftDetailsResult = await nftDetails.json();

        let imageUrl = "";
        if (
          nftDetailsResult &&
          nftDetailsResult.data &&
          nftDetailsResult.data.items &&
          nftDetailsResult.data.items[0]
        ) {
          imageUrl =
            nftDetailsResult.data.items[0].nft_data[0].external_data.image;
          console.log("THEEEE URL: ", imageUrl);
        } else {
          console.log("NONEEE");
        }
        return imageUrl;
      })
    );
  }
  console.log("FINALLLL: ", allNftsDetails);
  return allNftsDetails;
}
