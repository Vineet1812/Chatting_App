import { useState } from "react";
import axios from "axios";

const AuthPage = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("/login", { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  const onSignup = (e) => {
    e.preventDefault();
    axios
      .post("/signup", {
        username,
        secret,
        email,
        first_name,
        last_name,
      })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  return (

    

    <div className="login-page">
      <div className="main_title"><img src="icon.png" className="image"></img>Chatter</div>
      <div className="card">
        {/* Login Form */}
        <form onSubmit={onLogin}>
          <div className="title">Login</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setSecret(e.target.value)}
          />
          <button type="submit">LOG IN</button>
        </form>

        {/* Sign Up Form */}
        <form onSubmit={onSignup}>
          <div className="title">or Sign Up</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setSecret(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit">SIGN UP</button>
        </form>
        {/* Video Call form */}
      
      <form action='https://video-chat-ri8h.onrender.com' target='_blank'>
      <div className="title">or Video Call</div>
          <button type="submit">Video Call</button>
        </form>
      </div>

      

      <style>{`
      .login-page { width: 100vw; height: 130vh; padding-top: 1vw; background: linear-gradient(75deg, rgb(20, 23, 33) 0%, rgb(20, 23, 33) 50%, rgba(20, 23, 33,0.8) 100%); }
      .card { width: 200px; position: relative; left: calc(50vw - 100px); text-align: center;font-family: "Avenir"; }
      .main_title { padding-top: 32px; padding-left: 49px; font-size: 50px; color: white; font-weight: 700;font-family: "Avenir";text-align: left; }      
      .image {height: 50px; width: 50px;}
      .title { padding-top: 32px; font-size: 22px; color: white; font-weight: 700;font-family: "Avenir"; }
      input { width: calc(100% - 16px); margin-top: 12px; padding: 8px; background-color:#3e404b; outline: none; border: 1px solid #e6f7ff;border-radius: 8px; }
      button { margin-top: 12px; width: 100%; padding: 8px;background-color: #fa541c;color: white;border-radius: 8px;-webkit-transition: all .44s ease;
        -moz-transition: all .44s ease;font-family: "Avenir"; }
      
      `}</style>
    </div>
  );
};

export default AuthPage;
