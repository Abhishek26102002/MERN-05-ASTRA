import React, { useState } from "react";
import { Mail, User, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";
const Contact = () => {
  const [formData, setFormData] = useState({
    reason: "editorial_tip",
    message: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_ID, // your EmailJS service ID
          import.meta.env.VITE_EMAILJS_TEMP_ID, // your EmailJS template ID
          formData, // Form data
          import.meta.env.VITE_EMAILJS_PUBLICKEY // your EmailJS public key
        )
        .then(() => {
          toast.success(
            "Thank you for your message. We'll get back to you soon!"
          );
          setFormData({
            name: "",
            email: "",
            reason: "editorial_tip",
            message: "",
          });
        });
    } catch (error) {
      console.log("Error in Contact us Form ", error);
      toast.error("Form Submission faild !");
    }
  };

  return (
    <>
      <div className="w-full sm:w-[70%] mx-auto p-3 sm:p-0">
        <div className=" mt-10 pb-10 h-full flex items-center justify-center">
          <div className="w-full p-6 rounded-2xl bg-gray-100 shadow-lg  items-center justify-center">
            <h1 className="text-6xl font-bold mb-14 text-black">Get in Touch</h1>
            <p className=" mt-2 text-gray-600">
              Your voice matters to us, and we are here to actively listen to
              whatever you need to share.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <fieldset className="space-y-6 mb-10 text-black">
                <h2 className="text-3xl font-semibold mb-10 text-gray-800">
                  What brings you in touch with us today?
                </h2>
                <label className="flex items-center space-x-2 ">
                  <input
                    type="radio"
                    name="reason"
                    value="editorial_tip"
                    checked={formData.reason === "editorial_tip"}
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <span >I have an editorial tip</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="reason"
                    value="join_Astra"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <span> I’d like to work with Astra</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="reason"
                    value="copyright_issue"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <span> I need to report a copyright issue</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="reason"
                    value="interested_Ads"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <span>I’m interested to advertise with Astra </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="reason"
                    value="bug_in_code"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <span> I’d like to report a bug</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="reason"
                    value="general_enq"
                    onChange={handleChange}
                    className="radio radio-success"
                  />
                  <span> I’d like to make a general enquiry</span>
                </label>
              </fieldset>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-52 mt-1 text-black bg-slate-50"
                  placeholder="Type your message here"
                ></textarea>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <div className="relative">
                    <User
                      className="absolute left-2 top-4 text-gray-400"
                      size={19}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input input-bordered w-full pl-8 text-black bg-slate-50"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="relative">
                    <Mail
                      className="absolute left-2 top-4 text-gray-400"
                      size={19}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered w-full pl-8 text-black bg-slate-50"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end ">
                <button className="btn btn-outline btn-sm  flex items-center justify-center text-black">
                  <Send size={16} className="mr-2 text-black" /> Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
