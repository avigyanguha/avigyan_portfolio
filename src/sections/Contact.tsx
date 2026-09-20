import { useState } from "react";
import type { FormEvent } from "react";
import { InView } from "@/ui/in-view";
import "../styles/sections/Contact.css";

type ContactOption = "linkedin" | "email";
type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};
type SubmitStatus = "idle" | "loading" | "success" | "error";

function Contact() {
  const [activeContact, setActiveContact] =
    useState<ContactOption>("linkedin");
  const [hoveredContact, setHoveredContact] =
    useState<ContactOption | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");
  const [isShaking, setIsShaking] =
    useState(false);
  const displayedContact =
    hoveredContact ?? activeContact;

  const validateForm = (
    form: HTMLFormElement
  ): FormErrors => {
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value.trim();
    const newErrors: FormErrors = {};

    if (!name) {
      newErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.name =
        "Name must be at least 2 characters.";
    }

    if (!email) {
      newErrors.email =
        "Please enter your email address.";
    } else {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email =
          "Please enter a valid email address.";
      }
    }

    if (!message) {
      newErrors.message =
        "Please enter your message.";
    } else if (message.length < 1) {
      newErrors.message =
        "Message must be at least 1 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (submitStatus === "loading") {
      return;
    }
    const form = event.currentTarget;
    const validationErrors =
      validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 450);
      return;
    }

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error(
        "Web3Forms access key is missing."
      );
      setSubmitStatus("error");
      return;
    }

    setSubmitStatus("loading");
    setErrors({});
    const formData = new FormData(form);
    formData.append(
      "access_key",
      accessKey
    );
    formData.append(
      "subject",
      "New Portfolio Contact Message"
    );
    formData.append(
      "from_name",
      "Avigyan Guha Portfolio"
    );

    const botcheck = formData.get("botcheck");
    if (botcheck) {
      setSubmitStatus("success");
      form.reset();
      return;
    }
    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setErrors({});
        form.reset();

        setTimeout(() => {
          setSubmitStatus("idle");
        }, 3500);
      } else {
        console.error(
          "Web3Forms error:",
          result
        );
        setSubmitStatus("error");
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 450);
      }
    } catch (error) {
      console.error(
        "Contact form submission failed:",
        error
      );
      setSubmitStatus("error");
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 450);
    }
  };
  return (
    <section id="contact" className="contact">
      <div className="contact-glow contact-glow--green" />
      <div className="contact-glow contact-glow--yellow" />
      <div className="contact-glow contact-glow--pink" />
      <InView
        once
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewOptions={{ once: true, amount: 0.3 }}
      >
        <div className="contact-content">
          <h2 className="contact-title">
            LET&apos;S BUILD SOMETHING
            <br />
            AMAZING TOGETHER.
          </h2>
          <p className="contact-description">
            Have a project in mind, a collaboration idea, or just want to say
            hello?
            <br />
            I&apos;d love to hear from you.
          </p>
          <div className="contact-links">
            <div
              className={`contact-links__indicator ${displayedContact === "email"
                ? "contact-links__indicator--email"
                : ""
                }`}
            />
            <button
              type="button"
              className={`contact-link ${displayedContact === "linkedin"
                ? "contact-link--active"
                : ""
                }`}
              onMouseEnter={() =>
                setHoveredContact("linkedin")
              }
              onMouseLeave={() =>
                setHoveredContact(null)
              }
              onClick={() => {
                setActiveContact("linkedin");

                window.open(
                  "https://www.linkedin.com/in/avigyan-guha/",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              LinkedIn
            </button>
            <button
              type="button"
              className={`contact-link ${displayedContact === "email"
                ? "contact-link--active"
                : ""
                }`}
              onMouseEnter={() =>
                setHoveredContact("email")
              }
              onMouseLeave={() =>
                setHoveredContact(null)
              }
              onClick={() => {
                setActiveContact("email");

                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=avigyanguha427@gmail.com",
                  "_blank",
                  "noopener,noreferrer");
              }}
            >
              Email Me
            </button>
          </div>
        </div>
      </InView>

      <InView
        once
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        viewOptions={{ once: true, amount: 0.2 }}
      >
        <div
          className={`contact-form-card ${isShaking
            ? "contact-form-card--shake"
            : ""
            }`}
        >
          <h3 className="contact-form-title">
            Send a message
          </h3>
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="checkbox"
              name="botcheck"
              className="contact-honeypot"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="contact-field">
              <label
                htmlFor="contact-name"
                className="contact-label"
              >
                Your full name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className={`contact-input ${errors.name
                  ? "contact-input--error"
                  : ""
                  }`}
                autoComplete="name"
              />
              {errors.name && (
                <span className="contact-field-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="contact-field">
              <label
                htmlFor="contact-email"
                className="contact-label"
              >
                Work email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className={`contact-input ${errors.email
                  ? "contact-input--error"
                  : ""
                  }`}
                autoComplete="email"
              />
              {errors.email && (
                <span className="contact-field-error">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="contact-field">
              <label
                htmlFor="contact-message"
                className="contact-label"
              >
                Message details
              </label>
              <textarea
                id="contact-message"
                name="message"
                className={`contact-textarea ${errors.message
                  ? "contact-input--error"
                  : ""
                  }`}
                rows={5}
              />
              {errors.message && (
                <span className="contact-field-error">
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`contact-submit ${submitStatus === "success"
                ? "contact-submit--success"
                : ""
                } ${submitStatus === "error"
                  ? "contact-submit--error"
                  : ""
                }`}
              disabled={
                submitStatus === "loading"
              }
            >
              {submitStatus === "loading" && (
                <>
                  <span className="contact-spinner" />
                  SENDING...
                </>
              )}
              {submitStatus === "success" && (
                <>
                  <span className="contact-check">
                    ✓
                  </span>
                  MESSAGE SENT
                </>
              )}
              {submitStatus === "error" && (
                <>TRY AGAIN</>
              )}
              {submitStatus === "idle" && (
                <>SEND MESSAGE</>
              )}
            </button>
            {submitStatus === "success" && (
              <p className="contact-status contact-status--success">
                Your message has been sent successfully.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="contact-status contact-status--error">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </InView>
    </section>
  );
}

export default Contact;