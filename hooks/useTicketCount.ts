import { useCallback, useEffect, useState } from "react";
import { asyncStorage } from "@/common/storage/storage";
import { type CandidatesList } from "@/common/constant";

export const useTicketCount = (name: CandidatesList) => {
  const [ticketCount, setTicketCount] = useState(0);

  const raffleCountKey = `${name}raffle`;

  useEffect(() => {
    const getRaffle = async () => {
      const raffle = await asyncStorage.getItem(raffleCountKey);
      console.log("raffle", raffle, raffleCountKey);
      if (raffle === undefined || raffle === null) {
        setTicketCount(0);
      } else {
        setTicketCount(parseInt(raffle));
      }
    };
    getRaffle();
  });

  const incrementCount = useCallback(() => {
    if (ticketCount < 0) return;
    setTicketCount(ticketCount + 1);
    asyncStorage.setItem(raffleCountKey, `${ticketCount + 1}`);
  }, [ticketCount, raffleCountKey]);

  const decrementCount = useCallback(() => {
    if (ticketCount - 1 < 0) return;
    setTicketCount(ticketCount - 1);
    asyncStorage.setItem(raffleCountKey, `${ticketCount - 1}`);
  }, [ticketCount, raffleCountKey]);

  return {
    ticketCount,
    incrementCount,
    decrementCount,
  };
};
