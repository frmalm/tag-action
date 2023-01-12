const core = require('@actions/core');
const github = require('@actions/github');


function getNextBuild(prefix, major, minor, tagNames) {
    console.log(tagNames);

    next = minor
    for(let tag of tagNames) {
        let fullPrefix = prefix + major + "."
        if(tag.startsWith(fullPrefix)) {
            build = Number(tag.substring(fullPrefix.length))
            if(build >= next) {
                next = build + 1
            }
        }
    }
    return next
}

const main = async () => {
    try {
        const prefix = core.getInput('prefix', { required: true });
        const major = core.getInput('major', { required: true });
        const minor = core.getInput('minor', { required: true });
        const token = core.getInput('token', { required: true });

        console.log(`First tag in sequence "${prefix}${major}.${minor}"`);

        const octokit = new github.getOctokit(token);
        
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
        
        const [owner, repo] = github.context.payload.repository.full_name.split("/")
        const tags = await octokit.request(github.context.payload.repository.tags_url)
        //console.log(tags.data);
        
        var tagNames = tags.data.map(function(tag) {
            return tag.name
        });
        
        const nextBuildNumber = getNextBuild(prefix, major, minor, tagNames);
        
        let sha = github.context.payload.after;
        if (sha == undefined) {
            const refResponse = await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
                owner : owner,
                repo : repo,
                ref: github.context.payload.ref,
            });
            
            sha = refResponse.object.sha;
        }
        
        const newTag = prefix + major + "." + nextBuildNumber;


        console.log(`New tag : ${newTag} for ${sha}`);
        
        const response = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
            owner : owner,
            repo : repo,
            ref: `refs/tags/${newTag}`,
            sha: sha,
        });
        console.log(response);
    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();