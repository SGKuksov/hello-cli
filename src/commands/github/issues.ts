import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import chalk from 'chalk'

export default class GithubIssues extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(GithubIssues)

    const name = flags.name || 'world'
    this.log(`hello ${name} from /Volumes/My Passport/projects/node-cli/src/commands/github/issues.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
