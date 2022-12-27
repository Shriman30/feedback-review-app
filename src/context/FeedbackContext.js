import { createContext, useState, useEffect } from "react";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch Feedback
  // setup proxy in package.json
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  // set item to be updated
  function editFeedback(item) {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  }

  // delete feedback
  async function deleteFeedback(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, {method: "DELETE"});
      setFeedback(feedback.filter((feedbackItem) => feedbackItem.id !== id));
    }
  }

  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
    const data = await response.json();
    setFeedback([data, ...feedback]);
  };
  // Update Feedback item
  const updateFeedback =async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })

    const data = await response.json();

    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...data } : item
      )
    );
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        editFeedback,
        deleteFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
