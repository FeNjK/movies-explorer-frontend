# **Фронтенд дипломного проекта**

## **Описание проекта**

Данный проект посвящен созданию приложения по поиску фильмов из базы данных (предложенной ЯП) с возможностью их сохранения в на странице пользователя, предварительно прошедшего регистрацию и аутентификацию, а так же возможностью редактирования пользовательских данных.

### **Функциональность**

___

- ***Общие***

  - Работают оба состояния шапки: если пользователь не залогинился, в шапке должны быть кнопки «Войти» и «Регистрация»; если пользователь залогинился, кнопки исчезают — и появляются кнопки «Фильмы», «Сохранённые фильмы» и «Аккаунт», в том числе и на главной странице.

  - При поиске текст запроса, найденные фильмы и состояние переключателя короткометражек сохраняются в хранилище. Если пользователь повторно переходит на страницу фильмов, то при монтировании компонента данные достаются из локального хранилища. Страница отображается в соответствии с загруженными из хранилища данными.

  - Все формы валидируются и на стороне клиента. Пользователь не может отправить запрос с невалидными данными.

- ***Страницы «Регистрация» и «Авторизация»:***

  - На странице «Регистрация» клик по кнопке «Зарегистрироваться» отправляет запрос на роут `/signup`, если данные введены корректно. Если запрос прошёл успешно, то автоматически производится вход и редирект на страницу `/movies`.

  - На странице «Авторизация» клик по кнопке «Войти» отправляет запрос на роут `/signin`, если данные введены корректно. Если запрос прошёл успешно, происходит редирект на страницу `/movies`.

  - Все формы валидируются и на стороне клиента.

- ***Страница редактирование профиля:***

  - На странице редактирования профиля клик по кнопке «Сохранить» отправляет запрос на роут `/users/me`, если данные введены корректно.

  - Пользователю отображается уведомление об успешном запросе к серверу при сохранении профиля.

  - Если на странице редактирования профиля введённая информация соответствует текущим данным пользователя, кнопка «Сохранить» заблокирована и нельзя отправить запрос сохранения.

- ***Поиск фильмов:***

  - Прелоадер крутится во время выполнения запроса фильмов.

  - Настроена работа с фильтрами:

    - Поиск фильмов регистронезависимый.

    - Если запрос выполняется впервые, то работа с фильтром происходит после получения данных.

    - Если карточки уже были отображены на странице в блоке результатов, клик по чекбоксу «Короткометражки» приводит к повторной фильтрации результата.

  - После успешного сабмита формы поиска появляется блок с результатами.

  - Если ничего не найдено, выводится надпись «Ничего не найдено».

  - На странице всех фильмов в блоке результата отображается такое же количество карточек, как в макете. Нажатие на кнопку «Ещё» отображает следующий ряд с тем же числом карточек. При отображении всех карточек кнопка "Ещё" скрывается.

- ***Карточки:***

  - Карточка состоит из изображения, названия фильма и его длительности. Длительность фильма рассчитывается корректно и соответствует формату в макете. Клик по карточке ведёт на трейлер фильма.

  - Кнопка лайка имеет правильное состояние, в зависимости от того, добавлен ли фильм в сохранённые или нет.

  - При клике на иконку «Лайк» в блоке карточки выполняется запрос к `/movies` нашего API для установки или снятия лайка, в зависимости от текущего состояния.

- ***На странице «Сохранённые фильмы»:***

  - Отображается форма поиска. Она позволяет искать фильмы по уже полученным данным о сохранённых фильмах.

  - Блок карточки содержит кнопку удаления, а не лайка.

  - При нажатии на кнопку удаления выполняется запрос на удаление фильма. После успешного запроса карточка удаляется со страницы.

___

### **Технические особенности**

___

- ***Регистрация и авторизация***

  - Роуты `/saved-movies, /movies, /profile` защищёны HOC-компонентом `ProtectedRoute`. Роуты `/ , /signin, /signup` не являются защищёнными.

  - При попытке перейти на любой защищённый роут происходит редирект на `/`.

  - Если пользователь был авторизован и закрыл вкладку, он может вернуться сразу на любую страницу приложения по URL-адресу, кроме страниц авторизации и регистрации.

  - После успешного вызова обработчика `onSignOut` происходит редирект на `/`.

  - Корректно используется хук `useHistory`.

  - При попытке перейти на несуществующую страницу происходит редирект на страницу «404».

  - Корректно используются компоненты `<Switch />`, `<Route />` и `<Redirect />`.

- ***Работа с JWT***

  - `JWT`-токен хранится в `cookie`;

  - `Jwt` проверяется запросом к серверу, а не только в локальном хранилище.

  - При выходе из аккаунта `jwt` удаляется.

- ***Контекст***

  - В корневом компоненте `App` создана стейт-переменная, которая хранит данные пользователя. Она используется в качестве значения для провайдера контекста.

  - В компонент `App` внедрён контекст через `CurrentUserContext.Provider`.

  - Компоненты, в которых используются данные профиля, подписаны на контекст.

- ***Асинхронные запросы к API:***

  - Запросы осуществлялись через `Fetch API`.

  - Запросы к `API` вынесены в отдельные файлы: `MainApi.js` и `MoviesApi.js`.

  - Запрос всех фильмов с сервиса `beatfilm-movies` производится только при первом поиске; все сохранённые фильмы не запрашиваются с сервера при каждом лайке или дизлайке; данные пользователя запрашиваются один раз при запуске приложения.

### **Ссылки**

___
Ссылка на скачивание макета моего дипломного проекта. <a href="https://disk.yandex.ru/d/5Ny1TruXQyxovA"><img src="https://user-images.githubusercontent.com/25181517/189715289-df3ee512-6eca-463f-a0f4-c10d94a06b2f.png" alt="Figma" width="30" height="30" align="center" /></a>

Адрес сайта с дипломным проектом <a href="https://find-and-save.nomoredomains.icu"><img src="./public/favicon.ico" alt="Site" width="30" height="30" align="center" /></a>

### **Статус проекта и планы на будущее**

___
На данный момент проект полностью работоспособен.

Задачи:

- Переработать анимацию бургер-меню;
- Футер "прилепить" к верхней части экрана;
- Увеличить снизу отступ ссылки на профиль в бургер-меню.
- Добавить возможность закрытия меню по нажатию на оверлей или ESC.
- Добавить админ-панель с CRUD-функционалом.

<!-- |||||
|:-:|:-:|:-:|:-:|
|1|2|3|4|

<style>
table th:first-of-type {
    width: 25%;
}
table th:nth-of-type(2) {
    width: 40%;
}
table th:nth-of-type(3) {
    width: 50%;
}
table th:nth-of-type(4) {
    width: 50%;
}
</style> -->
