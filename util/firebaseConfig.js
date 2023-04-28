import fireBase,{initializeApp} from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyAzWX9dAPICRG_qlv1-J__zwyKKm3UC3dA",
    authDomain: "native-expense-app-95082.firebaseapp.com",
    databaseURL: "https://native-expense-app-95082-default-rtdb.firebaseio.com",
    projectId: "native-expense-app-95082",
    storageBucket: "native-expense-app-95082.appspot.com",
    messagingSenderId: "948716760649",
    appId: "1:948716760649:web:2effca9a0ca52668ce1998",
    measurementId: "G-8Q8N3RSJQB"
};

initializeApp(firebaseConfig);

export default fireBase;