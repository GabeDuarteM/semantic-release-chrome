# Contributing

Thanks for being willing to contribute!

## New bug found

- **Ensure the bug was not already reported** by searching on GitHub under [Issues][issues]

- If you're unable to find an open issue addressing the problem, [open a new one][new-issue]. Be sure to include a **title and clear description**, and to correctly fill out the issue template, including as much relevant information as possible.

## Fix an existing bug

- To avoid multiple people working on the fix, you can comment on the issue informing that you are working on a solution for that problem.

- Open a new Pull Request with the changes discussed on the issue above, also referencing the issue on the PR description. Be sure to include a **title and clear description**, and to correctly fill out the pull request template, including as much relevant information as possible.

## Adding a new feature or changing an existing one

- **Check if the feature request was not already reported** by searching on GitHub under [Issues][issues].

- If you're unable to find an issue addressing the feature, [open a new one][new-issue]. Be sure to include a **title and clear description**, and to correctly fill out the issue template, including as much relevant information as possible.

- If the suggestion received a positive feedback, you can start writing code.

- When you finish the changes, you can open a new Pull Request with the changes discussed on the issue above, also referencing the issue on the PR description. Be sure to include a **title and clear description**, and to correctly fill out the pull request template, including as much relevant information as possible.

## Project setup

1. Fork and clone the repo
1. Run `npm install` to install dependencies
1. Create a branch for your PR with `git checkout -b pr/your-branch-name`
1. Run `npm run ci` to ensure that everything was installed and its working as expected.

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```bash
> git remote add upstream https://github.com/GabrielDuarteM/semantic-release-chrome.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream",
> then fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`.
> Then you can make all of your pull request branches based on this `master`
> branch. Whenever you want to update your version of `master`, do a regular
> `git pull`.

## Committing and Pushing changes

Please make sure to run the `ci` script before you commit your changes. You can run
`npm run ci` to check that before committing.

## Help needed

Any kind of help is well received, so please checkout the [the open issues][issues] page if you want to start contributing.

Also, please watch the repo and respond to questions/bug reports/feature
requests! Thanks! :heart: :heart: :heart:

[issues]: https://github.com/GabrielDuarteM/semantic-release-chrome/issues
[new-issue]: https://github.com/GabrielDuarteM/semantic-release-chrome/issues/new
