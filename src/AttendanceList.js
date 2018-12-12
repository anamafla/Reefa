import React from "react";

function AttendanceList(props) {
  return (
    <div className="attendanceList">
      <h4>Attendance List</h4>
      <div>
        {props.attendanceList.length > 0
          ? props.attendanceList.map(person => (
              <li key={person.member.id}>{person.member.name}</li>
            ))
          : null}
      </div>
    </div>
  );
}

export default AttendanceList;
