import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  initializeApp(firebaseConfig)     //alustetaan

  const firestore = getFirestore()  //avaa tietokantayhteyden

  export {
    firestore
  }