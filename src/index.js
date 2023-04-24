import React from 'react' // nạp thư viện react
import ReactDOM from 'react-dom/client' // nạp thư viện react-dom

// Tạo component App
function App() {
    return (
        <div>
            <h1>Xin chào anh em F8!</h1>
            <h2>Mình tên là 777hanh</h2>
            <h3>Yêu Trà My rất nhiều!</h3>
            <a
                style={{ textDecoration: 'none', color: 'blue' }}
                target='_blank'
                href='https://fullstack.edu.vn/blog/phan-1-tao-du-an-reactjs-voi-webpack-va-babel.html'
            >
                Link Blog giới thiệu cách tạo Project React Thủ công
            </a>
            <a
                target='_blank'
                style={{ textDecoration: 'none', color: 'blue' }}
                href='https://webpack.js.org/configuration/dev-server/'
            >
                Thay đổi port của devServer khi chạy Project
            </a>
        </div>
    )
}

// Render component App vào #root element
// ReactDOM.render(<StrictMode><App /></StrictMode>, document.getElementById('root'))

// // Render component App vào #root element with React, React-DOM version 18+
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<React.StrictMode><App /></React.StrictMode>);


