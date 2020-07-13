const util = require('util');

let destination = 'git@github.com:';
let origin = 'https://github.com/';
let configured = false;

module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    try {
      console.log(
        'Checking if Git is configured to rewrite to "%s"',
        destination
      );
      const insteadOfState = await run.command(
        util.format('git config --global --get url.%s.insteadOf', destination)
      );
      console.log(
        util.format(
          'Git is already configured to rewrite "%s" to "%s", not overwriting results',
          insteadOfState.stdout,
          destination
        )
      );
    } catch (err) {
      if (err.exitCode === 1) {
        // Do proceed because this was expected
        console.log(
          'Configuring Git to rewrite "%s" to "%s"',
          origin,
          destination
        );
        await run.command(
          util.format(
            'git config --global url.%s.insteadOf %s',
            destination,
            origin
          )
        );
        console.log('Fetching Hugo modules non-recursively');
        await run.command('hugo mod get -u');
        configured = true;
      } else {
        // Do not proceed and let the user know it was unexpected
        console.log(
          'Checking if Git rewrites to %s failed with exit code %d',
          destination,
          err.exitCode
        );
      }
    }
  },

  onPostBuild: async ({ utils: { run } }) => {
    if (configured) {
      console.log(
        'Removing rewrite in Git of "%s" with "%s"',
        origin,
        destination
      );
      await run.command(
        util.format('git config --global --unset url.%s.insteadOf', destination)
      );
    } else {
      console.log('No Git rewrite configuration to remove');
    }
  },
};
