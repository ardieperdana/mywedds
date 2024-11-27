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
		// .then(() => {
	    //     alert("Data submitted successfully!");
	    //     // Clear form
	    //     $('#attendanceForm').reset();
	    // }).catch(error => {
	    //     alert("Error submitting data: " + error);
	    // });
      
	    // db.collection('attendance').orderBy('desc').onSnapshot(snapshot => {
    	// 	const commentsDiv = $('#comments');
    	// 	commentsDiv.innerHTML = ''; // Clear previous comments
    	// 	snapshot.forEach(doc => {
    	// 		const data = doc.data();
    	// 		const commentElement = document.createElement('div');
    	// 		commentElement.innerHTML = `
    	// 		<p><strong>${data.name}</strong>: ${data.comment}</p>
    	// 		`;
    	// 	commentsDiv.appendChild(commentElement);
    	// });
    })
});