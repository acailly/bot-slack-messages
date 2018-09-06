# bot-slack-messages

Download from Slack all messages of the channels you're in

## Usage

```
Usage: slack-messages [options] <file>

  Alias: slm

  Download from Slack all messages of the channels you're in

  Options:

    --help  output usage information
```

## Config (config.yaml)

```yaml
slackMessages:
  token: insert_your_token_here
```

## How do I get my token?

Go to https://api.slack.com/custom-integrations/legacy-tokens#legacy_token_generator

Click on `Create a token`

Copy it and paste it in the `config.yaml` file as in the example above
