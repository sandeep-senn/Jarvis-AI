import { assets } from "../assets/assets.js";
import { ToastContainer, toast } from 'react-toastify';

const founders = [
  {
    name: "Sandeep Sen",
    role: "Founder & Developer",
    image: assets.pfp,
    bio: "Passionate about building impactful web apps and empowering new developers.",
    linkedin: "https://linkedin.com/in/sandeep-sen-762a4b256",
    github: "https://github.com/sandeep-senn",
  },
  {
    name: "John Doe",
    role: "Co-Founder & Designer",
    bio: "Focuses on creating user-friendly interfaces and seamless design experiences.",
    image:assets.pfp,
    linkedin: "#",
    github: "#",
  },
];

const Founder = () => {

    const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Form Submitted!');
  };
  return (
    <>
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-20 text-gray-800">
      {/* Hero Intro */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Meet the <span className="text-blue-800">
            Visionaries</span></h1>
        <p className="text-lg text-gray-900 max-w-2xl mx-auto">
          Behind every great product is a team with a purpose. We believe in
          tech that empowers.
        </p>
      </section>

      {/* Founder Cards */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <img
                src={founder.image}
                alt={founder.name}
                className="w-32 h-32 mx-auto rounded-full object-cover shadow-md"
              />
              <h3 className="mt-4 text-2xl font-semibold">{founder.name}</h3>
              <p className="text-blue-600 font-medium">{founder.role}</p>
              <p className="mt-2 text-gray-600">{founder.bio}</p>
              <div className="mt-4 flex justify-center gap-4">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  {/* LinkedIn SVG Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#0A66C2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 
  .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 
  14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 
  0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 
  0-1.358.539-1.358 1.248 0 .694.521 1.248 1.327 
  1.248h.015zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 
  1.232-.878.869 0 1.216.662 1.216 
  1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 
  0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 
  0 7.225 0 7.225h2.4z"
                    />
                  </svg>
                </a>
                <a
                  href={founder.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  {/* GitHub SVG Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#181717"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 
  6.53 5.47 7.59.4.07.55-.17.55-.38 
  0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 
  1.08.58 1.23.82.72 1.21 1.87.87 
  2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 
  0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 
  0 0 .67-.21 2.2.82.64-.18 1.32-.27 
  2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 
  2.2-.82.44 1.1.16 1.92.08 
  2.12.51.56.82 1.27.82 2.15 
  0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 
  1.48 0 1.07-.01 1.93-.01 
  2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 
  8c0-4.42-3.58-8-8-8z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-400 p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Get in <span className="text-pink-600">
            Touch</span></h2>
        <form className="space-y-5 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-full"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-full"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          ></textarea>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
    </>
  );
};

export default Founder;
