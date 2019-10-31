import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import chalk from 'chalk'
import Octokit = require('@octokit/rest')

export default class GithubIssues extends Command {
  static description = 'Get a list of issues'

  static flags = {
    help: flags.help({
      char: 'h'
    }),
    githubPersonalToken: flags.string({
      description: `Environment variable GITHUB_PERSONAL_TOKEN`,
      env: 'GITHUB_PERSONAL_TOKEN',
      required: true
    })
  }

  static args = [
    {
      name: 'owner',
      required: false,
      description: 'An owner of a repository',
      default: 'SGKuksov',
    },
    {
      name: 'repo',
      required: false,
      description: 'A repository',
      default: 'hello-cli',
    },
  ]

  async run() {
    const {args, flags} = this.parse(GithubIssues)
    const octokit = new Octokit({
      auth: flags.githubPersonalToken
    })

    const startWorking = await cli.prompt('Do you want to start working on an issue? (y/N)', {
      required: false,
      default: 'y'
    })

    if (['y', 'yes'].includes(startWorking.toLowerCase())) {
      const issueNumber = await cli.prompt('Which issue you want to pick up? Please provide the Number')
      const assignee = await cli.prompt('What is your GitHub login?')

      await octokit.issues.update({
        owner: args.owner,
        repo: args.repo,
        issue_number: issueNumber,
        assignees: [assignee]
      })

      cli.action.start('Getting the list of the issues')

      const { data: issues } = await octokit.issues.listForRepo({
        owner: 'SGKuksov',
        repo: 'hello-cli',
      })

      cli.action.stop()

      this.log(`Assignee of the issue #${issueNumber} has been successfully changed to "${assignee}"!`)
      cli.table(issues, {
        number: {},
        title: {},
        assignee: {
          get: row => row.assignee ? row.assignee.login : null,
        },
        state: {
          get: row => row.state === 'open' ? chalk.green('open') : chalk.red('closed'),
        },
        html_url: {
          header: 'Link'
        },
      })
    }

  }
}
