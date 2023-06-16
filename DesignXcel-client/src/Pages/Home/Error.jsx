import { Helmet } from "react-helmet-async";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";
import image from "../../assets/images/404.gif";

const Error = () => {
  const { error } = useRouteError();
  return (
    <>
      <Helmet>
        <title>DesignXcel | Error Page</title>
      </Helmet>
      <section className="flex items-center h-screen p-16 bg-gray-100 text-gray-900">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div>
            <img src={image} alt="404" />
            <Link to="/">
              <div className="text-end -mt-24 me-4">
                <p className="text-xl font-semibold md:text-2xl mb-4">
                  {error?.message}
                </p>
                <button className="btn btn-outline btn-sm font-bold">
                  <FaAngleLeft /> Back to Homepage
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
