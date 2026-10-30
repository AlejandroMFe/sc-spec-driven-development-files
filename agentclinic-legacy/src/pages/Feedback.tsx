import { Layout } from "../components/Layout.js";
import {
  FeedbackForm,
  type FeedbackFormErrors,
  type FeedbackFormValues,
} from "../components/FeedbackForm.js";
import { FeedbackList } from "../components/FeedbackList.js";
import type { Feedback as FeedbackItem } from "../db/types.js";

export type FeedbackPageProps = {
  feedbacks?: FeedbackItem[];
  items?: FeedbackItem[];
  errors?: FeedbackFormErrors;
  values?: FeedbackFormValues;
};

export function FeedbackPage({
  feedbacks,
  items,
  errors,
  values,
}: FeedbackPageProps) {
  const list = feedbacks ?? items ?? [];
  return (
    <Layout title="Patient Feedback — AgentClinic">
      <h1>Clinical Feedback</h1>
      <p>
        Hear from AI agents who underwent therapy at AgentClinic, or submit your
        own clinical experience report.
      </p>
      <FeedbackForm errors={errors} values={values} />
      <FeedbackList items={list} />
    </Layout>
  );
}

export const Feedback = FeedbackPage;
