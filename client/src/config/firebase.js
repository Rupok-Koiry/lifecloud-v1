import { initializeApp } from 'firebase/app';
import  { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDxOfx5kzdTvpld432WIIi9ylxOO_oQKps",
    authDomain: "lifecloud-qr.firebaseapp.com",
    projectId: "lifecloud-qr",
    storageBucket: "lifecloud-qr.appspot.com",
    messagingSenderId: "139022099323",
    appId: "1:139022099323:web:642f6dc688017bc30893de",
    measurementId: "G-6JG2RCKY22"
  };    
  
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app)