# UWA-Sunburst-Family-Tree

An interactive web-based "Sunburst Chart" to efficiently manage a family tree, facilitating connections and communication among dispersed family members. The platform will empower administrators to dynamically add, modify, and update elements on the Sunburst Chart. Additionally, website visitors will have the capability to view the chart, interact with individual elements, and submit comments related to specific chart elements.

# Developer notes

# Getting Started with Git

## Installing Git

To get started with version control and collaborate on projects, you need to install Git on your computer. Git is a distributed version control system that allows you to track changes in your code, work collaboratively with others, and manage different versions of your project.

### Download Git

You can download Git from the official website by clicking on the link below:

[Download Git](https://git-scm.com/downloads)

Select the appropriate version for your operating system (Windows, macOS, or Linux) and follow the installation instructions provided on the website.

## Cloning a Git Repository

Once you have Git installed on your machine, you can clone an existing Git repository to start working on a project. Cloning creates a copy of the entire project, including all files and commit history, on your local computer.

### Git Clone Command

To clone a repository, open your terminal or command prompt and navigate to the directory where you want to store the project. Then, use the following command:

```bash
git clone <repository_url>
```

Replace `<repository_url>` with the URL of the repository you want to clone. You can find the repository URL on the project's GitHub page.

For example, to clone a repository with the URL `https://github.com/example-user/example-repo.git`, you would use:

```bash
git clone https://github.com/example-user/example-repo.git
```

This command will create a new directory named `example-repo` and copy all the files from the remote repository into it.

## Checking Out a Branch

In Git, projects often have multiple branches representing different features, bug fixes, or development stages. To work on a specific branch, you need to check it out first.

### Git Checkout Command

To check out an existing branch, use the following command:

```bash
git checkout <branch_name>
```

Replace `<branch_name>` with the name of the branch you want to work on. If the branch exists in the repository, Git will switch to that branch, and you can start making changes to the project.

For example, to switch to a branch named `feature/new-feature`, you would use:

```bash
git checkout feature/new-feature
```

## Creating a New Branch for a New Feature

When adding a new feature to the project, it's a good practice to create a new branch specifically for that feature. This allows you to isolate your changes from the main development branch and collaborate with other team members effectively.

### Git Branch Command

To create a new branch, you can use the following command:

```bash
git branch <branch_name>
```

Replace `<branch_name>` with a descriptive name for your feature. For example, if you are adding a login functionality, you can create a branch called `feature/login`.

### Git Checkout and Branch Creation in One Step

To create a new branch and switch to it in a single command, you can use:

```bash
git checkout -b <branch_name>
```

For instance, to create a new branch called `feature/login` and switch to it, you would use:

```bash
git checkout -b feature/login
```

## Using Trello Ticketing System

If your project uses Trello for issue tracking, you can use the Trello Prime extension for your browser. This extension will display the Trello card number for each task or ticket on the Trello board.

To add the Trello Prime extension to your browser, follow the link below:

[Trello Prime Extension](https://chrome.google.com/webstore/detail/trello-prime/mkphpfbogfpojbbmbdhfcboleippkffh/related?hl=en)

With the Trello Prime extension, you can easily associate your Git commits with specific Trello cards, making it easier to track the progress of your work and collaborate with your team.

## Conclusion

With Git installed, a repository cloned, and a new branch created for your new feature, you're ready to start developing and contributing to the project. Remember to commit your changes regularly and push them to the remote repository. Utilize Trello and the Trello Prime extension to stay organized and collaborate effectively with your team.

Happy coding!
