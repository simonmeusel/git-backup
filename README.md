# git-backup
Make a backup of your online git repositories

## Supported providers

* GitHub (Access token)
* GitLab (Private token)
* Gitea (Access token)

## Installation

1. Clone this repository
2. Copy the `.env.example.json` to `.env.json`

```
$ cp .env.example.json .env.json
```

3. Edit the .env.json
4. Make the commands usable

```
$ npm link
```

5. Use `cron` or `launchcontrol` to schedule the execution of this command:

```
$ git-backup backup
```

Alternatively you can run the program with `npm start`.

## Configuration

`.env.example.json`
```
{
  "folder": "Insert destination folder path here",
  "github": {
    "base": "https://api.github.com",
    "auth": {
      "access_token": "Get your access token at https://github.com/settings/tokens"
    }
  },
  "gitlab": {
    "base": "https://gitlab.com/api/v4",
    "auth": {
      "private_token": "Get your personal token at https://gitlab.com/profile/personal_access_tokens"
    }
  },
  "gitea": {
    "base": "https://try.gitea.io/api/v1",
    "auth": {
      "access_token": "Get your access token at https://try.gitea.io/user/settings/applications"
    }
  }
}
```
