const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const prefix = core.getInput('prefix', { required: true });
        const major = core.getInput('major', { required: true });
        const token = core.getInput('token', { required: true });

        const octokit = new github.getOctokit(token);

        var tag = new NewTag {
                Tag = "v1.0.0",
                Object = "ee062e0", // short SHA
                Type = TaggedType.Commit, // TODO: what are the defaults when nothing specified?
        };

        Console.WriteLine("Created a tag for {0} at {1}", prefix, major);

    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();