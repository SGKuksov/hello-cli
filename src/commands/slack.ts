import {Command, flags} from '@oclif/command'
import { IncomingWebhook } from '@slack/webhook'

export default class Slack extends Command {
  static description: string = 'Send a message to a channel in Slack'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    slackWebhookUrl: flags.string({
      env: 'SLACK_WEBHOOK_URL',
      required: true
    })
  }

  static args = [
    {
      name: 'text',
      required: true
    }
  ]

  async run() {
    const {args, flags} = this.parse(Slack)
    const webhook = new IncomingWebhook(flags.slackWebhookUrl)
    await webhook.send(args.text)
  }
}
