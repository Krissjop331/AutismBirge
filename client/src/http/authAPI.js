import { $authHost, $host } from "./index";

export const fetchLogin = async (formData) => {
  try {
    const { data } = await $host.post("/signin", formData);

    // Проверяем, есть ли токен и пользователь в ответе
    if (data.token && data.user) {
      // Сохраняем токен в локальное хранилище
      localStorage.setItem("token", data.token);
      
      // Получаем роль пользователя
      const role = data.user.Role.name;

      // Сохраняем роль пользователя в локальное хранилище
      localStorage.setItem("role", role);

      return data;
    } else {
      throw new Error("Ошибка в ответе сервера");
    }
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
};

export const fetchLogout = async () => {
  const { data } = await $authHost.get("/signout");
 
  return data;
};


// import { $authHost, $host } from '.';
// import { setIsAuth } from './path/to/your/mainReducer';

// export const fetchLogin = async (formData, dispatch) => {
//   try {
//     const { data } = await $host.post("/signin", formData);
//     localStorage.setItem("token", data.token);
//     dispatch(setIsAuth(true)); // Устанавливаем isAuth в true
//     return data;
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error; // Обрабатываем ошибку или прокидываем выше
//   }
// };

// export const fetchLogout = async (dispatch) => {
//   try {
//     const { data } = await $authHost.get("/signout");
//     localStorage.removeItem("token");
//     dispatch(setIsAuth(false)); // Устанавливаем isAuth в false
//     return data;
//   } catch (error) {
//     console.error('Logout error:', error);
//     throw error; // Обрабатываем ошибку или прокидываем выше
//   }
// };