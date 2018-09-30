import firebase from 'firebase';
import '@firebase/firestore';

const config = {
  apiKey: 'AIzaSyCV0Oap1h_EiCZfZsObfd894kYvYByCCNY',
  authDomain: 'mimicopus.firebaseapp.com',
  databaseURL: 'https://mimicopus.firebaseio.com',
  projectId: 'mimicopus',
  storageBucket: 'mimicopus.appspot.com',
  messagingSenderId: '624557449670',
};

export const firebaseApp = firebase.initializeApp(config);
export const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });
