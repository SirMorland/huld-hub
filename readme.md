# Huld hub

## Table of contents
- [Authors](#Authors)
- [Introduction](#Introduction)
- [Usage](#Usage)
- [Issues](#Issues)
- [Dev work flow](#DevWorkFlow)

## Authors <a name=Authors></a>
 Markup : * Prosper Evergreen
          * Ville Helppolainen
          * Phu Nguyen
          * Sai Polineni
          * Hoang Tran
          * Asbah Usmani
          * Jori Väinölä

## Introduction <a name=Introduction></a>

This is an application for searching and displaying coworkers based on their skills and talents. Application requires a login before any information can be accessed and registration is allowed only through email invitation. Once logged in, user can search different skills (for example. web technology or C++) and application will return selection of coworkers who have those skills listed. By selecting searched user you may view their personal information, which can contains contact information, skills, work history, education, and other notable points of interest.

## Usage <a name=Usage></a>

To run this application you must initiate both backend and web applications. Instruction on how to do this can be found in files `backend/README` and `web/README`.

## Usage <a name=Usage></a>

TODO. Issues that come up in the application that will not be fixed for the release should be documented here.

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
