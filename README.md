# AWS SNS instead of Twilio in Auth0
## Lambda function that can be connected with AWS API Gateway to replace Twilio from Auth0 passwordless sms connection.

## Steps to do:
1. Go to Lambda functions and press on the create function button

<img src="https://user-images.githubusercontent.com/43750093/210164951-2777cd8c-91fe-464b-99ff-6193ca48faac.png" width="50%" style="display:block; float:none; margin-left:auto; margin-right:auto;"><br>

2. Inside create function select Use a blueprint. In the search bar, search for microservice-http-endpoint. Select it and then click Configure.

<img src="https://user-images.githubusercontent.com/43750093/210164971-68159c5f-1afa-47c2-b571-8c925fae410d.png" style="display:block; float:none; margin-left:auto; margin-right:auto;"><br>

3. Inside basic information, enter a function name and under Execution role click Create a new role from AWS policy templates. Enter the Role name. The important part is to remove the Simple microservice permissions Dynamo DB and add the Amazon SNS publish policy SNS.

<img src="https://user-images.githubusercontent.com/43750093/210164973-619181d9-408c-4823-93b2-2736cb23c043.png" style="display:block; float:none; margin-left:auto; margin-right:auto;"><br>

4. Inside the API Gateway trigger select Create an API. Select HTTP API and set the security to Open

<img src="https://user-images.githubusercontent.com/43750093/210164974-8c93580b-d505-4d52-bb8c-46f17f2c22b1.png" style="display:block; float:none; margin-left:auto; margin-right:auto;"><br>

5. Click on the Create function button to complete the creation process

<img src="https://user-images.githubusercontent.com/43750093/210164976-ec04b305-e513-41aa-95e0-74e5e884403a.png" width="50%" style="display:block; float:none; margin-left:auto; margin-right:auto;"><br>

6. A similar page as below will be visible

<img src="https://user-images.githubusercontent.com/43750093/210164978-f8449140-14a5-4e35-aa90-7e58228557a6.png" style="display:block; float:none; margin-left:auto; margin-right:auto;"><br>

7. Upload the ```code.zip``` file in the upload from section and change the secret and any other necessary values inside the code and deploy it

<img src="https://user-images.githubusercontent.com/43750093/210164980-b15bd4bb-4111-42cf-aa6f-de4054168387.png" width="50%" style="display:block; float:none; margin-left:auto; margin-right:auto;"><br>

8. Go API Gateway in AWS and you can find the API that was created

<img src="https://user-images.githubusercontent.com/43750093/210164982-795abb3d-1475-454c-aa2b-1ad1c367159a.png" style="display:block; float:none; margin-left:auto; margin-right:auto;"><br>

9. You can find the invoke URL of the API, copy it to the clipboard 

<img src="https://user-images.githubusercontent.com/43750093/210164984-32489fbb-517a-49c1-80ba-05369a98a96b.png" style="display:block; float:none; margin-left:auto; margin-right:auto;"><br>

10. Refer to [this documentation by Auth0](https://auth0.com/docs/authenticate/passwordless/authentication-methods/use-sms-gateway-passwordless#authenticated-requests) and update your sms connection

```json
{
   "options":{
      "strategy":"sms",
      "provider":"sms_gateway",
      "gateway_url":"paste your gateway url here",
      "from":"+1 234 567",
      "template":"Your verification code is: @@password@@",
      "brute_force_protection":true,
      "forward_req_info":"true",
      "disable_signup":false,
      "name":"sms",
      "syntax":"md_with_macros",
      "totp":{
         "time_step":300,
         "length":6
      },
      "gateway_authentication":{
         "secret":"add your secret (256bit) here and use the same in the index.js in lambda function",
         "method":"bearer",
         "subject":"urn:Auth0",
         "audience":"urn:MySmsGateway",
         "secret":"testingtoken",
         "secret_base64_encoded":false
      }
   },
   "is_domain_connection":false,
   "enabled_clients":[],
   "realms":[
      "sms"
   ]
}
```
