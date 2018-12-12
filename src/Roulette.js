import React, { Suspense, lazy } from "react";

const MemberPhoto = lazy(() => import("./MemberPhoto"));

export default function Roulette(props) {
  const { roulette } = props;

  return (
    <div>
      {roulette.length > 0 && (
        <div>
          <div className="wrapper">
            <div className="arrowdown" />
            <div className="wheel">
              {roulette.map(person =>
                person.member.photo && person.member.photo.thumb_link ? (
                  <Suspense
                    key={person.member.photo.id}
                    fallback={<div>..</div>}
                  >
                    <MemberPhoto
                      key={person.member.photo.id}
                      photo={person.member.photo}
                    />
                  </Suspense>
                ) : (
                  <img
                    alt="default"
                    key={person.member.photo.id}
                    src="http://placeholder.com/300/300"
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
