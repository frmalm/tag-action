const core = require('@actions/core');
const github = require('@actions/github');

function getNextBuild(prefix, major, minor, tagNames) {
    console.debug(`All tags found in repository "${tagNames}."`);

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
    console.debug("Next build number : " + next)
    return next
}

const main = async () => {
    try {
        const prefix = core.getInput('prefix', { required: true });
        const major = core.getInput('major', { required: true });
        const minor = core.getInput('minor', { required: true });
        const token = core.getInput('token', { required: true });

        console.log(`Created a tag with sequence starting at "${prefix}${major}.${minor}"`);
        console.debug(`The event payload: ${JSON.stringify(github.context.payload, undefined, 2)}`);

        const octokit = new github.getOctokit(token);
        const [owner, repo] = github.context.payload.repository.full_name.split("/")

        console.log(`tags_url: ${github.context.payload.repository.tags_url}`);
        const tags = await octokit.request(github.context.payload.repository.tags_url)
        var tagNames = tags.data.map(function(tag) {
            return tag.name
        });
        const nextBuildNumber = getNextBuild(prefix, major, minor, tagNames);
        
        const sha = github.context.payload.after
        const newTag = prefix + major + "." + nextBuildNumber;

        console.log(`Creating new tag : ${newTag} for ${sha}`);

        const response = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
            owner : owner,
            repo : repo,
            ref: `refs/tags/${newTag}`,
            sha: sha,
        });
        console.debug(response);
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();