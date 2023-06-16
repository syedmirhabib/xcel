import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaCalendarAlt, FaMoneyBillAlt } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";

const PaymentHistory = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/payments?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) =>
        setData(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
      );
  }, []);

  return (
    <div className="pt-8">
      <div className="text-3xl font-bold pb-4 text-center">
        Payment History: {data.length} Payments
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Serial</th>
              <th className="py-3 px-6 text-left">Time & Date</th>
              <th className="py-3 px-6 text-left">Total Paid ($)</th>
              <th className="py-3 px-6 text-left">Transaction ID</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {data.map((payment, index) => (
              <tr key={payment._id}>
                <td className="border py-4 px-6">{index + 1}</td>
                <td className="border py-4 px-6">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <div>
                      {new Date(payment.date).toLocaleDateString()} <br />
                      <span className="text-sm text-gray-600">
                        ({new Date(payment.date).toLocaleTimeString()})
                      </span>
                    </div>
                  </div>
                </td>
                <td className="border py-4 px-6">
                  <div className="flex items-center">
                    <FaMoneyBillAlt className="mr-2 text-green-500" />
                    {payment.price}
                  </div>
                </td>
                <td className="border py-4 px-6">
                  <div className="flex items-center">
                    <IoReceiptOutline className="mr-2 text-purple-500" />
                    {payment.transactionId}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
