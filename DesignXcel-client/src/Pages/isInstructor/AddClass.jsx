import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
const ImgKey = "88a32f9606ac9f1f4bc4d022254b25e1";
// console.log(ImgKey);

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const ImgHostingURL = `https://api.imgbb.com/1/upload?key=${ImgKey}`;
  //   console.log(ImgHostingURL);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(ImgHostingURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imageURL = imgRes.data.display_url;
          const { name, price, instructor, availableSeats } = data;

          const newItem = {
            className: name,
            price: price,
            instructorName: instructor,
            instructorImage: user?.photoURL,
            email: user?.email,
            availableSeats: availableSeats,
            image: imageURL,
            status: "pending",
          };
          console.log(newItem);
          axiosSecure.post("/instructorClasses", newItem).then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Class has been Added SuccessFully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };

  return (
    <div className="w-full px-10 ">
      {/* form ar kaj baj  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text font-semibold">Class Name*</span>
          </label>
          <input
            type="text"
            placeholder="Dance Name"
            {...register("name", { required: true, maxLength: 80 })}
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text font-semibold">Instructor Name*</span>
          </label>
          <input
            type="text"
            placeholder="Instructor Name"
            defaultValue={user?.displayName}
            readOnly
            {...register("instructor", { required: true, maxLength: 80 })}
            // defaultValue

            className="input input-bordered w-full "
          />
        </div>
        <div className="flex gap-5 ">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">
                Instructor Email*
              </span>
            </label>
            <input
              type="email"
              placeholder="Instructor Email "
              {...register("email", { required: true })}
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              placeholder="Price "
              {...register("price", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">Available Seats*</span>
            </label>
            <input
              type="number"
              placeholder="availableSeats "
              {...register("availableSeats", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
        </div>
        <div className="form-control w-full pb-12 ">
          <label className="label">
            <span className="label-text">Course Image </span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div>

        {/*       
        <input className="btn btn-warning btn-sm mt-4 mb-5 " type="submit" value="Add Item" /> */}

        <div className="flex justify-center">
          <button className="btn btn-warning w-1/2"> Add Class</button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
