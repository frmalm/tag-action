const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const prefix = core.getInput('prefix', { required: true });
        const major = core.getInput('major', { required: true });
        const token = core.getInput('token', { required: true });

        console.log(`Created a tag with profix "${prefix}${major}."`);

        const ocktokit = new github.getOctokit(token);
        
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);

        const branches = await octokit.request('GET {url}', {
            url: github.context.payload.repository.branches_url
        })
        console.log(`The event payload: ${branches}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();