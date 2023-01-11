const core = require('@actions/core');
const github = require('@actions/github');

function getTagNamesOfTags(tags) {
    var tagNames = tags.map(function(tag) {
        tag.name
    })


}

function getNextBuild(prefix, major, tagNames) {
    console.log(tags);

    next = 1
    for(let tag of tagNames) {
        console.log(tag)
        let fullPrefix = prefix + major + "."
        console.log(fullPrefix)
        if(tag.startsWith(fullPrefix)) {
            build = Number(tag.substring(fullPrefix.length))
            if(build >= next) {
                next = build + 1
            }


        }
    }
    console.log("Next build number : " + next)
    return next
}

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

        
        console.log(`tags_url: ${github.context.payload.repository.tags_url}`);

        const tags = JSON.parse(await octokit.request(github.context.payload.repository.tags_url))
        
        
        var tagNames = tags.map(function(tag) {
            return tag.name
        });
        
        const nextBuildNumber = getNextBuild(prefix, major, tagNames);
        const sha = github.context.payload.after
        
        const newTag = prefix + major + "." + nextBuildNumber;


        console.log(`New tag : ${newTag} for ${sha}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();