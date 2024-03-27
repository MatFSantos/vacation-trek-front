import { useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div id='error-page'>
            <h1>Xi!</h1>
            <p>Desculpe, um erro inesperado aconteceu.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default Error;