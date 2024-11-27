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
const tableName = 'attendance'

const getComments = () => {
	const dbRef = ref(db, `${tableName}/`)
	$('#comments').html('')
	const commentsDiv = $('#comments');
	
	onValue(dbRef, (snapshot) => {
		snapshot.forEach((childSnapshot) => {
			const childKey = childSnapshot.key;
			const childData = childSnapshot.val();
			const elem = document.createElement('div')
      elem.innerHTML = `
        <div class="comment-item">
          <p><strong>${childData.name}</strong>: ${childData.comment}</p>
          <p><em>${childData.attendance}</em></p> <!-- Display attendance status -->
        </div>
      `;

	      $(elem).appendTo(commentsDiv);
	  	});
	},{
		onlyOnce: true
    });
}

$(function(){
    getComments();
    
		$('#attendanceForm').submit(function(e){
        // Add loading screen
		$('#loadingScreen').addClass('show');
        e.preventDefault();
        
        // Ambil data dari form
        const name = $('#name').val();
        const comment = $('#comment').val();
		const attendance = $('#attendance').val();
        
        // Simpan data ke Realtime database
        const userId = push(child(ref(db), tableName)).key;
        set(ref(db, `${tableName}/${userId}`), {
            name: name,
            comment: comment,
			attendance: attendance
        }).then(() => {
          
            // Reset form
            $('#name').val('');
            $('#comment').val('');
			$('#attendance').val('');
			
            getComments();
        }).catch((error) => {
            console.error("Error submitting data:", error);
        }).finally(() => {
            // Menyembunyikan loading screen secara perlahan
            setTimeout(() => {
                $('#loadingScreen').removeClass('show');
            }, 2000); // Menghapus class 'show' setelah 2 detik
        });
    });
});
