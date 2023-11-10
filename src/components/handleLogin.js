import axios from '../api/axios'

export function handleLogin(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
          axios.post('/auth/login', {
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
              // test opo acc -
              else if (response.status === 200 && response.data.role === 'opo'){
                window.location.href ='/pending-donations';
              }
              // test provider acc
              else if(response.status === 200 && response.data.role === 'provider'){
                window.location.href ='/donors';
              }
              
              
          }).catch(error => {
            //   console.error('Error:', error);
              alert(error.response.data.message)
          });
      };
