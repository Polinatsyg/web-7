import { Component } from 'react'

export class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: '',
            value: '',
            isLoading: false,
            error: null,
            };
    }

    handleCountChange = (event) => {
        this.setState({ count: event.target.value });
    };

    handleGet = () => {
        fetch('http://localhost:3333/count')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.text();
        })
        .then((data) => {
            this.setState({ value: data, isLoading: false });
        })
        .catch((error) => {
            this.setState({ error: error.message, isLoading: false });
        });
    }
    handlePost = () => {
        const { count } = this.state;
        if (!count) return;
        this.setState({ isLoading: true, error: null });
        const data = new URLSearchParams();
        data.append("count", count)
        fetch(`http://localhost:3333/count`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data.toString()
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.text();
        })
        .then((data) => {
            this.setState({ value: data, isLoading: false, error: null });
        })
        .catch((error) => {
            this.setState({ error: error.message, isLoading: false });
        });
    };

    render() {
        const { count, value, isLoading, error } = this.state;
        
        return (
        <div className="counter">
            <h2>Счетчик</h2>
            
            <input
            type="number"
            value={count}
            onChange={this.handleCountChange}
            />
            <button onClick={this.handleGet} disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Получить значение'}
            </button>

            <button onClick={this.handlePost} disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Увеличить значение'}
            </button>

            {error && <div className="error">{error}</div>}

            {value && <div className="value">{value}</div>}
        </div>
        );
    }
}