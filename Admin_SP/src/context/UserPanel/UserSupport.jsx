import React, { useState } from "react";
import { 
  FaPhone, FaEnvelope, FaExclamationCircle, 
  FaHeadset, FaQuestionCircle, FaChevronDown, 
  FaCommentDots 
} from "react-icons/fa";

const UserSupport = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    { question: "How do I book a parking slot?", answer: "You can book a slot by selecting your location, date, and time, then confirming your reservation." },
    { question: "What payment methods are accepted?", answer: "We accept credit/debit cards, UPI, and net banking." },
    { question: "Can I cancel my booking?", answer: "Yes, you can cancel your booking before the start time, and a refund will be processed as per our policy." }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 flex justify-center items-center gap-2">
          <FaHeadset className="text-blue-500" /> Support & Help Center
        </h1>
        <p className="text-gray-600 mt-2">How can we assist you today?</p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* FAQs */}
        <div 
          className="p-6 bg-white shadow-lg rounded-lg flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <FaQuestionCircle className="text-yellow-500 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">FAQs</h3>
            <p className="text-gray-500">Find answers to common questions.</p>
          </div>
        </div>

        {/* Contact Support */}
        <div 
          className="p-6 bg-white shadow-lg rounded-lg flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <FaEnvelope className="text-green-500 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Contact Support</h3>
            <p className="text-gray-500">Email us at <a href="mailto:support@smartparking.com" className="text-blue-500 font-semibold">support@smartparking.com</a></p>
          </div>
        </div>

        {/* Report an Issue */}
        <div 
          className="p-6 bg-white shadow-lg rounded-lg flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <FaExclamationCircle className="text-red-500 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Report an Issue</h3>
            <p className="text-gray-500">Facing problems? Let us know.</p>
          </div>
        </div>

        {/* Live Chat */}
        <div 
          className="p-6 bg-white shadow-lg rounded-lg flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <FaPhone className="text-blue-500 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Live Chat</h3>
            <p className="text-gray-500">Get instant support from our team.</p>
          </div>
        </div>

        {/* Chat with Us */}
        <div 
          className="p-6 bg-white shadow-lg rounded-lg flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <FaCommentDots className="text-purple-500 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Chat with Us</h3>
            <p className="text-gray-500">Talk to a live agent for assistance.</p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 bg-white shadow-md rounded-lg">
            <button 
              className="flex justify-between items-center w-full p-4 text-left text-gray-700 font-semibold focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <FaChevronDown className={`transition-transform ${openFAQ === index ? "rotate-180" : ""}`} />
            </button>
            {openFAQ === index && (
              <div className="p-4 text-gray-600 border-t">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="mt-12 max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Send Us a Message</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Your Name</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Your Email</label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSupport;
