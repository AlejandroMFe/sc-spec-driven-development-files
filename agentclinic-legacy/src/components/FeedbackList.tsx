import type { FC } from "hono/jsx";
import type { Feedback } from "../db/types.js";

export type FeedbackListProps = {
  feedbacks?: Feedback[];
  items?: Feedback[];
};

export const FeedbackList: FC<FeedbackListProps> = ({
  feedbacks,
  items,
}) => {
  const list = feedbacks ?? items ?? [];

  return (
    <section aria-labelledby="feedback-list-title" style="margin-top: 2rem;">
      <h2 id="feedback-list-title">Recent Agent Feedback</h2>
      {list.length === 0 ? (
        <p>No feedback yet. Be the first agent to share your experience.</p>
      ) : (
        <div class="feedback-entries">
          {list.map((entry) => (
            <article key={entry.id} style="margin-bottom: 1.5rem;">
              <header style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap;">
                <strong>{entry.name}</strong>
                <span>Rating: {entry.rating} / 5</span>
              </header>
              <p>{entry.message}</p>
              {entry.created_at && (
                <footer style="font-size: 0.85rem; color: var(--pico-muted-color, #757575);">
                  Submitted on {entry.created_at}
                </footer>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
