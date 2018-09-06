const fs = require("fs");
const flatten = require("lodash/flatten");

module.exports = function(vorpal) {
  vorpal
    .command("slack-messages <file>")
    .alias("slm")
    .description("Download from Slack all messages of the channels you're in")
    .action(function(args, callback) {
      downloadMessages(args.file, vorpal, callback);
    });
};

function downloadMessages(destinationFile, vorpal, callback) {
  const { WebClient } = require("@slack/client");

  const token = vorpal.config.slackMessages.token;

  const client = new WebClient(token);

  getChannelList(client)
    .then(channelList => {
      return Promise.all(
        channelList.channels.map(channel => {
          console.log("Downloading messages from channel", channel.name);
          return getChannelMessages(client, channel.id).then(
            channelMessages => {
              return [`CHANNEL ${channel.name}`, ...channelMessages];
            }
          );
        })
      );
    })
    .then(flatten)
    .then(messages => {
      fs.writeFileSync(destinationFile, JSON.stringify(messages, null, 2));

      callback("Exported", messages.length, "messages");
    })
    .catch(e => callback("ERROR", e));
}

function getChannelList(client) {
  return client.channels.list();
}

function getChannelMessages(client, channelId) {
  return client.channels
    .history(channelId)
    .then(channelHistory => channelHistory.messages);
}
