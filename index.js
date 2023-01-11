const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const prefix = core.getInput('prefix', { required: true });
        const major = core.getInput('major', { required: true });
        const token = core.getInput('token', { required: true });

        console.log(`Created a tag with profix "${prefix}${major}."`);

        const octokit = new github.getOctokit(token);
        
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);

        const branches_url = JSON.stringify(github.context.payload.repository.branches_url, undefined, 2)
        console.log(`branches_url: ${branches_url}`);

        const branches = await octokit.request('GET {url}', {
            url: branches_url
        })
        console.log(`branches: ${branches}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();