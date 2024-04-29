const user = localStorage.getItem("user");
const userParse = JSON.parse(user);
if (!userParse?.accessToken) {
    window.location.replace('/login');
}

document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");
    const previewButton = document.getElementById("previewButton");
    const uploadForm = document.getElementById("uploadForm");
    const prevUploadFiles = document.getElementById("previewUploadFilesButton");
    const uploadFileList = document.getElementById("uploadFileList");

    fileInput.addEventListener("change", function (event) {
        fileList.innerHTML = "";

        Array.from(fileInput.files).forEach(file => {
            const listItem = document.createElement("li");
            listItem.textContent = file.name;
            fileList.appendChild(listItem);
        });
    });
        
    
    prevUploadFiles.addEventListener("click", async function (event) {
        event.preventDefault();
        uploadFileList.innerHTML = "";

        const fileResult = await fetch("/upload/assets", { method: "GET", headers: { "token": `Bearer ${userParse?.accessToken}` } });
        const fileResultJson = await fileResult.json();

        Array.from(fileResultJson).forEach(file => {
            const listItem = document.createElement("li");
            listItem.textContent = file;
            let dataBody = {
                filename : file,
                name:"sso"
            }
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "❌";
            deleteButton.addEventListener("click", async function () {
                const deleteResult = await fetch("/upload/delete?filename=" + file, {
                    method: "DELETE",
                    headers: {
                        "token": `Bearer ${userParse?.accessToken}`,

                    }
                });

                if (deleteResult?.ok) {
                    await deleteResult.json();
                    window.location.reload();
                }

                listItem.remove();
            });
            listItem.append(deleteButton)
            uploadFileList.appendChild(listItem);
        });
    })

    previewButton.addEventListener("click", function (event) {
        event.preventDefault();
        fileList.innerHTML = "";

        Array.from(fileInput.files).forEach(file => {
            const listItem = document.createElement("li");
            listItem.textContent = file.name;
            fileList.appendChild(listItem);
        });
    });

    uploadForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData();
        Array.from(fileInput.files).forEach(file => {
            formData.append('files', file);
        });
        console.log(userParse?.accessToken)
        fetch('/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'token': `Bearer ${userParse?.accessToken}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Files uploaded successfully:', data);

            })
            .catch(error => {
                console.error('Error uploading files:', error);

            });

    });
});
