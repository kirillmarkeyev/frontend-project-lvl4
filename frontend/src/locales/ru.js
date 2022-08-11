/* eslint-disable no-dupe-keys */

const ru = {
  translation: {
    loading: 'Загрузка...',
    login: {
      required: 'Обязательное поле',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      signup: 'Регистрация',
      newToChat: 'Нет аккаунта?',
      authFailed: 'Неверные имя пользователя или пароль',
      header: 'Войти',
    },
    logout: 'Выйти',
    signup: {
      required: 'Обязательное поле',
      passMin: 'Не менее 6 символов',
      mustMatch: 'Пароли должны совпадать',
      username: 'Имя пользователя',
      usernameConstraints: 'От 3 до 20 символов',
      password: 'Пароль',
      confirm: 'Подтвердите пароль',
      alreadyExists: 'Такой пользователь уже существует',
      submit: 'Зарегистрироваться',
      header: 'Регистрация',
    },
    channels: {
      main: 'Каналы',
      manage: 'Управление каналом',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    messages: {
      counter: {
        key_zero: '{{count}} сообщений',
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
      },
      new: 'Новое сообщение',
      input: 'Введите сообщение...',
      send: 'Отправить',
    },
    modalAdd: {
      channelConstraints: 'От 3 до 20 символов',
      unique: 'Должно быть уникальным',
      required: 'Обязательное поле',
      addChannel: 'Добавить канал',
      name: 'Имя канала',
      cancel: 'Отменить',
      send: 'Отправить',
    },
    modalRename: {
      channelConstraints: 'От 3 до 20 символов',
      unique: 'Должно быть уникальным',
      required: 'Обязательное поле',
      unique: 'Должно быть уникальным',
      required: 'Обязательное поле',
      renameChannel: 'Переименовать канал',
      name: 'Имя канала',
      cancel: 'Отменить',
      send: 'Отправить',
    },
    modalRemove: {
      removeChannel: 'Удалить канал',
      confirm: 'Уверены?',
      cancel: 'Отменить',
      remove: 'Удалить',
    },
    notFound: {
      header: 'Страница не найдена',
      message: 'Но вы можете перейти ',
      linkText: 'на главную страницу',
    },
    errors: {
      network: 'Ошибка соединения',
      unknown: 'Неизвестная ошибка',
    },
    private: {
      header: 'Скрытая страница!',
      message: 'Авторизован пользователь: {{username}}',
    },
  },
};

export default ru;
