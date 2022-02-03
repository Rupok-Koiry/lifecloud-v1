import { initializeApp } from 'firebase/app';

//Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDHVhOIO7RJvbzg0AebQGkNcAMZhWfp2eU',
  authDomain: 'life-cloud-fiverr.firebaseapp.com',
  projectId: 'life-cloud-fiverr',
  storageBucket: 'life-cloud-fiverr.appspot.com',
  messagingSenderId: '279791768228',
  appId: '1:279791768228:web:5741ed0dc3834182bccc31',
};

// Initialize Firebase
const initializeAuthentication = () => {
  return initializeApp(firebaseConfig);
};

export default initializeAuthentication;
