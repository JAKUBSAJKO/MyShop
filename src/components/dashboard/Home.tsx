import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { routes } from "../../../routes/routes";

export default function Home() {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch(routes.statistics);
      const data = await res.json();
      const available = data.balance.available[0].amount;
      const pending = data.balance.pending[0].amount;
      const totality = (available + pending) / 100;
      setBalance(totality);
      setLoading(false);
    };

    fetchBalance();
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh_-_160px)]">
      {loading ? (
        <div className="w-full min-h-[calc(100vh_-_160px)] flex justify-center items-center">
          <ClipLoader size={64} color="#ffffff" />
        </div>
      ) : (
        <div className="w-80 h-36 bg-gray-800 rounded-xl flex flex-col justify-between p-4">
          <h2 className="font-raleway font-normal text-white uppercase">Zarobione:</h2>
          <p className="font-raleway text-white text-6xl self-end">{balance} ZŁ</p>
        </div>
      )}
    </div>
  );
}
