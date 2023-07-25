# App

GymPass style app

## FR's (Functional requirements) - features of the application

- [x] It should be possible to register an user;
- [x] It should be possible to authenticate;
- [x] It should be possible to obtain the profile of the logged in user;
- [x] It should be possible to obtain the number of check-ins performed by the logged in user;
- [x] It should be possible for the user to get their check-in history;
- [x] It should be possible for the user to search nearby gyms (up to 10km);
- [x] It should be possible for the user to able to search for gyms by name;
- [x] It should be possible for the user to make check-in at a gym;
- [x] It should be possible to validate the user's check-in at a gym;
- [x] It should be possible to register a gym;

## BR's (Business rules) - path that each requirement can take

- [x] The user must not be able to register with an e-mail that already exists in our database;
- [x] The user cannot to do 2 check-ins on the same day;
- [x] The user cannot check-in if not be nearby (100m) the gym;
- [x] Check-in only can be validated up to 20 minutes after its creation;
- [x] Check-in can be only validated by administrators;
- [x] The gym can only be resgistered by administrators;

## NFR's (Non-Functional requirements) - technical requiriments of the application

- [x] The user's password must be encrypted;
- [x] The application's data need to persist in a PostgreSQL database;
- [x] All data lists need to be paged with 20 items per page;
- [x] The user must be identified by a JWT token (JSON Web Token);
