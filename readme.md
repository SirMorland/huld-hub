# Huld hub

## Table of contents
- [Introduction](#Introduction)
- [Authors](#Authors)
- [Usage](#Usage)
- [Dev work flow](#DevWorkFlow)
- [Used technologies](#UsedTechnologies)
- [User guide](#UserGuide)


## Introduction <a name=Introduction></a>

This is an application for keeping track of employees skills, work history, education, and other notable points of interest. The primary purpose of the application is to search users based on their skills and talents they have listed and find coworkers that possess skills that are required. Search return a listing of users, that may be viewed in more detail.

Application requires a login before any information can be accessed and registration is allowed only allowed if users email has the correct domain. Admin can configure what email domains are valid. Upon registering successfully, confirmation email containing a confirmation link will be sent to the given email address. Another email can be sent if necessary.

All users have profile that others can view. These profiles contain peoples name, title, image, contact information, bio, skills, languages, keywords, work history, and education. User can modify their own profile and admins can edit everyones profiles. Admin can also delete other users.

Application has several configurations. Only selected email domains can be registered, and only selected languages and keywords may be used in the user profiles. Users can also be promoted into admins and demoted from the settings page.

## Authors <a name=Authors></a>

- Prosper Evergreen, prosper.evergreen@tuni.fi
- Ville Helppolainen, ville.helppolainen@tuni.fi
- Phu Nguyen, phu.g.nguyen@tuni.fi
- Sai Polineni, sai.polineni@tuni.fi
- Hoang Tran, hoang.tran@tuni.fi
- Asbah Usmani, asbahamjad.usmani@tuni.fi
- Jori Väinölä, jori.vainola@tuni.fi

## Usage <a name=Usage></a>

To start this application you must run both backend and web applications. Instruction on how to do this can be found in files `backend/README` and `web/README`. These files also contain other information like available commands and troubleshooting intructions.

## Dev work flow <a name=DevWorkFlow></a>
You can follow the [convetional commits](https://www.conventionalcommits.org/en/v1.0.0/) for naming branches and commit messages.

1. When you start working on a feature, create a new branch from the `main` branch. For example the branch will be `feat/login`
```bash
git checkout -b feat/login
```
2. Add your changes to the branch:
```bash
git add ./components/login/index.jsx
git add ./components/login/login.test.js
git commit -m 'feat: added login components'
```
3. When you are done with your changes and ready to submit a Pull Request, push the changes to remote:
```bash
git push origin feat/login
```
4. Go to the repo, it should show that you have a new branch that has just been pushed to. You can create a PR from that or create one manually. Fill in the PR descriptions, add some reviewers, labels, assign yourself to the PR and create the PR.
5. Once the PR is approved, we can merge the PR to the `main` branch. Don't forget to write a descriptive merge message.

## Used technologies <a name=UsedTechnologies></a>

This entire project utilizes Docker to run the application is same environment for all developers.

Backend uses Strapi, which is a node js based content management system. 

Web application is React based and styled with CSS.

## User Guide <a name=UserGuide></a>

### General

By clicking the Hub icon on the top left of the screen, you may always return to front page. If you are logged in, you will go to your profile. If you arent logged in, you will go to the login page.

When logged in you may navigate to different pages selecting items in the top bar. Settings contains a dropdown menu with the options to change password and log out.

### Login

When you first open the application, you will be presented with a login page. If you enter your email address and password, and then click log in button, assuming your credentials are correct, you will be logged in. If your credentials are however incorrect, you will receive an error message.

### Register

If you are accessing the application for the first time, you might no have an account. You may create one by clicking the link 'Not registered? Create an account'. You will enter the register page. If you wish to go back, click 'Already a member? Login instead'. If you want to create an account, fill the input fields and click register. If the are issues with the information you provided, you will receive an error message. If the registering is succesfull, you will be directed to 'Almost done' page. To continue further, you need to confirm you email address. This can be done through the link that was sent to your email. If you did not receive the email, you may send another one with the 'Resend confirmation email' button. After accessing the link, your account will be confirmed and you may login to the service.

### Reset password

If you have forgotten your password and are unable to login to your account, you may reset your password by clicking 'Forgot password?'. You will go to Forgot password page. To sent a reset link, entering your account email address and Click 'Send password reset link'. If email has been successfully sent to your email you will receive popup saying 'Email has been sent'. If not, you will receive an error message. If you enter the link in the email, you will go to reset password page. Enter your new password in the 2 input fields and click reset to set new password. If the password has been changed, you will see page saying 'password changed'. You can now login using the updated password.

If you are logged in, you may change you password by first selecting settings from the top bar, and then change password. Enter your new password 2 times and click save. You will receive a message informing if the operation was successful.

### Profile

When you log in, first thing you'll see is your profile. You can print this profile as CV or edit your profile with the buttons on the bottom right corner. 

Admins also have the additional options of deleting user. If you click delete, you will receive a confirmation window. You can cancel by clicking 'cancel' or by clicking outside the window. If you choose to delete the account, the user cannot access the service anymore and their profile can no longer be found.

### Profile edit

Image can be added by hovering over the image in the top left. you can add multiple items in the work history and education history with the 'add a new ...' buttons. You can also remove them by clicking the red minus icon. Language proficiencies and keywords are selected from a list. You can write in the list to get recommended specific items. Selecting an item will add it on top of the select box and those items can be removed by click the red minus icon. Changes in the profile are only saved if you click 'save' in bottom right corner. If the wish to revert changes, click cancel.

### search 

You can get to searhc page by clicking the search icon on the top right of your screen. Enter you search term in the input field and press enter/click arrow icon on the side. You can enter multiple search terms by seperating the with comma ','. If there are any matching users, they will be displayed below. By clicking 'profile' on the right side of the search results, you may view their profile.

### Admin page

Admin page can be accessed throught the top bar, by clicking admin. This is only displayed if the user has admin rights. On the admin page there are several lists you can modify. Admins, allowed emails domains, languages, and keywords. Languages and keyword can be added by typing the new item in the window below and clicking 'add' and removed by clicking the red minus icon on the items left side. language proficiencies and keywords dictate what items users can add to their languages and keywords segments in their profiles. You can add and remove admin, which have the access to modify these settings, edit other peoples profiles, and delete users. You can also modify allowed email domains. These domain limit which email are valid in the registering. Only emails that that match one of the allowed domains can register.