import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router-dom";

const EnrolledClass = () => {
  const [data, setData] = useState([]);
  const [dances, setDances] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/payments?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setDances(data.map((item) => item.className).flat());
      });
  }, []);

  return (
    <div className="pt-8">
      <div className="text-3xl font-bold pb-4 text-center">
        My Purchased Classes: {dances.length}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-green-500">
              <th className="py-3 px-6 text-white font-bold uppercase text-center">
                Serial
              </th>
              <th className="py-3 px-6 text-white font-bold uppercase text-center">
                Class Name
              </th>
              <th className="py-3 px-6 text-white font-bold uppercase text-center">
                Available Seat
              </th>
              <th className="py-3 px-6 text-white font-bold uppercase text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-green-100">
            {dances.map((dance, index) => (
              <tr key={index} className="text-center">
                <td className="border py-4 px-6">{index + 1}</td>
                <td className="border py-4 px-6">{dance}</td>
                <td className="border py-4 px-6">-</td>
                <td className="border py-4 px-6">
                  <Link to="/dashboard/payment">
                    <button className="flex items-center px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 focus:outline-none">
                      <FaMoneyBillWave className="mr-2" />
                      Pay
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClass;
