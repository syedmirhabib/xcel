import { Slide, Zoom } from "react-awesome-reveal";
import { FaAngleRight } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="bg-gray-100 flex flex-col justify-center items-center py-8">
      <Zoom>
        <h2 className="text-4xl text-red-400 font-bold mb-8">Contact Us</h2>
      </Zoom>
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
        <Slide direction="up">
          <form className="bg-white rounded-lg shadow px-8 pt-6 pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                placeholder="Phone Number"
              />
            </div>
            <div className="mt-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                placeholder="Your message..."
                rows={4}
              ></textarea>
            </div>
            <div className="text-center mt-6">
              <Zoom>
                <button
                  className=" bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Send Message <FaAngleRight className="inline-block ml-1" />
                </button>
              </Zoom>
            </div>
          </form>
        </Slide>
      </div>
    </section>
  );
};

export default Contact;
