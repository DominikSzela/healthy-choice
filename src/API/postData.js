const postData = (formData, url) => {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return true; // submitted successfully
        })
        .catch(error => {
            console.error('Error:', error);
            return false; // submission failed
        });
}

export { postData };