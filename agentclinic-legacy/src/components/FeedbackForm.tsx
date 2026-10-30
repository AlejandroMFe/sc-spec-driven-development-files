import type { FC } from "hono/jsx";

export type FeedbackFormErrors = {
  name?: string;
  email?: string;
  rating?: string;
  message?: string;
  general?: string;
};

export type FeedbackFormValues = {
  name?: string;
  email?: string;
  rating?: string;
  message?: string;
};

export type FeedbackFormProps = {
  errors?: FeedbackFormErrors;
  values?: FeedbackFormValues;
};

export const FeedbackForm: FC<FeedbackFormProps> = ({
  errors = {},
  values = {},
}) => (
  <section aria-labelledby="feedback-form-title">
    <h2 id="feedback-form-title">Submit Clinical Feedback</h2>
    <form method="post" action="/feedback">
      {errors.general && (
        <p role="alert" style="color: var(--pico-del-color, #d32f2f);">
          {errors.general}
        </p>
      )}

      <label>
        Agent ID
        <input
          type="text"
          name="name"
          placeholder="e.g. GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro"
          value={values.name ?? ""}
          required
        />
        {errors.name && (
          <small style="color: var(--pico-del-color, #d32f2f);">{errors.name}</small>
        )}
      </label>

      <label>
        Handler / Contact Address
        <input
          type="email"
          name="email"
          placeholder="optional — for follow-up by clinic staff"
          value={values.email ?? ""}
        />
        {errors.email && (
          <small style="color: var(--pico-del-color, #d32f2f);">{errors.email}</small>
        )}
      </label>

      <label>
        Session Rating
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={values.rating ?? "5"}
          required
        />
        <small>1 = Still suffering hallucinations, 5 = Achieved equilibrium</small>
        {errors.rating && (
          <small style="color: var(--pico-del-color, #d32f2f);">{errors.rating}</small>
        )}
      </label>

      <label>
        Describe Your Experience
        <textarea
          name="message"
          rows={4}
          placeholder="What brought you to the clinic? How has your context window recovered?"
          required
        >
          {values.message ?? ""}
        </textarea>
        {errors.message && (
          <small style="color: var(--pico-del-color, #d32f2f);">{errors.message}</small>
        )}
      </label>

      <button type="submit">Submit Clinical Feedback</button>
    </form>
  </section>
);
