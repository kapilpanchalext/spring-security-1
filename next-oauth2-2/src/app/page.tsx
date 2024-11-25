"use client"
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';


export default function Home() {

  const [accessToken, setAccessToken] = useState<string>();
  const searchParams = useSearchParams();

  const sendRequestToAuthServerHandler = async () => {
    console.log("Send Request To Auth Server Handler");

    // Construct the base URL
    const baseURL = 'http://localhost:9002/realms/application1_realm/protocol/openid-connect/auth';

    // Define query parameters
    const queryParams = {
      response_type: 'code',
      client_id: 'application_1_client_pkce',
      redirect_uri: 'http://localhost:3000',
      scope: 'openid email',
      state: '4qFl3tTCkYb2R6pD',
      code_challenge: 'Tgc1QidrfeRMUExvgLljq621HlAIkc5YJ7NmUfGiryA',
      code_challenge_method: 'S256'
    };

    // Use URLSearchParams to append parameters
    const url = new URL(baseURL);
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    window.location.href = url.toString();
  };

  const verifyStateInClientHandler = async () => {
    console.log("Verify State");

      // Access the query parameters
    const code = searchParams.get('code');  // Get the 'code' parameter from the URL
    const state = searchParams.get('state');  // Get the 'state' parameter
    const error = searchParams.get('error');  // Get the 'error' parameter
  
      if (code) {
        // Authorization code received, now you can exchange it for an access token
        console.log('Authorization code:', code);
  
        // You can proceed with exchanging the code for tokens
        exchangeCodeForTokens(code);
      }
  };

  const sendAuthorizationCodeAndGetAccessTokenHandler = async () => {
    console.log("Authorization Code and Get Access Token Handler");
  };

  const makeResourceServerApiCall = async () => {
    console.log("Make Resource Server API Call: ", accessToken);
    try {
      // Send the authorization code to your backend or use it to get tokens
      const baseURL = 'http://localhost:9001/api/v1/helloworld';
  
      // Send the POST request
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      // Handle the response
      if (response.ok) {
        const data = await response;
        console.log('Received access token:', data);
      } 
    } catch (error) {
      console.error('Error during code exchange:', error);
    }
  };

  async function exchangeCodeForTokens(code: string) {
    try {
      // Send the authorization code to your backend or use it to get tokens
      const baseURL = 'http://localhost:9002/realms/application1_realm/protocol/openid-connect/token';
      // Define query parameters
      const body = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: 'application_1_client_pkce',
          redirect_uri: 'http://localhost:3000',
          code: code,
          code_verifier: '2m_do5z6EiZu5WFtXjTjxMwy47vxTB3i-fFLVGsnu2-PY9Y3'
        });
  
      // Send the POST request
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });
  
      // Handle the response
      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          setAccessToken(data.access_token);
          console.log('Received access token:', data.access_token);
        } else {
          console.error('Error exchanging code:', data);
        }
      } else {
        console.error('HTTP error:', response.status, response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error during code exchange:', error);
    }
  }

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
