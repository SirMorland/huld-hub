# Huld hub

## Dev work flow
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
