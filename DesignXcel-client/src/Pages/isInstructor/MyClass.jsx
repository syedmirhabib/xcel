import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { GrDocumentUpdate } from "react-icons/gr";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const MyClass = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    fetch(`http://localhost:5000/myclass?email=${user?.email}`).then((res) =>
      res.json().then((data) => setData(data))
    );
  }, []);

  const handleFeedback = (className) => {
    Swal.fire({
      title: className,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  const handleUpdateSeats = (item) => {
    const updatedSeats = item.availableSeats - 1;
    if (updatedSeats >= 0) {
      axiosSecure
        .put(`/dance/${item._id}`, { availableSeats: updatedSeats })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          toast.success("Successfully updated available seats.");
          // Update the local data with the updated seats
          const updatedData = data.map((d) => {
            if (d._id === item._id) {
              return { ...d, availableSeats: updatedSeats };
            }
            return d;
          });
          setData(updatedData);
        })
        .catch((error) => {
          console.error("Failed to update available seats:", error);
          toast.error("Failed to update available seats. Please try again.");
        });
    }
  };

  return (
    <div className="pt-12">
      <h2 className="text-xl ">My Total class : {data.length} </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-red-500 text-white">
            <tr>
              <th>Serial</th>
              <th>Class Name</th>
              <th>Status</th>
              <th>Total Enrolled Students</th>
              <th>Update</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody className="bg-green-100">
            {data.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.className}</td>
                <td>{item.status}</td>
                <td>0</td>
                <td>
                  <button
                    className="btn btn-sm btn-circle btn-outline"
                    onClick={() => handleUpdateSeats(item)}
                  >
                    <GrDocumentUpdate className="h-4 w-4" />
                  </button>
                </td>
                <td>
                  {item.status === "rejected" && (
                    <button
                      onClick={() => handleFeedback(item.reason)}
                      className="btn btn-primary btn-sm"
                    >
                      Feedback
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClass;
