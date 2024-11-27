// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, set, ref ,push, child, onValue} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCH-E3oCqTNZtf4YCiMlEVSudYs997rQrQ",
	authDomain: "mywedds-bd172.firebaseapp.com",
	projectId: "mywedds-bd172",
	storageBucket: "mywedds-bd172.firebasestorage.app",
	messagingSenderId: "409991053068",
	appId: "1:409991053068:web:0c01abf4301a0799591329",
	measurementId: "G-S9V6GYD8PE",
	databaseURL: "https://mywedds-bd172-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const getComments = () => {
	const dbRef = ref(db, 'attendance/')
	const commentsDiv = $('#comments');
	onValue(dbRef, (snapshot) => {
		snapshot.forEach((childSnapshot) => {
	      const childKey = childSnapshot.key;
	      const childData = childSnapshot.val();
	      const elem = document.createElement('div')
	      elem.innerHTML = `
	      	<p><strong>${data.name}</strong>: ${data.comment}</p>
	      `;

	      $(elem).appendTo(commentsDiv);
	  	});
	},{
		onlyOnce: true
    });
}

$(function(){
	$('#attendanceForm').submit(function(e){
	    event.preventDefault();

	    // Ambil data dari form
	    const name = $('#name').val();
	    const comment = $('#comment').val();
	    
	    // Simpan data ke Realtime database
	    const userId = push(child(ref(db), 'attendance')).key
	    set(ref(db, `attendance/${userId}`), {
	    	name: name,
	    	comment: comment,
	    });
	    $('#attendanceForm').reset();
	    alert("Data submitted successfully!");
    })
});