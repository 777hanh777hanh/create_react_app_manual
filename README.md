# Create React-app Manual

[Blog link](https://fullstack.edu.vn/blog/phan-1-tao-du-an-reactjs-voi-webpack-va-babel.html)

## 1. Cấu trúc dự án

```shell
react-webpack # thư mục gốc
    | src # thư mục chứa source code chính
        | components # thư mục chứa components
        | index.js # File khởi tạo, render App vào #root
    | public
        | index.html # HTML page, nơi chứa #root element
```

## 2. Khởi tạo dự án

-   Mở VSCode IDE
-   Chọn `File` --> `Add Folder to Workspace`.
-   Tạo một thư mục mới tên là **react-webpack** sau đó _**chọn thư mục đó và click vào `Add`**_.

## 3. Mở Terminal

-   Terminal -> New Terminal
-   Chạy lệnh `npm init`
-   Khi đó trong Terminal sẽ yêu cầu nhập một số thông tin để mô tả cho dự án. Có thể nhập thông tin vào nếu muốn, nếu muốn đặt mặc định ta nhấn **`Enter`**.
-   Sau khi khởi tạo dự án thành công ta sẽ có file `package.json` trong thư mục dự án.

> `package.json` là file chứa thông tin dự án như: tên dự án, phiên bản, mô tả, các thư viện được sử dụng trong dự án, v.v

## 4. Cài đặt webpack

-   Chạy lệnh sau để cài đặt 2 thư viện là webpack và webpack-cli:

```command
npm install react react-dom --save
```

> `devDependencies` trong file `package.json` chứa các thư viện được cài đặt với flag --save-dev.

## 5. Cài đặt React và React-DOM

-   Chạy lệnh sau:

```command
npm install react react-dom --save
```

> `--save` để thêm các thư viện được cài vào phần **dependencies** trong `package.json`. Đây là các thư viện được sử dụng trong dự án, bao gồm cả **development & production**. Từ phiên bản NPM 5 trở đi thì **`--save` được thêm vào mặc định**, nếu đang sử dụng _**NPM >= 5**_ thì có thể **không cần --save**.

## 6. Cài đặt Babel

-   Chạy lệnh sau:

```command
npm install @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

-   babel-core: Chuyển đổi ES6 về ES5
-   babel-loader: Cho phép chuyển các files Javascript sử dụng Babel & Webpack
-   babel-preset-env: Cài đặt sẵn giúp bạn sử dụng Javascript mới nhất trên nhiều môi trường khác nhau (nhiều trình duyệt khác nhau). Gói này đơn giản là support chuyển đổi ES6, ES7, ES8, ES... về ES5.
-   babel-preset-react: Hỗ trợ chuyển đổi JSX về Javascript

## 7. Tạo index.html

Tại thư mục gốc của dự án hãy tạo file **`public/index`**.html và thêm vào cấu trúc HTML mặc định như sau:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

> Thêm nhanh cấu trúc HTML mặc định với VSCode, gõ **`!`** và nhấn `Tab`.

## 8. Tạo file index.js

-   Tại thư mục gốc của dự án hãy tạo file **`src/index.js`** và thêm vào nội dung sau:

```jsx
import React from 'react'; // nạp thư viện react
import ReactDOM from 'react-dom'; // nạp thư viện react-dom

// Tạo component App
function App() {
    return (
        <div>
            <h1>Hello World!</h1>
        </div>
    );
}

// Render component App vào #root element with React, React-DOM version 18+
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
```

<br />

# Cấu hình webpack

## 1. Cài đặt CSS-Loader và Style-Loader

-   2 thư viện này giúp webpack có thể tải file .css dưới dạng module.

```command
npm install css-loader style-loader --save-dev
```

## 2. Tạo webpack.config.js

-   Tạo file **`webpack.config.js` tại thư mục gốc của dự án** với nội dung sau:

```js
const path = require('path');

module.exports = {
    entry: './src/index.js', // Dẫn tới file index.js ta đã tạo
    output: {
        path: path.join(__dirname, '/build'), // Thư mục chứa file được build ra
        filename: 'bundle.js', // Tên file được build ra
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Sẽ sử dụng babel-loader cho những file .js
                exclude: /node_modules/, // Loại trừ thư mục node_modules
                use: ['babel-loader'],
            },
            {
                test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    // Chứa các plugins sẽ cài đặt trong tương lai
    plugins: [],
};
```

> lưu ý đặt file `webpack.config.js` ở **thư mục gốc**, ngang hàng với package.json

## 3. Tạo file **.babelrc**

-   File **`.babelrc`** dùng để cấu hình cho thư viện Babel.
-   Tại thư mục gốc dự án tạo file **`.babelrc`** và thêm nội dung sau:

```js
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

> Cài đặt này để cho Babel biết sử dụng **preset-env** và **preset-react** trong việc hỗ trợ chuyển đổi mã.

## 4. Thêm scripts cho dự án

-   Tại **`package.json`** thêm nội dung sau:

```json
"scripts": {
    ...
    "start": "webpack --mode development --watch",
    "build": "webpack --mode production"
}
```

> Cấu hình scripts này để có thể chạy lệnh tương ứng qua Terminal. Ví dụ: **npm start** sẽ chạy lệnh ở phần start, **npm run build** sẽ chạy lệnh ở phần build. Trừ `start` ra thì cần thêm từ `run` để chạy lệnh.

<br />

# Chạy dự án

## 1. Biên dịch code với Webpack

-   Tại Terminal hãy chạy:

```command
npm start
```

> Lệnh này sẽ chạy **`webpack --mode development --watch`** mà ta đã cấu hình trong `package.json`, _**--watch**_ để webpack sẽ luôn lắng nghe thay đổi, khi file thay đổi webpack sẽ thực hiện biên dịch.

-   Có file mới được tạo ra trong **`build/bundle.js`** (vì ta đã cấu hình như vậy trong `webpack.config.js`)
-   Nội dung trong build/bundle.js chính là code của file src/index.js đã được Babel chuyển đổi.

## 2. Chạy dự án với Live Server (VSCode)

-   Tại file `public/index.html` thêm thẻ script link tới file `build/bundle.js`

```html
<script src="../build/bundle.js"></script>
```

-   Sau đó chạy **Live Server** tại file `public/index.html`.

> Flow chạy của Project:
>
> 1. Webpack khi được chạy sẽ lắng nghe thay đổi của file
>
> 2. Khi file thay đổi Webpack sẽ biên dịch và update vào build/bundle.js
>
> 3. Website được chạy sẽ link file script từ build/bundle.js
>
> 4. Live Server chạy web và lắng nghe thay đổi của build/bundle.js để F5 lại trang

<br />

# Cài đặt html-webpack-plugin

## 1. Tại sao lại sử dụng html-webpack-plugin

-   html-webpack-plugin ra đời để giúp Webpack sau khi build ra build/bundle.js thì thêm vào public/index.html thay vì phải thêm thử công câu lệnh `<script src="../build/bundle.js"></script>`.

## 2. cài đặt

-   Tắt Terminal
-   chạy cậu lệnh sau:

```command
npm install html-webpack-plugin --save-dev
```

## 3. cấu hình

-   Tại `webpack.config.js`, thêm:

```js
...
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  ...
  // Chứa các plugins sẽ cài đặt trong tương lai
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
```

-   Tại file `public/index.html` xoá dòng lệnh `<script src="../build/bundle.js"></script>`.

## 4. Chạy Project

-   Nhấn `Ctrl + C` tại Terminal và chạy lại lệnh `npm start`.
-   Tại thư mục `build` sẽ được webpack tạo ra file **index.html** đã link thẻ script tới file `build/bundle.js`.
-   Chạy **live server** với file `build/index.html`.

> Thuộc tính **defer** trong thẻ script để báo với trình duyệt rằng hãy thực thi code Javascript sau khi HTML đã được parse xong. Điều này giúp đặt được thẻ script trên thẻ head mà code Javascript vẫn có thể truy cập được HTML DOM viết dưới body.

<br />

# Cài đặt webpack-dev-server

Trong thực tế khi ta đã cài đặt Node và sử dụng Webpack thì ta sẽ không cần dùng tới Live Server. Node có thể start được web server (máy chủ web).

Cài thêm `webpack-dev-server` để có được một web server kết hợp được Webpack và Node.

## 1. Cài đặt

-   chạy câu lệnh:

```command
npm install webpack-dev-server --save-dev
```

-   Sửa lại cấu hình `scripts` trong `package.json`:

```json
"scripts": {
    ...
    "start": "webpack-dev-server --mode development --open --hot",
    ...
}
```

-   Tắt Live Server, nhấn **`Ctrl + C`** tại Terminal và chạy lại lệnh `npm start`.

## 2. Thay đổi port khi chạy Project

-   Tại `webpack.config.js` ta thêm đoạn code sau:

```js
const path = require('path');

module.exports = {
    ...
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 5501, // Địa chỉ Port muốn thay đổi
    },
};
```
