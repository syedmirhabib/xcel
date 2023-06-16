import React, { useEffect, useState } from "react";
import ManageClassCard from "./ManageClassCard";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/instructorClasses")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 ">
      {data.map((item) => (
        <ManageClassCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ManageClasses;
