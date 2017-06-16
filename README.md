# git-backup
Make a backup of your online git repositories

## Supported providers

* GitHub (Basic Auth)
* GitLab (Private token)

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

## Configuration

`.env.example.json`
```
{
  "folder": "/Users/XXX/git-backup",
  "github": {
    "base": "https://api.github.com",
    "auth": {
      "username": "XXX",
      "password": "XXX"
    }
  },
  "gitlab": {
    "base": "https://gitlab.com/api/v4",
    "auth": {
      "private_token": "XXX"
    }
  }
}
```

`folder`: path of folder where backups should be saved to
`github.base`: Base url of GitHub api (Will be different for GitHub Enterprise)
`github.auth`: Credentials of your account used for basic authentication
`gitlab.base`: Base url of GitLab api (Will be different if you're not using `gitlab.com`)
`gitlab.auth.privaate_token`: Token used for authentication (Create the token in your GitLab settings)
