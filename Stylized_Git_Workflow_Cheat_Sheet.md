
# Git & GitHub Workflow Cheat Sheet

## 🚀 **Setting up the Repository**

1. **Clone an Existing Repo**:
   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   ```

2. **Navigate into the Project Folder**:
   ```bash
   cd yourrepository
   ```

3. **Create a New Branch** for a feature or bugfix:
   ```bash
   git checkout -b your-branch-name
   ```

4. **Make Changes**: Edit your files in VS Code, Cursor, or any editor of your choice.

5. **Stage Changes** to add them to the commit:
   ```bash
   git add .
   ```

6. **Commit Your Changes**:
   ```bash
   git commit -m "Your descriptive commit message"
   ```

7. **Push the Branch** to GitHub:
   ```bash
   git push origin your-branch-name
   ```

---

## 🌱 **Updating and Syncing**

1. **Check Your Branch Status**:
   ```bash
   git status
   ```

2. **Pull Latest Changes** from the remote repository:
   ```bash
   git pull origin your-branch-name
   ```

3. **Switch to Another Branch** (like `master` or `main`):
   ```bash
   git checkout master
   ```

4. **Merge Another Branch into Current Branch** (like merging feature branch to master):
   ```bash
   git merge your-branch-name
   ```

5. **Push Merged Changes** to GitHub:
   ```bash
   git push origin master
   ```

---

## 🎯 **Useful Commands**

- **Show Commit History**:
   ```bash
   git log
   ```

- **See Which Files Are Changed**:
   ```bash
   git diff
   ```

- **Undo Last Commit (but keep changes)**:
   ```bash
   git reset --soft HEAD~1
   ```

- **Remove a File from Staging Area**:
   ```bash
   git reset <file>
   ```

- **Check Remote Repositories**:
   ```bash
   git remote -v
   ```

---

## 🔄 **Best Practices**

- **Create a New Branch** for each feature or bugfix.
- **Commit Often** with clear, descriptive messages.
- **Push to GitHub** regularly to sync your work.
- **Pull before Pushing** to ensure your local repository is up to date with the remote.
- **Merge Feature Branches** into `master` only after reviewing and testing.

---

## 🌟 **Additional Tips**

- **Never Push to Master** directly without reviewing or testing.
- **Use GitHub Pages** to host your portfolio or documentation directly from your repo.

📝 **Happy Coding!**
