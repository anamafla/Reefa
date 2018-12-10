import React from "react";

export default function MemberPhoto(props) {
  return (
    <img
      id="memberPhoto"
      alt="member"
      key={props.photo.id}
      src={props.photo.thumb_link}
    />
  );
}
