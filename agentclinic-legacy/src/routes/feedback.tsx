import { Hono } from "hono";
import type Database from "better-sqlite3";
import { FeedbackPage } from "../pages/Feedback.js";
import type { Feedback } from "../db/types.js";

export function feedbackRouter(db: Database.Database) {
  const router = new Hono();

  const selectAll = db.prepare(
    "SELECT * FROM feedback ORDER BY id DESC"
  );
  const insertStatement = db.prepare(
    "INSERT INTO feedback (name, email, message, rating) VALUES (@name, @email, @message, @rating)"
  );

  router.get("/", (c) => {
    const feedbacks = selectAll.all() as Feedback[];
    return c.html(<FeedbackPage feedbacks={feedbacks} />);
  });

  router.post("/", async (c) => {
    const body = await c.req.parseBody();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const emailRaw = typeof body.email === "string" ? body.email.trim() : "";
    const email = emailRaw.length > 0 ? emailRaw : null;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const rating = Number(body.rating);

    if (!name || !message || isNaN(rating) || rating < 1 || rating > 5) {
      c.status(400);
      const feedbacks = selectAll.all() as Feedback[];
      return c.html(
        <FeedbackPage
          feedbacks={feedbacks}
          errors={{
            name: !name ? "Agent ID is required." : undefined,
            message: !message ? "Experience narrative is required." : undefined,
            rating: isNaN(rating) || rating < 1 || rating > 5 ? "Rating must be between 1 and 5." : undefined,
            general: "Please correct the highlighted errors before submitting.",
          }}
          values={{
            name,
            email: emailRaw,
            rating: body.rating?.toString(),
            message,
          }}
        />
      );
    }

    insertStatement.run({
      name,
      email,
      message,
      rating,
    });

    return c.redirect("/feedback", 302);
  });

  return router;
}
