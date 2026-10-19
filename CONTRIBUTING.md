# Contributing Guide

When contributing to this repository, please first discuss the change you wish to make via issue, email,
or any other method with the owners of this repository before making any changes. This way we can guide
you through the process and give feedback.

## Pull Request Process

You can contribute changes to this repo by opening a pull request:

1. After forking this repository to your Git account, make the proposed changes on your forked branch.
2. Run tests and linting locally.
3. Commit your changes and push them to your forked repository.
4. Navigate to the main project repository and select the _Pull Requests_ tab.
5. Click the _New pull request_ button, then select the option "Compare across forks"
6. Leave the base branch set to main. Set the compare branch to your forked branch, and open the pull request.
7. Once your pull request is created, ensure that all checks have passed and that your branch has no conflicts with the base branch. If there are any issues, resolve these changes in your local repository, and then commit and push them to git.
8. Similarly, respond to any reviewer comments or requests for changes by making edits to your local repository and pushing them to Git.
9. Once the pull request has been reviewed, those with write access to the branch will be able to merge your changes into the project repository.

If you need more information on the steps to create a pull request, you can find a detailed walkthrough in the [Github documentation][pull-requests-docs].

## Quick Start

Requirements: Node.js 22+, pnpm 12+ (see [`packageManager`](./package.json)), and Docker (for the dev containers).

```sh
pnpm install             # install dependencies
cp .env.example .env     # copy example env file
pnpm dev                 # the dev loop, the app runs on :4321
```

Open <http://localhost:4321/_emdash/admin> and complete the setup wizard —
EmDash runs its database migrations and applies the portfolio seed there.
The site is served at <http://localhost:4321>.

Keep the codebase healthy:

```sh
pnpm format       # formatting (oxfmt)
pnpm lint         # linting with auto-fix (oxlint)
pnpm check        # formatting + linting in check mode
pnpm typecheck    # astro check
```

Read the [EmDash deployment guide](https://docs.emdashcms.com/deployment/nodejs/) for more information on serving a real deployment.

---

[pull-requests-docs]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork
