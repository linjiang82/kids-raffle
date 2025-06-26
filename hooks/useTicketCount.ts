import { useCallback, useEffect, useState } from "react";
import { asyncStorage } from "@/common/storage/storage";
import { type CandidatesList } from "@/common/constant";
import { getRaffle } from "@/apis/getRaffle";

export const useTicketCount = (name: CandidatesList) => {
  const [ticketCount, setTicketCount] = useState(0);

  const raffleCountKey = `${name}raffle`;

  useEffect(() => {
    getRaffle(name).then((count) => {
      setTicketCount(count);
    });
  }, [name]);

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
