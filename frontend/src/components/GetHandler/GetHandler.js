const GetHandler = ({ isLoading, error, children }) => {
    if (isLoading)
        return <h1>Pobierane dane...</h1>;

    if (error)
        return <h1>Błąd pobierania danych: {error}</h1>;

    if (children)
        return children

    return <h1>Brak danych do wyświetlenia</h1>;
}

export default GetHandler;