# GitHub Setup Guide

This guide will help you push your Resume Builder to GitHub so you can deploy it to Render.

## Prerequisites

- Git installed on your computer
- GitHub account

## Step 1: Check if Git is Installed

```bash
git --version
```

If not installed:
- **macOS**: Git comes with Xcode Command Line Tools. Run `xcode-select --install`
- **Windows**: Download from https://git-scm.com/download/win
- **Linux**: `sudo apt-get install git` (Ubuntu/Debian)

## Step 2: Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Initialize Git Repository

```bash
cd /Users/spoorthybhat/Desktop/vibe-coding/resume-builder
git init
```

## Step 4: Create GitHub Repository

1. Go to https://github.com
2. Log in to your account
3. Click the "+" icon in the top right corner
4. Select "New repository"
5. Fill in the details:
   - **Repository name**: `resume-builder` (or your choice)
   - **Description**: "A full-stack resume builder with MongoDB backend"
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Initialize this repository with a README" (we already have one)
6. Click "Create repository"

## Step 5: Add Files to Git

```bash
# Check what files will be added
git status

# Add all files
git add .

# Check that .env and .env.local are NOT being added (should be in .gitignore)
git status

# Commit the files
git commit -m "Initial commit: Resume Builder with MongoDB backend"
```

## Step 6: Connect to GitHub

After creating the repository on GitHub, you'll see commands. Use these:

```bash
# Set the main branch name
git branch -M main

# Add remote repository (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/resume-builder.git

# Push to GitHub
git push -u origin main
```

If you get an authentication error, you may need to:
- Use a Personal Access Token instead of password
- Or set up SSH keys

### Using Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Resume Builder"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When prompted for password, use the token instead

## Step 7: Verify Upload

1. Go to your GitHub repository page
2. Refresh the page
3. You should see all your files (except .env and .env.local)

## Making Updates Later

Whenever you make changes:

```bash
# Check what changed
git status

# Add changed files
git add .

# Commit with a message
git commit -m "Description of what you changed"

# Push to GitHub
git push origin main
```

## Common Issues

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/resume-builder.git
```

### Authentication Failed
- Use a Personal Access Token instead of your password
- Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### "Nothing to commit"
- You might have already committed everything
- Check `git status` to see if there are any changes

### Accidentally Committed .env File
```bash
# Remove from Git but keep local file
git rm --cached .env .env.local

# Commit the removal
git commit -m "Remove environment files from Git"

# Push
git push origin main
```

## Best Practices

1. **Never commit sensitive data**:
   - `.env` files should always be in `.gitignore`
   - Never hardcode passwords or API keys

2. **Commit frequently** with clear messages:
   - Good: "Add MongoDB integration for projects"
   - Bad: "updates"

3. **Use branches** for major features:
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   # Then create a Pull Request on GitHub
   ```

4. **Pull before pushing** if working with others:
   ```bash
   git pull origin main
   ```

## Next Steps

Once your code is on GitHub:
1. Follow the DEPLOYMENT.md guide to deploy to Render
2. Your app will auto-deploy whenever you push to GitHub!

## Useful Git Commands

```bash
# See commit history
git log --oneline

# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard

# See what changed in files
git diff

# Create and switch to new branch
git checkout -b branch-name

# Switch branches
git checkout branch-name

# See all branches
git branch -a
```

## Resources

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com
- Learn Git Branching (Interactive): https://learngitbranching.js.org
