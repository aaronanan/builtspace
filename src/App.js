import React, { useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import './styles/App.css';
import NavBar from './components/Navbar'
import Login from './components/Login'
import { AppContext } from "./libs/contextLib";
import Router from './Router'
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

const initialFormState = {
  formType: 'signIn',
  username: '',
  password: '',
  newPassword: '',
  confirmNewPassword: '',
  error: '',
  isLoading: false
}

function App() {
  const [formState, updateFormState] = useState(initialFormState)
  const [user, updateUser] = useState(null)
  const { formType, error } = formState

  useEffect(() => {
    checkUser()
    setAuthListener()
  }, [])

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      updateUser(user)
      updateFormState(() => ({ ...formState, formType: 'signedIn' }))
    } catch (err) {
      updateUser(null)
    }
  }

  async function setAuthListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
            console.log('user signed in');
            break;
        case 'signOut':
          updateFormState(() => ({ ...formState, formType: 'signIn' }))
            break;
      }
    });
  }

  function handleChange(event) {
    event.persist()
    updateFormState(() => ({ ...formState, [event.target.name]: event.target.value }))
  }

  
  // return (
  //   <div className="App">
  //     { 
  //       formType === 'signIn' && (
  //         <div>
  //           <input name="username" onChange={onChange} placeholder="username" />
  //           <input name="password" onChange={onChange} type="password" placeholder="password" />
  //           <button onClick={signIn}>Sign In</button>
  //           { error != '' && (
  //             <p>{ error }</p>
  //           )}
  //         </div>
  //       )
  //     }
  //     { 
  //       formType === 'changePassword' && (
  //         <div>
  //           <input name="newPassword" onChange={onChange} type="password" placeholder="password" />
  //           <input name="confirmNewPassword" onChange={onChange} type="password" placeholder="confirm password" />
  //           <button onClick={changePassword}>Change Password</button>
  //           { error != '' && (
  //             <p>{ error }</p>
  //           )}
  //         </div>
  //       )
  //     }
  //    { 
  //       formType === 'signedIn' && 
  //       (
  //         <Router />
  //       )
  //     }
  //   </div>
  // );

  return (
    <div className="App">
      <NavBar />
      { (formState.formType == 'signIn' || formType == 'changePassword') && (
        <Login formState={formState} user={user} onChange={handleChange} updateFormState={updateFormState} />
      )}
      { formState.formType == 'signedIn' && (
        <Router />
      )}
    </div>


  )

}

export default App