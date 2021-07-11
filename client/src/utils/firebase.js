import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2_jYml_gHzbnRJC_IgLeqNtmpi3SrmSs",
  authDomain: "pizzastore-40ddc.firebaseapp.com",
  projectId: "pizzastore-40ddc",
  storageBucket: "pizzastore-40ddc.appspot.com",
  messagingSenderId: "825394600780",
  appId: "1:825394600780:web:660927178a5bff7f42cde9",
  measurementId: "G-Z3CSB7JZWK"
};

 firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase};