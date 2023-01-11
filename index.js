const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const prefix = core.getInput('prefix', { required: true });
        const token = core.getInput('token', { required: true });

        const octokit = new github.getOctokit(token);

        octokit.log.info("hello")



    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();