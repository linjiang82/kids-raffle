import { useCallback, useEffect, useState } from "react";
import { asyncStorage } from "@/common/storage/storage";

export const useTicketCount = (name: string) => {
  const [ticketCount, setTicketCount] = useState(0);

  const raffleCountKey = `${name}raffle`;

  useEffect(() => {
    const getRaffle = async () => {
      const raffle = await asyncStorage.getItem(raffleCountKey);
      if (raffle === undefined || raffle === null) {
        setTicketCount(0);
      } else {
        setTicketCount(parseInt(raffle));
      }
    };
    getRaffle();
  }, []);

  const incrementCount = useCallback(() => {
    if (ticketCount < 0) return;
    setTicketCount(ticketCount + 1);
    asyncStorage.setItem(name, `${ticketCount + 1}`);
  }, [ticketCount]);

  const decrementCount = useCallback(() => {
    if (ticketCount - 1 < 0) return;
    setTicketCount(ticketCount - 1);
    asyncStorage.setItem(name, `${ticketCount - 1}`);
  }, [ticketCount]);

  return {
    ticketCount,
    incrementCount,
    decrementCount,
  };
};
