import React, { useState,useEffect, useContext } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

const FeedbackForms = () => {
  // context
  const {addFeedback,feedbackEdit, updateFeedback} = useContext(FeedbackContext)
  //states
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(10);

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Text must be at least 10 characters long");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  // what to do when clicking on send to submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.trim().length >10){
        const newFeedback = {
            text: text,
            rating: rating,
        }
        if(feedbackEdit.edit === true){
          updateFeedback(feedbackEdit.item.id, newFeedback)
        }else{
          addFeedback(newFeedback);
        }
        setText('');
    }
  };

  useEffect(()=>{
    // when the user clicks on feedback edit, enable the send button,
    // set the text field to that of the selected post
    // set the rating field to that of the selected post
    if(feedbackEdit.edit === true){
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);

    }

  },[feedbackEdit])
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForms;
