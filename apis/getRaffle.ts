import { asyncStorage } from "@/common/storage/storage";

export const getRaffle = async (name: string) => {
  const raffleCountKey = `${name}raffle`;
  const raffle = await asyncStorage.getItem(raffleCountKey);
  console.log("raffle", raffle, raffleCountKey);
  if (raffle === undefined || raffle === null) {
    return 0;
  } else {
    return parseInt(raffle);
  }
};
