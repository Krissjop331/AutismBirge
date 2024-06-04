// import React, { useState, useEffect } from 'react';
// import './applications.css';
// import { $authHost } from '../../../http';

// export const Applications = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await $authHost.get('/users');
//         const userData = response.data.users.filter(user => user.status === 'loading'); // Фильтруем пользователей по статусу "loading"
//         setUsers(userData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setErrorMessage('An error occurred while fetching users');
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleApprove = async (userId) => {
//     try {
//       await $authHost.put(`/confirmed/${userId}`, { status: 'true' });
//       const updatedUsers = users.map(user => {
//         if (user.id === userId) {
//           user.status = 'true';
//         }
//         return user;
//       });
//       setUsers(updatedUsers);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error updating user status:', error);
//       // Handle error
//     }
//   };

//   const handleRoleChange = async (userId, newRoleId) => {
//     try {
//       await $authHost.put(`/role_update/${userId}`, { role_id: newRoleId });
//       const updatedUsers = users.map(user => {
//         if (user.id === userId) {
//           user.role_id = newRoleId;
//         }
//         return user;
//       });
//       setUsers(updatedUsers);
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       // Handle error
//     }
//   };

//   const handleRoleSelect = (roleId) => {
//     setSelectedRole(roleId);
//   };

//   return (
//     <div>
//       <h2>Подтверждение</h2>
//       {loading ? (
//         <p>Загрузка...</p>
//       ) : errorMessage ? (
//         <p>{errorMessage}</p>
//       ) : (
//         <ul >
//           {users.map((user) => (
//             <li className='users_apllications' key={user.id}>
//               <div style={{display:'flex'}}>
//                 <div>{user.first_name} {user.last_name}, Статус: {user.status}, Роль: {user.role}</div>
//                 <select className='select_applications'
//                   value={user.role_id}
//                   onChange={(e) => {
//                     handleRoleChange(user.id, e.target.value);
//                     handleRoleSelect(e.target.value);
//                   }}
//                 >
//                   <option value="5">Доктор</option>
//                   <option value="6">Ребенок</option>
//                   <option value="4">Родитель</option>
//                   <option value="3">Пользователь</option>
//                   <option value="2">Админ</option>
//                 </select>
//                 {selectedRole === "6" && (
//                   // Поля для выбора родителя и доктора
//                   <>
//                     <select>
//                       {/* Код для выбора родителя */}
//                       {parents.map(parent => (
//                         <option key={parent.id} value={parent.id}>{parent.first_name} {parent.last_name}</option>
//                       ))}
//                     </select>
//                     <select>
//                       {/* Код для выбора доктора */}
//                       {doctors.map(doctor => (
//                         <option key={doctor.id} value={doctor.id}>{doctor.first_name} {doctor.last_name}</option>
//                       ))}
//                     </select>
//                   </>
//                 )}
//                 )}
//               </div>
//               <button onClick={() => handleApprove(user.id)}>Подтвердить</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };




// import React, { useState, useEffect } from 'react';
// import './applications.css';
// import { $authHost } from '../../../http';

// export const Applications = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [parents, setParents] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await $authHost.get('/users');
//         const usersData = response.data.users;
//         setUsers(usersData);

//         const doctorsData = usersData.filter(user => user.Role.name === 'doctor');
//         setDoctors(doctorsData);

//         const parentsData = usersData.filter(user => user.Role.name === 'parents');
//         setParents(parentsData);

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setErrorMessage('An error occurred while fetching data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleApprove = async (userId) => {
//     try {
//       await $authHost.put(`/confirmed/${userId}`, { status: 'true' });
//       const updatedUsers = users.map(user => {
//         if (user.id === userId) {
//           user.status = 'true';
//         }
//         return user;
//       });
//       setUsers(updatedUsers);
//     } catch (error) {
//       console.error('Error updating user status:', error);
//       // Handle error
//     }
//   };

//   const handleRoleChange = async (userId, newRoleId) => {
//     try {
//       await $authHost.put(`/role_update/${userId}`, { role_id: newRoleId });
//       const updatedUsers = users.map(user => {
//         if (user.id === userId) {
//           user.role_id = newRoleId;
//         }
//         return user;
//       });
//       setUsers(updatedUsers);
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       // Handle error
//     }
//   };

//   const handleRoleSelect = (roleId) => {
//     setSelectedRole(roleId);
//   };

//   return (
//     <div>
//       <h2>Подтверждение</h2>
//       {loading ? (
//         <p>Загрузка...</p>
//       ) : errorMessage ? (
//         <p>{errorMessage}</p>
//       ) : (
//         <ul>
//           {users.map((user) => (
//             <li className='users_apllications' key={user.id}>
//               <div style={{display:'flex'}}>
//                 <div>{user.first_name} {user.last_name}, Статус: {user.status}, Роль: {user.role}</div>
//                 <select className='select_applications'
//                   value={selectedRole || ''}
//                   onChange={(e) => {
//                     handleRoleChange(user.id, e.target.value);
//                     handleRoleSelect(e.target.value);
//                   }}
//                 >
//                   <option value="">Выбор роли</option>
//                   <option value="5">Доктор</option>
//                   <option value="6">Ребенок</option>
//                   <option value="4">Родитель</option>
//                   <option value="3">Пользователь</option>
//                   <option value="2">Админ</option>
//                 </select>
//                 {selectedRole === "6" && (
//                   // Поля для выбора родителя и доктора
//                   <>
//                     <select>
//                       {/* Код для выбора родителя */}
//                       {parents.map(parent => (
//                         <option key={parent.id} value={parent.id}>{parent.first_name} {parent.last_name}</option>
//                       ))}
//                     </select>
//                     <select>
//                       {/* Код для выбора доктора */}
//                       {doctors.map(doctor => (
//                         <option key={doctor.id} value={doctor.id}>{doctor.first_name} {doctor.last_name}</option>
//                       ))}
//                     </select>
//                   </>
//                 )}
//               </div>
//               <button onClick={() => handleApprove(user.id)}>Подтвердить</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };



// import React, { useState, useEffect } from 'react';
// import './applications.css';
// import { $authHost } from '../../../http';

// export const Applications = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [parents, setParents] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await $authHost.get('/users');
//         const usersData = response.data.users;
//         const userData = response.data.users.filter(user => user.status === 'loading'); // Фильтруем пользователей по статусу "loading"
//                 setUsers(userData);

//         const doctorsData = usersData.filter(user => user.Role.name === 'doctor');
//         setDoctors(doctorsData);

//         const parentsData = usersData.filter(user => user.Role.name === 'parents');
//         setParents(parentsData);

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setErrorMessage('An error occurred while fetching data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleApprove = async (userId) => {
//     try {
//       await $authHost.put(`/confirmed/${userId}`, { status: 'true' });
//       const updatedUsers = users.map(user => {
//         if (user.id === userId) {
//           user.status = 'true';
//         }
//         return user;
//       });
//       setUsers(updatedUsers);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error updating user status:', error);
//       // Handle error
//     }
//   };

//   const handleRoleChange = async (userId, newRoleId) => {
//     try {
//       await $authHost.put(`/role_update/${userId}`, { role_id: newRoleId });
//       const updatedUsers = users.map(user => {
//         if (user.id === userId) {
//           user.role_id = newRoleId;
//         }
//         return user;
//       });
//       setUsers(updatedUsers);
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       // Handle error
//     }
//   };

//   const handleRoleSelect = (roleId) => {
//     setSelectedRole(roleId);
//   };

//   return (
//     <div>
//       <h2>Подтверждение</h2>
//       {loading ? (
//         <p>Загрузка...</p>
//       ) : errorMessage ? (
//         <p>{errorMessage}</p>
//       ) : (
//         <ul >
//           {users.map((user) => (
//             <li className='users_apllications' key={user.id}>
//               <div style={{display:'flex'}}>
//                 <div>{user.first_name} {user.last_name}, Статус: {user.status}, Роль: {user.role}</div>
//                 <select className='select_applications'
//                   value={user.role_id}
//                   onChange={(e) => {
//                     handleRoleChange(user.id, e.target.value);
//                     handleRoleSelect(e.target.value);
//                   }}
//                 >
//                   <option value="5">Доктор</option>
//                   <option value="6">Ребенок</option>
//                   <option value="4">Родитель</option>
//                   <option value="3">Пользователь</option>
//                   <option value="2">Админ</option>
//                 </select>
//                 {selectedRole === "6" && (
//                   // Поля для выбора родителя и доктора
//                   <>
//                     <select>
//                       {/* Код для выбора родителя */}
//                       {parents.map(parent => (
//                         <option key={parent.id} value={parent.id}>{parent.first_name} {parent.last_name}</option>
//                       ))}
//                     </select>
//                     <select>
//                       {/* Код для выбора доктора */}
//                       {doctors.map(doctor => (
//                         <option key={doctor.id} value={doctor.id}>{doctor.first_name} {doctor.last_name}</option>
//                       ))}
//                     </select>
//                   </>
//                 )}
//                 )}
//               </div>
//               <button onClick={() => handleApprove(user.id)}>Подтвердить</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import './applications.css';
import { $authHost } from '../../../http';

export const Applications = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [parents, setParents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $authHost.get('/users');
        const usersData = response.data.users;
        const userData = response.data.users.filter(user => user.status === 'loading'); // Фильтруем пользователей по статусу "loading"
        setUsers(userData);

        const doctorsData = usersData.filter(user => user.Role.name === 'doctor');
        setDoctors(doctorsData);

        const parentsData = usersData.filter(user => user.Role.name === 'parents');
        setParents(parentsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await $authHost.put(`/confirmed/${userId}`, { status: 'true' });

      // Prepare data to send to backend
      const requestData = { userId };
      if (selectedRole === '6') {
        requestData.parentId = selectedParent.id;
        requestData.doctorId = selectedDoctor.id;
      }

      // Send data to backend routes
      if (selectedRole === '6') {
        await $authHost.post('/doctor_users/create', { user_id:userId , doctor_id: selectedDoctor.id });
        await $authHost.post('/parent_users/create', { user_id :userId, parent_id: selectedParent.id });
      }

      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          user.status = 'true';
        }
        return user;
      });
      setUsers(updatedUsers);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user status:', error);
      // Handle error
    }
  };

  const handleRoleChange = async (userId, newRoleId) => {
    try {
      await $authHost.put(`/role_update/${userId}`, { role_id: newRoleId });
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          user.role_id = newRoleId;
        }
        return user;
      });
      setUsers(updatedUsers);
      setSelectedRole(newRoleId); // Update selected role
    } catch (error) {
      console.error('Error updating user role:', error);
      // Handle error
    }
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleParentSelect = (parent) => {
    setSelectedParent(parent);
  };

  return (
    <div>
      <h2>Подтверждение</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li className='users_apllications' key={user.id}>
              <div className='containers_apllication'>
                <div style={{display:'flex'}}>
                <div>{user.first_name} {user.last_name}, Статус: {user.status}, Роль: {user.role}</div>
                <select className='select_applications'
                  value={user.role_id}
                  onChange={(e) => {
                    handleRoleChange(user.id, e.target.value);
                    handleRoleSelect(e.target.value);
                  }}
                >
                  <option value="5">Доктор</option>
                  <option value="6">Ребенок</option>
                  <option value="4">Родитель</option>
                  <option value="3">Пользователь</option>
                  <option value="2">Админ</option>
                </select>
                </div>
                <div className='select_containers'>
                {selectedRole === "6" && (
                  // Поля для выбора родителя и доктора
                  <>
                    <select onChange={(e) => handleParentSelect(parents.find(parent => parent.id === parseInt(e.target.value)))}>
                      {/* Код для выбора родителя */}
                      {parents.map(parent => (
                        <option key={parent.id} value={parent.id}>{parent.first_name} {parent.last_name} </option>
                      ))}
                    </select>
                    <select onChange={(e) => handleDoctorSelect(doctors.find(doctor => doctor.id === parseInt(e.target.value)))}>
                      {/* Код для выбора доктора */}
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>{doctor.first_name} {doctor.last_name} </option>
                      ))}
                    </select>
                  </>
                )}
                </div>
              </div>
              <button onClick={() => handleApprove(user.id)}>Подтвердить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



