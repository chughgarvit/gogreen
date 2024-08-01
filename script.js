document.addEventListener("DOMContentLoaded", function() {
    // Fetch the list of items from the file
    fetch('items.txt')
        .then(response => response.text())
        .then(data => {
            const items = data.split('\n');
            const itemList = document.getElementById('items');
            items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                itemList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching items:', error));

    // Set up the camera button functionality
    document.getElementById('cameraButton').addEventListener('click', function() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    const videoElement = document.createElement('video');
                    videoElement.srcObject = stream;
                    videoElement.play();
                    videoElement.onloadedmetadata = function() {
                        alert('Camera is ready, but this demo will not take any photo.');
                        stream.getTracks().forEach(track => track.stop()); // Stop the camera
                    };
                })
                .catch(error => console.error('Error accessing camera:', error));
        } else {
            alert('Camera API not supported in this browser.');
        }
    });
});
