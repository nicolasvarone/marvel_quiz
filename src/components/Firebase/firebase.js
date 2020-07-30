import app from "firebase/app";

const config = {
  apiKey: "AIzaSyCALNaBjxKmBgKUr98xl7uI_SEOY9oaN_E",
  authDomain: "marvel-quiz-81ffe.firebaseapp.com",
  databaseURL: "https://marvel-quiz-81ffe.firebaseio.com",
  projectId: "marvel-quiz-81ffe",
  storageBucket: "marvel-quiz-81ffe.appspot.com",
  messagingSenderId: "119664941361",
  appId: "1:119664941361:web:05296bf3ca67488d02f810",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
