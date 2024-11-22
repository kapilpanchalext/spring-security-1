"use client"

export default function Home() {

  const sendRequestToAuthServerHandler = async () => {
    console.log("Send Request To Auth Server Handler");

    // Construct the base URL
    const baseURL = 'http://localhost:9002/realms/application1_realm/protocol/openid-connect/auth';
    // const baseURL = 'http://localhost:9002/realms/application1_realm';
      // const baseURL = 'http://localhost:9002/realms/application1_realm/protocol/openid-connect/certs';

    // Define query parameters
    const queryParams = {
      response_type: 'code',
      client_id: 'application_1_client_pkce',
      redirect_uri: 'http://localhost:3000',
      scope: 'openid email',
      state: '4qFl3tTCkYb2R6pD',
      code_challenge: 'wdVjYBDhSvy2yLqStEQJPzyY2wRkLPwOKphr7DOri1k',
      code_challenge_method: 'S256'
    };

    // Use URLSearchParams to append parameters
    const url = new URL(baseURL);
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    window.location.href = url.toString();

    // try {
    //   const response = await fetch(url.toString(), {
    //     method: 'GET',
    //     // headers: {
    //     //   // 'Content-Type' : 'application/json',
    //     //   // 'access-control-allow-credentials' : 'true',
    //     //   // 'access-control-allow-origin' : 'http://localhost:3000',
    //     //   // 'access-control-expose-headers' : 'Access-Control-Allow-Methods'
    //     // },
    //   });

    //   if (response.ok) {
    //     const contentType = response.headers.get('content-type');
    //     if (contentType && contentType.includes('application/json')) {
    //       const data = await response.json();
    //       console.log('Login successful:', data);
    //       alert('Login successful: ' + JSON.stringify(data));
    //     } else {
    //       const text = await response.text();
    //       console.log(text);
    //     }
    //   } else {
    //     console.error('Login failed:', response.statusText);
    //     alert('Login failed. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   alert('An error occurred. Please try again later.');
    // }
  };

  const verifyStateInClientHandler = async () => {
    console.log("Verify State");
  };

  const sendAuthorizationCodeAndGetAccessTokenHandler = async () => {
    console.log("Authorization Code and Get Access Token Handler");
  };

  const makeResourceServerApiCall = async () => {
    console.log("Make Resource Server API Call");
  };


  return (
    <div>
      <h1>OAuth2.0 App</h1>
      <button onClick={sendRequestToAuthServerHandler}><h1>Send Request to Auth Server</h1></button>
      <button onClick={verifyStateInClientHandler}><h1>Verify State in Client</h1></button>
      <button onClick={sendAuthorizationCodeAndGetAccessTokenHandler}><h1>Send Authorization Code & Get Access Token from Auth Server</h1></button>
      <button onClick={makeResourceServerApiCall}><h1>Make API Access Request to Resource Server</h1></button>
    </div>
  );
}
