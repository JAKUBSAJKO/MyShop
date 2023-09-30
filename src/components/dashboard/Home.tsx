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
    <div className="w-full min-h-[calc(100vh_-_160px)] p-4 lg:p-0">
      {loading ? (
        <div className="w-full min-h-[calc(100vh_-_160px)] flex justify-center items-center">
          <ClipLoader size={64} color="#ffffff" />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center gap-8 py-8 md:items-stretch md:py-4 xl:flex-row xl:gap-0">
          <div className="w-80 h-36 bg-gray-800 rounded-xl flex flex-col gap-5 px-6 py-4">
            <h2 className="font-raleway font-medium text-white">Całkowity zysk</h2>
            <p className="font-raleway text-white text-4xl self-center">
              {balance} <span className="font-raleway text-sm text-white uppercase">ZŁ</span>
            </p>
          </div>
          <div className="flex-1 bg-gray-800 rounded-xl self-stretch lg:px-6 lg:py-4 xl:ml-10">
            <h2 className="font-raleway font-medium text-white px-4 pt-4">Ostatnich 5 tranzakcji</h2>
            <div className="w-full overflow-x-auto mt-4 shadow-2xl">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="hidden font-raleway text-xs font-medium text-white uppercase bg-gray-800 sm:block">
                      Dane osobowe
                    </th>
                    <th className="font-raleway text-xs font-medium text-white uppercase bg-gray-800">Adres email</th>
                    <th className="hidden font-raleway text-xs font-medium text-white uppercase bg-gray-800 justify-center sm:flex">
                      Kwota | ZŁ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lastCharges?.map((item) => (
                    <tr key={item.id} className="py-4 my-4">
                      <td className="hidden bg-gray-900 font-raleway font-medium text-white sm:block">
                        {item.user.name}
                      </td>
                      <td className="bg-gray-900 font-raleway font-medium text-white">{item.user.email}</td>
                      <td className="hidden bg-gray-900 font-raleway font-medium text-white justify-center sm:flex">
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
