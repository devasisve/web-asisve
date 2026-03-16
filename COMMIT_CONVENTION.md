# Conventional Commits Guide

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for providing shared meaning to commit messages.

## Format
`<type>[optional scope]: <description>`

`[optional body]`

`[optional footer(s)]`

## Types
- **feat**: A new feature for the user, not a new feature for build script.
- **fix**: A bug fix for the user, not a fix to a build script.
- **docs**: Changes to documentation.
- **style**: Formatting, missing semi colons, etc; no code change.
- **refactor**: Refactoring production code.
- **test**: Adding missing tests, refactoring tests; no production code change.
- **chore**: Updating build tasks, package manager configs, etc; no production code change.
- **perf**: A code change that improves performance.
- **ci**: Changes to CI configuration files and scripts.
- **build**: Changes that affect the build system or external dependencies.

## Examples
- `feat: add instagram feed component`
- `fix: correct layout alignment on mobile`
- `chore: update dependencies in package.json`

## Why?
- Automatically generating CHANGELOGs.
- Communicating the nature of changes to teammates, the public, and other stakeholders.
- Triggering build and publish processes.
- Making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.
