import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const ManageClassCard = ({ item }) => {
  const { className, image, price, instructorName, status } = item;
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);
  const [isRejectButtonDisabled, setIsRejectButtonDisabled] = useState(false);
  const [isApproved, setIsApproved] = useState(status === "approved");
  const [isRejected, setIsRejected] = useState(status === "rejected");

  const handleApprove = (item) => {
    setIsApproved(true);
    setIsRejected(false);

    axios
      .patch(
        `http://localhost:5000/instructorClasses/statusApproved/${item._id}`
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.instructorName}'s class is added successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error approving class:", error);
      });

    console.log("approved", item);
  };

  const handleReject = (item) => {
    setIsRejected(true);
    setIsApproved(false);

    axios
      .patch(
        `http://localhost:5000/instructorClasses/statusRejected/${item._id}`,
        { reason: rejectReason }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.modifiedCount) {
          setIsRejectButtonDisabled(true);
          setIsModalSubmitted(true);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.instructorName}'s class is rejected successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error rejecting class:", error);
      });

    console.log("rejected", item);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const submitModal = () => {
    console.log("Submit modal", rejectReason);
    const updatedClass = {
      reason: rejectReason,
    };
    axios
      .patch(
        `http://localhost:5000/instructorClasses/${item._id}`,
        updatedClass
      )
      .then((response) => {
        console.log(response.data);
        setIsModalSubmitted(true);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating class:", error);
      });
  };

  return (
    <div className="mt-12 bg-white rounded-lg shadow-xl overflow-hidden">
      <figure>
        <img src={image} alt="Class" className="w-full h-48 object-cover" />
      </figure>
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">Dance Name: {className}</h2>
        <p className="text-gray-600 mb-2">Fees: {price}</p>
        <p className="text-gray-600 mb-4">Instructor: {instructorName}</p>
        <div className="flex justify-around">
          <button
            disabled={isApproved || isRejected}
            onClick={() => handleApprove(item)}
            className="bg-green-500 hover:bg-green-600 text-white text-sm uppercase py-2 px-4 rounded-lg mr-2"
          >
            Approve
          </button>
          <button
            disabled={isRejected || isApproved}
            onClick={() => handleReject(item)}
            className="bg-green-500 hover:bg-green-600 text-white text-sm uppercase py-2 px-4 rounded-lg mr-2"
          >
            Reject
          </button>
          <button
            disabled={isModalSubmitted || isRejectButtonDisabled}
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm uppercase py-2 px-4 rounded-lg"
          >
            Feedback
          </button>
        </div>
        {showModal && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50">
            <div className="bg-white w-96 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Reject Reason</h2>
              <textarea
                className="w-full h-24 border border-gray-300 rounded-lg p-2 mb-4"
                placeholder="Enter the reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white text-sm uppercase py-2 px-4 rounded-lg mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white text-sm uppercase py-2 px-4 rounded-lg"
                  onClick={submitModal}
                  disabled={isModalSubmitted}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageClassCard;
