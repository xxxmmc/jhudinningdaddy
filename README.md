# 2020-spring-group-dining-daddy

## Group project

### Note: This is just a crude readme for the product running.



#### First, let the backend start running.

```cmd
cd project
./mvnw spring-boot:run
```

#### Then, run the frontend.

```cmd
cd .. 	# exit from the project file
cd frontend
expo start
```

If the frontend can not be opened, check the terminal to see the problem. It is probably because the frontend need to do:

```cmd
npm install
```



Then, in the opened page, click on **Run on iOS simulator** or Scan the QR code below, you will be able to run the product on your localhost.

#### When running the product

You will first see nothing for the PostScreen. Do not worry, it is normal. We now use the postman to post the data into our database. So use the operation from the following postman page to Add data.

 https://zoog-backend.postman.co/collections/7048307-b6296935-a32f-419c-8aca-a76e43457c07?version=latest&workspace=adfcb0ae-a468-49fd-a548-b1818165249f
