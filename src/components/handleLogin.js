import {axiosSetup1} from '../api/axios'

export function handleLogin(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axiosSetup1.post('/auth/login', {
            email: data.get('email'),
            password: data.get('password')
          })
          .then(response => {
            //   console.log("Logged in", response)
              // handle roles auth here
              // test patient acc - jane@mail.com patient1234
              if (response.status === 200 && response.data.role === 'patient'){
                window.location.href ='/patient-profile';
              }
              // test opo acc - jack@mail.com opo1234
              else if (response.status === 200 && response.data.role === 'opo'){
                window.location.href ='/pending-donations';
              }
              // test provider acc - john@mail.com provider1234
              else if(response.status === 200 && response.data.role === 'provider'){
                window.location.href ='/donors';
              }
              
              
          }).catch(error => {
            //   console.error('Error:', error);
              alert(error.response.data.message)
          });
      };
