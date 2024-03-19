document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("saveButton");

    saveButton.addEventListener("click", function () {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        saveData({ name, email });
    });

    function saveData(data) {
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Data saved successfully on the server');
                } else {
                    console.error('Error saving data on the server');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
