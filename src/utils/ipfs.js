import * as IPFS from 'ipfs-core';

(async function () {
  global.IPFS = await IPFS.create();
})();

export const saveText = async (txt) => {
  const { path } = await global.IPFS.add(txt);
  return path;
};

export const getText = async (hash) => {
  const data = await global.IPFS.cat(hash);
  const nextData = await data.next();

  return decodeURIComponent(escape(String.fromCharCode(...nextData.value)));
};

// Deprecated
// export const saveText = async (txt) => {
//   const formData = new FormData();
//   formData.append('ipfs', txt);

//   const { Hash } = await fetch(`${IPFS_URL}/api/v0/add?stream-channels=true`, {
//     method: 'post',
//     body: formData,
//   }).then((res) => res.json());

//   return Hash;
// };

// // Deprecated
// export const getText = (hash) =>
//   fetch(`${IPFS_URL}/api/v0/get?arg=${hash}&stream-channels=true`, {
//     method: 'POST',
//   }).then((res) => res.text());
