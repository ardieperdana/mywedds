<script>
    document.getElementById('ucapanForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nama = document.getElementById('nama').value;
        const pesan = document.getElementById('pesan').value;

        if (nama && pesan) {
            const ucapanList = document.getElementById('ucapanList');

            const ucapanItem = document.createElement('div');
            ucapanItem.className = 'ucapan-item';

            const ucapanNama = document.createElement('h3');
            ucapanNama.textContent = nama;

            const ucapanPesan = document.createElement('p');
            ucapanPesan.textContent = pesan;

            ucapanItem.appendChild(ucapanNama);
            ucapanItem.appendChild(ucapanPesan);

            ucapanList.appendChild(ucapanItem);

            document.getElementById('ucapanForm').reset();
        }
    });
</script>
