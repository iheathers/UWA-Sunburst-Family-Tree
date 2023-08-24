# UWA-Sunburst-Family-Tree

An interactive web-based "Sunburst Chart" to efficiently manage a family tree, facilitating connections and communication among dispersed family members. The platform will empower administrators to dynamically add, modify, and update elements on the Sunburst Chart. Additionally, website visitors will have the capability to view the chart, interact with individual elements, and submit comments related to specific chart elements.

# DEVELOPER NOTES

# Tech Stack Used

[Click here to access the Rationale Document](Rationale.md)

## Frontend

- **HTML**: Hypertext Markup Language is used for structuring the content of the web pages.
- **CSS**: Cascading Style Sheets is used for styling the web pages and controlling their layout.
- **JavaScript (React)**: React is a popular JavaScript library for building user interfaces and creating interactive components.

## Backend

- **Express.js**: Express.js is a fast and minimalist web application framework for Node.js. It simplifies the process of building server-side applications and APIs.

## Database

- **MongoDB**: MongoDB is a NoSQL database that uses a flexible, document-oriented data model. It is well-suited for handling large amounts of unstructured or semi-structured data.

## Chart Library

- **D3.js**: D3.js is a powerful JavaScript library for creating data visualizations on the web. It provides tools for binding data to DOM elements and applying data-driven transformations to the document.

## Authentication

- **JWT (JSON Web Tokens)**: JSON Web Tokens is a compact and self-contained way of securely transmitting information between parties as a JSON object. It is commonly used for implementing authentication and authorization in web applications.

With this tech stack, the project can deliver a dynamic and responsive user interface using React on the frontend, handle data storage and retrieval using MongoDB on the backend, and create interactive data visualizations using D3.js. The authentication system is implemented using JWT to secure user access and protect sensitive information. Express.js serves as the middleware to handle HTTP requests and responses, ensuring smooth communication between the frontend and backend components.

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

Replace `<repository_url>` with the URL of the repository you want to clone. You can find the repository URL on the project's GitHub or GitLab page.

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

Replace `<branch_name>` with the name of the branch you want to work on. The branch name convention for this project is `CITS5206-#<TICKET-NUMBER>`. If the branch exists in the repository, Git will switch to that branch, and you can start making changes to the project.

For example, to switch to a branch for a ticket with number 123, the branch name would be `CITS5206-#123`. You would use:

```bash
git checkout CITS5206-#123
```

## Creating a New Branch for a New Feature

When adding a new feature to the project, it's a good practice to create a new branch specifically for that feature. This allows you to isolate your changes from the main development branch and collaborate with other team members effectively.

### Git Branch Command

To create a new branch, you can use the following command:

```bash
git branch <branch_name>
```

Replace `<branch_name>` with a descriptive name for your feature. For example, if you are adding a login functionality for ticket 123, you can create a branch called `CITS5206-#123`.

### Git Checkout and Branch Creation in One Step

To create a new branch and switch to it in a single command, you can use:

```bash
git checkout -b <branch_name>
```

For instance, to create a new branch for ticket 123 and switch to it, you would use:

```bash
git checkout -b CITS5206-#123
```

## Commit Message Convention

[Writing Good Commit Messages: A Practical Guide](https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/)

When making commits to the repository, it's essential to follow a standardized commit message convention. A good practice is to start each commit message with a verb, in the present tense, that describes the action performed by the commit.

### Subject Line (First Line):

- Limit the subject line to 50 characters or less.
- Start the subject line with a capital letter.
- Use the imperative mood (verbs) to describe what the commit does.
- Avoid ending the subject line with a period.

### Body (Optional):

- Use the body to provide more detailed information about the commit.
- Separate the subject line and body with a blank line.
- Wrap the body text at 72 characters or less.
- Explain why the change is necessary and what problem it solves.
- Include any relevant information that might be useful to other developers.

### Commit Message Structure:

- Use a concise, descriptive subject line that summarizes the change.
- Add a blank line after the subject line (if no body is present) or between the subject line and the body.
- Use bullet points or hyphens for unordered lists in the body.
- Use numbered lists for ordered steps or tasks.

### Issue References:

- If your project uses an issue tracking system (e.g., GitHub issues, JIRA), consider including the issue number in the commit message.
- Use the format "Fixes #123" or "Closes #456" to automatically close the referenced issue when the commit is merged.

Example of a well-formatted commit message:

```
Add user authentication feature

- Implemented user login functionality
- Added user registration with email verification
- Integrated JWT for secure authentication

Closes #123
```

By following these conventions, your commit messages become informative, well-structured, and easier to understand for you and your team. Additionally, it helps in maintaining a clean commit history that is crucial for code maintenance and collaboration.

## Using Trello Ticketing System

If your project uses Trello for issue tracking, you can use the Trello Prime extension for your browser. This extension will display the Trello card number for each task or ticket on the Trello board.

To add the Trello Prime extension to your browser, follow the link below:

[Trello Prime Extension](https://chrome.google.com/webstore/detail/trello-prime/mkphpfbogfpojbbmbdhfcboleippkffh/related?hl=en)

With the Trello Prime extension, you can easily associate your Git commits with specific Trello cards, making it easier to track the progress of your work and collaborate with your team.

## Conclusion

With Git installed, a repository cloned, and a new branch created for your new feature, you're ready to start developing and contributing to the project. Remember to commit your changes regularly and push them to the remote repository. Utilize Trello and the Trello Prime extension to stay organized and collaborate effectively with your team.

Remember to follow the commit message convention to keep the commit history clean and informative.

Happy coding!
