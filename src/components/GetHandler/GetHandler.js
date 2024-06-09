const GetHandler = ({ isLoading, error, children }) => {
    if (isLoading)
        return <div>Pobierane dane...</div>;

    if (error)
        return <div>Błąd pobierania danych: {error}</div>;

    if (children)
        return children

    return <div>Brak danych do wyświetlenia</div>;
}

export default GetHandler;