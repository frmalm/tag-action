const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const prefix = core.getInput('prefix', { required: true });
        const major = core.getInput('major', { required: true });
        const token = core.getInput('token', { required: true });

        const ocktokit = new github.getOctokit(token);


        console.log(`Created a tag with profix ${prefix}${major}.`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();