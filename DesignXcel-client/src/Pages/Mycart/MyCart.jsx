import useCart from "../../hooks/useCart";
import { FaTrashAlt, FaMoneyBillWave } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCart();

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#718096",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error", "Failed to delete the item.", "error");
          });
      }
    });
  };

  const handlePayment = (item) => {
    const price = item.price;
    localStorage.setItem("price", price);

    console.log("Single payment", item);
  };

  return (
    <div className="pt-8 uppercase">
      <div className="text-xl mb-4">My Cart ({cart.length})</div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Class Photo</th>
              <th className="px-4 py-2">Class Name</th>
              <th className="px-4 py-2">Fees</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.image}
                    alt="Class"
                  />
                </td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">${item.price}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-300 focus:outline-none"
                    >
                      <FaTrashAlt />
                    </button>
                    <Link to="/dashboard/payment">
                      <button
                        onClick={() => handlePayment(item)}
                        className="flex items-center px-2 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 focus:outline-none"
                      >
                        <FaMoneyBillWave className="mr-1" />
                        Pay
                      </button>
                    </Link>
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

export default MyCart;
