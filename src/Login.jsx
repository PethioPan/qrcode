// import React, { useState, useEffect } from 'react'
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import "./App.css";

export default function Login() {
  // const [user, setUser] = useState([]);
  // const [profile, setProfile] = useState(null);

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => {
  //     setUser(codeResponse)
  //     console.log(codeResponse, "--------- LOGIN RESPONSE ---------");
  //   },
  //   onError: (error) => console.log('Login Failed:', error)
  // });

  // useEffect(
  //   () => {
  //     if (user) {
  //       axios
  //         .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: 'application/json'
  //           }
  //         })
  //         .then((res) => {
  //           setProfile(res.data);
  //           console.log(res.data, "PROFILE RESPONSE");

  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   },
  //   [user]
  // );

  // // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  return (
    <div>
      <h2>Renaissance Login</h2>
      {/* {profile ? (
        <div>
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button 
        // onClick={login}
        >Sign in with Google 🚀 </button>
      )} */}
    </div>
  )
}
