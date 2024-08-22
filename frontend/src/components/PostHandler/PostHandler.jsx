const PostHandler = ({ isSending, errorForm, isSuccess }) => {
    if (isSending)
        return <h1>Wysyłanie dane...</h1>;

    if (errorForm)
        return <h1>Błąd wysyłania danych: {errorForm}</h1>;

    if (!isSuccess)
        return <h1>Coś poszło nie tak...</h1>;
}

export default PostHandler;