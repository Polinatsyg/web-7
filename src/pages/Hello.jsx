import { Component } from 'react'

export class HelloPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: null,

            isLoading: true
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8080/get')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.text(); // Получаем текст HTML, а не промис
        })
            .then((data) => {
                this.setState({
                    response: data,
                    isLoading: false
                })
                
            })
            .catch((error) => {
                console.log('Произошла ошибка')
                console.log(error.message)
            });
    }

    render() {
        return (
            <div className='hello-page'>
                <h2>Hello page</h2>

                {this.state.isLoading && (
                    <div className='loader'>
                        Загрузка...
                    </div>
                ) || (
                    <div
                        className="html-content"
                        dangerouslySetInnerHTML={{ __html: this.state.response }} // Вставляем HTML-контент
                    />
                )}
            </div>
        );
    }

}