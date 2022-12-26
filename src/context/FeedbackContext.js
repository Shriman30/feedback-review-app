import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is feedback item 1",
      rating: 10,
    },
    {
      id: 2,
      text: "This is feedback item 2",
      rating: 9,
    },
    {
      id: 3,
      text: "This is feedback item 3",
      rating: 8,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // set item to be updated
  function editFeedback(item) {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  }

  // delete feedback
  function deleteFeedback(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((feedbackItem) => feedbackItem.id !== id));
    }
  }

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };
// Update Feedback item
const updateFeedback = (id, updatedItem) =>{
    console.log(id, updatedItem);
    setFeedback(feedback.map(item => item.id ===id ? {...item, ...updatedItem}: item))
}
  return (
    <FeedbackContext.Provider
      value={{ feedback,feedbackEdit, addFeedback, editFeedback, deleteFeedback, updateFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
