import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter a valid email");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast.success("Subscription successful!");
        setEmail("");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Footer-Container">
      <div className="Footer-Top">
        <div className="Footer-Top-P">
          <p>Newsletter</p>
          <p>Get timely updates from your favorite products</p>
        </div>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="Footer-Bottom">
        <small>Made with ❤️ by Sandesh Shrestha</small>
        <div className="Footer-Social">
          <a href="https://sandeshshrestha.vercel.app" target="_blank">
            <small>Portfolio</small>
          </a>
          <a href="https://github.com/yoursandeshshrestha" target="_blank">
            <small>Github</small>
          </a>
          <a
            href="https://www.linkedin.com/in/sandesh-shrestha-b829572b0/"
            target="_blank"
          >
            <small>Linkedin</small>
          </a>
          <a href="mailto:yoursandeshshrestha@gmail.com" target="_blank">
            <small>Contact</small>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
