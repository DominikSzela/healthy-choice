const postForm = formData => {
    fetch("http://localhost:8081/healthy_choice/submitted", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

export {postForm};