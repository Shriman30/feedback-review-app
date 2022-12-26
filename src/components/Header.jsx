import React from "react";
import PropTypes from "prop-types";

const Header = ({ text, bgColor, textColor }) => {
  const headerStyles = { backgroundColor: bgColor, color: textColor };
  return (
    <header style={headerStyles}>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  );
};
Header.defaultProps = {
  text: "Feedback and Review",
  bgColor: '#2e248a83',
  textColor: '#ce8d8d'

};

Header.protoTypes = {
  text: PropTypes.string,
  bgColor:PropTypes.string,
  textColor: PropTypes.string,
};
export default Header;