// import React, { useState, useEffect } from 'react';
// import './applications.css';
// import { $authHost } from '../../../http';

// export const Applications = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [parents, setParents] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await $authHost.get('/users');
//         const usersData = response.data.users;
//         const userData = response.data.users.filter(user => user.status === 'loading'); // Фильтруем пользователей по статусу "loading"
//                 setUsers(userData);

//         const doctorsData = usersData.filter(user => user.Role.name === 'doctor');
//         setDoctors(doctorsData);

//         const parentsData = usersData.filter(user => user.Role.name === 'parents');
//         setParents(parentsData);

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setErrorMessage('An error occurred while fetching data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleApprove = async (userId) => {
//     try {
//       await $authHost.put(`/confirmed/${userId}`, { status: 'true' });
//       const updatedUsers = users.map(user => {
//         if (user.id === userId) {
//           user.status = 'true';
//         }
//         return user;
//       });
//       setUsers(updatedUsers);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error updating user status:', error);
//       // Handle error
//     }
//   };

//   const handleRoleChange = async (userId, newRoleId) => {
//     try {
//       await $authHost.put(`/role_update/${userId}`, { role_id: newRoleId });
//       const updatedUsers = users.map(user => {
//         if (user.id === userId) {
//           user.role_id = newRoleId;
//         }
//         return user;
//       });
//       setUsers(updatedUsers);
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       // Handle error
//     }
//   };

//   const handleRoleSelect = (roleId) => {
//     setSelectedRole(roleId);
//   };

//   return (
//     <div>
//       <h2>Подтверждение</h2>
//       {loading ? (
//         <p>Загрузка...</p>
//       ) : errorMessage ? (
//         <p>{errorMessage}</p>
//       ) : (
//         <ul>
//           {users.map((user) => (
//             <li className='users_apllications' key={user.id}>
//               <div style={{display:'flex'}}>
//                 <div>{user.first_name} {user.last_name}, Статус: {user.status}, Роль: {user.role}</div>
//                 <select className='select_applications'
//                   value={user.role_id}
//                   onChange={(e) => {
//                     handleRoleChange(user.id, e.target.value);
//                     handleRoleSelect(e.target.value);
//                   }}
//                 >
//                   <option value="5">Доктор</option>
//                   <option value="6">Ребенок</option>
//                   <option value="4">Родитель</option>
//                   <option value="3">Пользователь</option>
//                   <option value="2">Админ</option>
//                 </select>
//                 {selectedRole === "6" && (
//                   // Поля для выбора родителя и доктора
//                   <>
//                     <select>
//                       {/* Код для выбора родителя */}
//                       {parents.map(parent => (
//                         <option key={parent.id} value={parent.id}>{parent.first_name} {parent.last_name} (ID: {parent.id})</option>
//                       ))}
//                     </select>
//                     <select>
//                       {/* Код для выбора доктора */}
//                       {doctors.map(doctor => (
//                         <option key={doctor.id} value={doctor.id}>{doctor.first_name} {doctor.last_name} (ID: {doctor.id})</option>
//                       ))}
//                     </select>
//                   </>
//                 )}
//               </div>
//               <button onClick={() => handleApprove(user.id)}>Подтвердить</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
