<style>
img
{
    display:block;
    float:none;
    margin-left:auto;
    margin-right:auto;
}
</style>
## Lambda function that can be connected with AWS API Gateway to replace Twilio from Auth0 passwordless sms connection.

## Steps to do:
1. Go to Lambda functions and press on the create function button

<img src="images/1.png" width="50%"><br>

2. Inside create function select Use a blueprint. In the search bar, search for microservice-http-endpoint. Select it and then click Configure.

<img src="images/2.png"><br>

3. Inside basic information, enter a function name and under Execution role click Create a new role from AWS policy templates. Enter the Role name. The important part is to remove the Simple microservice permissions Dynamo DB and add the Amazon SNS publish policy SNS.

<img src="images/3.png">