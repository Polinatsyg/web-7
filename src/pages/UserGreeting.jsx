import { Component } from 'react'

export class UserGreeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            greeting: '',
            isLoading: false,
            error: null,
            };
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    // Функция для отправки запроса на сервер
    handleSubmit = () => {
        const { name } = this.state;
        if (!name) return;  // Если имя не указано, не отправляем запрос
        this.setState({ isLoading: true, error: null });
        fetch(`http://localhost:9000/api/user?name=${name}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
          return response.text();  // Ожидаем текстовый ответ
        })
        .then((data) => {
            this.setState({ greeting: data, isLoading: false });
        })
        .catch((error) => {
            this.setState({ error: error.message, isLoading: false });
        });
    };

    render() {
        const { name, greeting, isLoading, error } = this.state;
        
        return (
        <div className="user-greeting">
            <h2>Приветствие</h2>
            
            {/* Поле для ввода имени */}
            <input
            type="text"
            value={name}
            onChange={this.handleNameChange}
            placeholder="Введите ваше имя"
            />
            <button onClick={this.handleSubmit} disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Получить приветствие'}
            </button>

            {/* Отображаем ошибку, если она есть */}
            {error && <div className="error">{error}</div>}

            {/* Отображаем приветствие */}
            {greeting && <div className="greeting">{greeting}</div>}
        </div>
        );
    }
}