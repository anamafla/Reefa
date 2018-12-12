import React from "react";

function MemberPhoto(props) {
  return (
    <img
      id="memberPhoto"
      alt="member"
      key={props.photo.id}
      src={props.photo.thumb_link}
    />
  );
}

export default MemberPhoto;
