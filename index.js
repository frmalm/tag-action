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
        
        const repository = JSON.parse(github.context.payload.repository)
        
        console.log(`tags_url: ${repository.tags_url}`);

        const tags = await octokit.request(repository.tags_url)
        
        console.log(`tags: ${tags}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();