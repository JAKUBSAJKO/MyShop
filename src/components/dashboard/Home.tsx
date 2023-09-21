import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { routes } from "../../../routes/routes";

interface LastChargesType {
  id: string;
  amount: number;
  user: {
    name: string;
    email: string;
  };
}

export default function Home() {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [lastCharges, setLastCharges] = useState<LastChargesType[]>();

  const countTotalProfit = (data) => {
    const available = data.balance.available[0].amount;
    const pending = data.balance.pending[0].amount;
    const totality = (available + pending) / 100;
    setBalance(totality);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch(routes.statistics);
      const data = await res.json();
      const lastCharges: LastChargesType[] = data.charges.data.map((item) => ({
        id: item.id,
        amount: item.amount / 100,
        user: {
          name: item.billing_details.name,
          email: item.billing_details.email,
        },
      }));

      setLastCharges(lastCharges);
      console.log(lastCharges);

      countTotalProfit(data);
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
        <div className="w-full h-full flex">
          <div className="w-80 h-36 bg-gray-800 rounded-xl flex flex-col gap-5 px-6 py-4">
            <h2 className="font-raleway font-medium text-white">Całkowity zysk</h2>
            <p className="font-raleway text-white text-4xl self-center">
              {balance} <span className="font-raleway text-sm text-white uppercase">ZŁ</span>
            </p>
          </div>
          <div className="flex-1 ml-10 bg-gray-800 rounded-xl px-6 py-4">
            <h2 className="font-raleway font-medium text-white">Last 5 Transations</h2>
            <div className="w-full overflow-x-auto mt-4">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="font-raleway text-xs font-medium text-white uppercase bg-gray-800">Dane osobowe</th>
                    <th className="font-raleway text-xs font-medium text-white uppercase bg-gray-800">Adres email</th>
                    <th className="font-raleway text-xs font-medium text-white uppercase bg-gray-800 flex justify-center">
                      Kwota | ZŁ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lastCharges?.map((item) => (
                    <tr key={item.id} className="py-4 my-4">
                      <td className="bg-gray-900 font-raleway font-medium text-white">{item.user.name}</td>
                      <td className="bg-gray-900 font-raleway font-medium text-white">{item.user.email}</td>
                      <td className="bg-gray-900 font-raleway font-medium text-white flex justify-center">
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
