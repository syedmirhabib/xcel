import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import { Helmet } from "react-helmet-async";

const Classes = () => {
  const [, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = "https://design-xcel-server.vercel.app/classes";
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(classes);

  if (loading) {
    return <Loader />;
  }

  const handleSelect = (cls) => {
    if (user && user.email) {
      const orderItem = {
        itemId: cls._id,
        email: user.email,
        name: cls.className,
        instructor: cls.instructorName,
        price: cls.price,
        image: cls.image,
        availableSeats: cls.availableSeats,
      };

      axios
        .post("https://design-xcel-server.vercel.app/carts", orderItem)
        .then((res) => {
          if (res.status === 200) {
            console.log("error handle", res.data);
            if (res.data.error) {
              Swal.fire({
                position: "center",
                icon: "warning",
                title: "Item already exists in the cart",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your class has been added to cart successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      {" "}
      <Helmet>
        <title> DesignXcel | All Courses</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 pt-16 gap-6">
        {classes.map((cls) => {
          if (cls.status === "approved") {
            return (
              <ClassCard handleSelect={handleSelect} key={cls._id} cls={cls} />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Classes;
