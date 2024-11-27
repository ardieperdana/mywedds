
<script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"></script>
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCH-E3oCqTNZtf4YCiMlEVSudYs997rQrQ",
authDomain: "mywedds-bd172.firebaseapp.com",
projectId: "mywedds-bd172",
storageBucket: "mywedds-bd172.firebasestorage.app",
messagingSenderId: "409991053068",
appId: "1:409991053068:web:0c01abf4301a0799591329",
measurementId: "G-S9V6GYD8PE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

$(function(){
	$('#attendanceForm').submit(function(e){
        event.preventDefault();
    
        // Ambil data dari form
        const name = $('#name').val();
        const comment = $('#comment').val();
        
        // Simpan data ke Firestore
        db.collection('attendance').add({
            name: name,
            comment: comment,
        }).then(() => {
            alert("Data submitted successfully!");
            // Clear form
            $('#attendanceForm').reset();
        })
        .catch(error => {
            alert("Error submitting data: " + error);
        });
      });
      
      db.collection('attendance').orderBy('desc').onSnapshot(snapshot => {
      const commentsDiv = $('#comments');
      commentsDiv.innerHTML = ''; // Clear previous comments
      
      snapshot.forEach(doc => {
        const data = doc.data();
        const commentElement = document.createElement('div');

        commentElement.innerHTML = `
          <p><strong>${data.name}</strong>: ${data.comment}</p>
        `;
        commentsDiv.appendChild(commentElement);
      });
    })
})