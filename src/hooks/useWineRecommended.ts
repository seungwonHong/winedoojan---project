import { useEffect, useState } from "react";
import getWineRecommended, {
  WineRecommended,
} from "@/services/getWineRecommended";

const useWineRecommended = () => {
  const [wines, setWines] = useState<WineRecommended["wines"]>([]);

  useEffect(() => {
    const getWineRec = async () => {
      const res = await getWineRecommended({ limit: 10 });
      setWines(res.wines);
    };
    getWineRec();
  }, []);

  return {
    wines,
  };
};

export default useWineRecommended;
