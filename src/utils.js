// Read API code is removed and placeholders are in use.

async function getHeartbeat() {
  return {
    status: 'success',
    server: {
        version: 'x.x.x',
        announcement: ''
    }
}
}
async function login(username, password) {
    return {
      "status": "success",
      "accessToken": "foo-bar-silly-pants"
    }
}
async function getUserData(accessToken) {
  return {
    "status": "success",
    "registration": {
      "name": "Doe, Harold John",
      "grade": 9,
      "studentPicture": "https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-man-costume-white-background-person-gray-photo-placeholder-man-136701248.jpg",
    },
    "attendance": {
      "totalAbsences": 7,
      "totalTardies": 1
    },
    "transportation": {
      "busToCampus": "5521",
      "busToCampusStopTime": "6:29 AM",
      "busFromCampus": "5521",
      "busFromCampusStopTime": "3:01 PM"
    },
    "misc": {
      "lunchFunds": "$63.27",
      "studentUsername": "sillyjon",
      "studentID": "999365"
    }
  }
}
async function getUserAssignments(accessToken) {
  return {
    "status": "success",
    "classAverages": [
      {
        "period": "1",
        "subject": "Fundamentals of Something",
        "course": "477B",
        "teacher": "Cool Guy Joe",
        "teacherEmail": "coolguyjoe@someisd.net",
        "average": 100,
        "assignments": [
          {
            "dueDate": "3/21",
            "assignedDate": "3/12",
            "assignmentName": "Something",
            "category": "Major",
            "score": 5,
            "totalPoints": 1,
            "percentage": 100
          }
        ]
      },
      {
        "period": "2",
        "subject": "Pyrotechnics Theory",
        "course": "875A",
        "teacher": "Billy Joel",
        "teacherEmail": "billyjoel@someisd.net",
        "average": 100,
        "assignments": [
          {
            "dueDate": "3/11",
            "assignedDate": "3/1",
            "assignmentName": "Starting a Fire",
            "category": "Major",
            "score": 5,
            "totalPoints": 1,
            "percentage": 100
          }
        ]
      },
      {
        "period": "3",
        "subject": "Culinary",
        "course": "765A",
        "teacher": "The Reaper",
        "teacherEmail": "thereaper@someisd.net",
        "average": 100,
        "assignments": [
          {
            "dueDate": "3/11",
            "assignedDate": "3/1",
            "assignmentName": "Blue Oysters",
            "category": "Daily",
            "score": 5,
            "totalPoints": 1,
            "percentage": 100
          }
        ]
      },
    ]
  }
}
async function logout(accessToken) {
  return {}
}

const _getHeartbeat = getHeartbeat;
export { _getHeartbeat as getHeartbeat };
const _login = login;
export { _login as login };
const _getUserData = getUserData;
export { _getUserData as getUserData };
const _getUserAssignments = getUserAssignments;
export { _getUserAssignments as getUserAssignments };
const _logout = logout;
export { _logout as logout };